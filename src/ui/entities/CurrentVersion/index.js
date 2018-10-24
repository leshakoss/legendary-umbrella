import { createEntity } from '_lib/state'

/**
 * @example
 * <CurrentVersion initialValue={versions[0].tag}>
 *   {
 *     (currentVersion, setCurrentVersion) =>
 *       // ...
 *   }
 * </VersionList>
 */
const CurrentVersion = createEntity({
  name: 'CurrentVersion',
  path: 'currentVersion',
  initialValue: ({ initialValue }) => initialValue
})

export default CurrentVersion
