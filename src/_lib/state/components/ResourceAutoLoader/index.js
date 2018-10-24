import { Component } from 'react'
import { getJSON } from '_lib/request'

export default class ResourceAutoLoader extends Component {
  componentDidMount () {
    this._handleInitializeResource()
  }

  render () {
    const { resource, render, renderLoading, renderError } = this.props

    if (resource.loading && renderLoading) {
      return renderLoading ? renderLoading(resource) : null
    }

    if (resource.error) {
      return renderError ? renderError(resource.error, resource) : null
    }

    if (typeof render === 'function') {
      return render(resource.content, resource)
    } else {
      return render || null
    }
  }

  _handleInitializeResource () {
    const { resource, act, url, callback } = this.props

    if (resource.initializing) {
      act(resource => {
        resource.initializing = false
        return resource
      })

      getJSON(url)
        .then(response =>
          act(resource => {
            resource.loading = false
            resource.content = callback ? callback(response) : response
            return resource
          })
        )
        .catch(error =>
          act(resource => {
            resource.loading = false
            resource.error = error
            return resource
          })
        )
    }
  }
}
