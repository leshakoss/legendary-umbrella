import { createResource } from '_lib/state'

const url = 'https://api.github.com/repos/date-fns/date-fns/contributors?per_page=999'

/**
 * @example
 * <Contributors renderLoading={Spinner}>
 *   {
 *     (contributors) =>
 *       JSON.stringify(contributors)
 *   }
 * </Contributors>
 */
const Contributors = createResource({
  name: 'Contributors',
  url,
  callback: content =>
    content.map(
      user => ({
        id: user.id,
        url: user.html_url,
        avatarUrl: user.avatar_url,
        name: user.login,
      })
    )
})

export default Contributors
