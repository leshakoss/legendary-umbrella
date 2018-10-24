import { createResource } from '_lib/state'
import { firebaseURL } from '_lib/firebase'

const docsResourceURL = (docsKey) =>
  firebaseURL(`docs/${docsKey}`)

/**
 * @example
 * <Docs renderLoading={Spinner} docsKey='08d4b1f8-2a92-4b3f-a6f0-bee114de03cf'>
 *   {
 *     (docs) =>
 *       JSON.stringify(docs)
 *   }
 * </Docs>
 */
const Docs = createResource({
  name: 'Docs',
  url: ({ docsKey }) => docsResourceURL(docsKey)
})

export default Docs
