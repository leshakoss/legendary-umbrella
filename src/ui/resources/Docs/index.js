import { useResource } from '_lib/state'
import { firebaseURL } from '_lib/firebase'

const docsResourceURL = (docsKey) =>
  firebaseURL(`docs/${docsKey}`)

const useDocs = ({ docsKey }) =>
  useResource({
    url: docsResourceURL(docsKey),
  })

export default useDocs
