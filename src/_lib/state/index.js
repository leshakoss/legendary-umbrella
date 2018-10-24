import React from 'react'
import { get, set } from 'lodash'
import { act } from 'enso'
import produce from 'immer'

import ResourceAutoLoader from './components/ResourceAutoLoader'

const { Provider: StateProvider, Consumer: StateConsumer } = React.createContext({})
export { StateProvider, StateConsumer }

export const createEntity = ({ name, path: getPath, initialValue: getInitialValue }) => {
  const Component = ({ children, ...otherProps }) => {
    const path = typeof getPath === 'function'
      ? getPath(otherProps)
      : getPath
    const initialValue = typeof getInitialValue === 'function'
      ? getInitialValue(otherProps)
      : getInitialValue

    const renderProp = state =>
      children(
        /**
         * @param {object} entity
         */
        get(state, path, initialValue),
        /**
         * @param {function} act
         */
        (callback) =>
          act(produce(state =>
            set(state, path, callback(get(state, path, initialValue)))
          ))
      )
  
    return <StateConsumer>
      {renderProp}
    </StateConsumer>
  }

  Component.displayName = name

  return Component
}

export const createResource = ({ name, url, callback }) => {
  const Entity = createEntity({
    name,
    path: (props) =>
      ['resource', typeof url === 'function' ? url(props) : url],
    initialValue: { initializing: true, loading: true }
  })

  const Component = ({ children, renderLoading, renderError, ...otherProps }) =>
    <Entity {...otherProps}>
      {
        (resource, act) =>
          <ResourceAutoLoader
            url={typeof url === 'function' ? url(otherProps) : url}
            resource={resource}
            act={act}
            callback={callback}
            render={children}
            renderLoading={renderLoading}
            renderError={renderError}
          />
      }
    </Entity>

  Component.displayName = name

  return Component
}
