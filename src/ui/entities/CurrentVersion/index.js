import { useEntity } from '_lib/state'

const useCurrentVersion = ({ initialValue }) =>
  useEntity({ path: 'currentVersion', initialValue })

export default useCurrentVersion
