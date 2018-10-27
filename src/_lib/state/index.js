import React, { useContext, useEffect, useCallback } from 'react'
import { get, set } from 'lodash'
import { act } from 'enso'
import produce from 'immer'
import { getJSON } from '_lib/request'

const State = React.createContext({})
export { State }

export const useState = () => {
  return [useContext(State), act]
}

export const useEntity = ({ path, initialValue }) => {
  const state = useContext(State)
  const entity = get(state, path, initialValue)
  const update = useCallback(
    (callback) =>
      act(produce(
        state =>
          set(state, path, callback(get(state, path, initialValue)))
      )),
    [path, initialValue]
  )

  return [entity, update]
}

export const useResource = ({ url, callback }) => {
  const [resource, update] = useEntity({
    path: ['resource', url],
    initialValue: { initializing: true, loading: true, content: undefined },
  })

  useEffect(() => {
    if (resource.initializing) {
      update(resource => {
        resource.initializing = false
        return resource
      })

      getJSON(url)
        .then(response =>
          update(resource => {
            resource.loading = false
            resource.content = callback ? callback(response) : response
            return resource
          })
        )
        .catch(error =>
          update(resource => {
            resource.loading = false
            resource.error = error
            return resource
          })
        )
    }
  }, [url])

  const updateContent = useCallback(
    (callback) =>
      update(({ content, ...resource }) => ({
        ...resource,
        content: callback(content)
      }))
  )

  return [resource.content, resource, updateContent]
}
