import React from 'react'
import Resource from '_lib/Resource'

const ResourceWithContentCallback = ({ url, contentCallback, children, renderLoading }) =>
  <Resource url={url} renderLoading={renderLoading}>
    {
      (content) => children(contentCallback(content))
    }
  </Resource>

export default ResourceWithContentCallback
