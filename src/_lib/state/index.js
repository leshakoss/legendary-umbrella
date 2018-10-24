import React from 'react'
import { get, set, isFunction } from 'lodash'
import { act } from 'enso'
import produce from 'immer'

import ResourceAutoLoader from './components/ResourceAutoLoader'

const { Provider: StateProvider, Consumer: StateConsumer } = React.createContext({})
export { StateProvider, StateConsumer }

export const createEntity = ({ name, path: getPath, initialValue: getInitialValue }) => {
  const Component = ({ children, ...otherProps }) => {
    const path = isFunction(getPath)
      ? getPath(otherProps)
      : getPath
    const initialValue = isFunction(getInitialValue)
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
      ['resource', isFunction(url) ? url(props) : url],
    initialValue: { initializing: true, loading: true }
  })

  const Component = ({ children, renderLoading, renderError, ...otherProps }) =>
    <Entity {...otherProps}>
      {
        (resource, act) =>
          <ResourceAutoLoader
            url={isFunction(url) ? url(otherProps) : url}
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
