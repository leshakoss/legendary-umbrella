import { sortBy } from 'lodash'

export function sortVersions (versions) {
  return sortBy(versions, [
    // Major version number
    ({ tag }) => -parseInt(tag.match(/v(\d+)/)[1], 10),
    // Minor version number
    ({ tag }) => -parseInt(tag.match(/v\d+\.(\d+)/)[1], 10),
    // Path version number
    ({ tag }) => -parseInt(tag.match(/v\d+\.(\d+)/)[1], 10),
    // Version stage
    ({ tag }) => {
      if (tag.includes('alpha')) {
        return 0
      } else if (tag.includes('beta')) {
        return -1
      } else if (tag.includes('rc')) {
        return -2
      } else {
        return -3
      }
    },
    // Version stage number
    ({ tag }) => {
      const result = tag.match(/v\d+\.\d+\.\d+-\w+\.?(\d+)/)
      if (result) {
        return -parseInt(result[1], 10)
      }
      return 0
    }
  ])
}
