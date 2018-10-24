import React from 'react'
import Resource from '_lib/ResourceWithContentCallback'
import { firebaseURL } from '_lib/firebase'

import { sortVersions } from './utils'

export const versionsResourceURL = () =>
  firebaseURL('versions')

const processResourceContent = rawVersions =>
  sortVersions(Object.values(rawVersions))

const VersionList = ({ children, renderLoading }) =>
  <Resource url={versionsResourceURL()} contentCallback={processResourceContent} renderLoading={renderLoading}>
    {children}
  </Resource>

export default VersionList
