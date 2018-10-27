import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { loop } from 'enso'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { State } from '_lib/state'
import Home from 'ui/screens/Home'
import Docs from 'ui/screens/Docs'
import NotFound from 'ui/screens/NotFound'

const render = (state) =>
  ReactDOM.render(
    <State.Provider value={state}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/docs/:id" component={Docs} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </State.Provider>,
    document.getElementById('root')
  )

const exposeStateToConsoleAndRender = (state) => {
  window.state = state
  render(state)
}

loop(
  {},
  process.env.NODE_ENV === 'development'
    ? exposeStateToConsoleAndRender
    : render
)

registerServiceWorker()
