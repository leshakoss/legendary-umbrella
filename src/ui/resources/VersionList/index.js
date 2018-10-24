import { createResource } from '_lib/state'
import { firebaseURL } from '_lib/firebase'

import { sortVersions } from './utils'

const url = firebaseURL('versions')

/**
 * @example
 * <VersionList renderLoading={Spinner} docsKey='08d4b1f8-2a92-4b3f-a6f0-bee114de03cf'>
 *   {
 *     (versions) =>
 *       versions.map(
 *         // ...
 *       )
 *   }
 * </VersionList>
 */
const VersionList = createResource({
  name: 'VersionList',
  url,
  callback: (rawVersions) =>
    sortVersions(Object.values(rawVersions))
})

export default VersionList
