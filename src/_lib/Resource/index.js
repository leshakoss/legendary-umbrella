import React from 'react'

import Entity from '_lib/Entity'
import { getJSON } from '_lib/request'

const ROOT_PATH = 'resource'

class ResourceAutoLoader extends React.Component {
  componentDidMount () {
    const { resource, act, url } = this.props
    this._handleInitializeResource(resource, act, url)
  }

  componentDidUpdate () {
    const { resource, act, url } = this.props
    this._handleInitializeResource(resource, act, url)
  }

  render () {
    const { resource, render, renderLoading } = this.props

    if (resource.loading) {
      return renderLoading ? renderLoading() : null
    }

    if (typeof render === 'function') {
      return render(resource.content)
    } else {
      return render || null
    }
  }

  _handleInitializeResource (resource, act, url) {
    if (resource.initializing) {
      act(resource => {
        resource.initializing = false
        resource.loading = true
        return resource
      })

      getJSON(url)
        .then(content =>
          act(resource => {
            resource.loading = false
            resource.content = content
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

const Resource = ({ url, children, renderLoading }) =>
  <Entity path={[ROOT_PATH, url]} initialValue={{ initializing: true, loading: true }}>
    {
      (resource, act) =>
        <ResourceAutoLoader url={url} resource={resource} act={act} render={children} renderLoading={renderLoading} />
    }
  </Entity>

export default Resource
