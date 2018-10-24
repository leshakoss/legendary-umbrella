import React from 'react'
import Resource from '_lib/ResourceWithContentCallback'

export const contributorsResource = () =>
  'https://api.github.com/repos/date-fns/date-fns/contributors?per_page=999'

const processResourceContent = content =>
  content.map(
    user => ({
      id: user.id,
      url: user.html_url,
      avatarUrl: user.avatar_url,
      name: user.login,
    })
  )

const VersionList = ({ children, renderLoading }) =>
  <Resource url={contributorsResource()} contentCallback={processResourceContent} renderLoading={renderLoading}>
    {children}
  </Resource>

export default VersionList
