import React from 'react'
import Resource from '_lib/Resource'
import { firebaseURL } from '_lib/firebase'

export const docsResourceURL = (docsKey) =>
  firebaseURL(`docs/${docsKey}`)

const Docs = ({ docsKey, children, renderLoading }) =>
  <Resource url={docsResourceURL(docsKey)} renderLoading={renderLoading}>
    {children}
  </Resource>

export default Docs
