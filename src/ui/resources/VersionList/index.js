import { useResource } from '_lib/state'
import { firebaseURL } from '_lib/firebase'

import { sortVersions } from './utils'

const url = firebaseURL('versions')

const useVersionList = () =>
  useResource({
    url,
    callback: (rawVersions) =>
      sortVersions(Object.values(rawVersions))
  })

export default useVersionList
