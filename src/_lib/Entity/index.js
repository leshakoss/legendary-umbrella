import React from 'react'
import { get, set } from 'lodash'
import { StateConsumer } from '_lib/state'
import { act } from 'enso'
import produce from 'immer'

const Entity = ({ path, initialValue, children }) =>
  <StateConsumer>
    {
      state =>
        children(
          get(state, path, initialValue),
          (callback) =>
            act(produce(state =>
              set(state, path, callback(get(state, path, initialValue)))
            ))
      )
    }
  </StateConsumer>

export default Entity
