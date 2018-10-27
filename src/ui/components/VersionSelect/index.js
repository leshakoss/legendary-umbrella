import React from 'react'
import useVersionList from 'ui/resources/VersionList'
import useCurrentVersion from 'ui/entities/CurrentVersion'
import useDocs from 'ui/resources/Docs'
import Spinner from 'ui/components/Spinner'

const PreloadDocs = ({ docsKey }) => {
  useDocs({ docsKey })
  return null
}

const VersionSelect = () => {
  const [{ content: versions = [], loading }] = useVersionList()

  const [currentVersion, setCurrentVersion] = useCurrentVersion({
    initialValue: versions[0] && versions[0].tag
  })

  if (loading) {
    return <Spinner />
  }

  return <select value={currentVersion} onChange={(event) => setCurrentVersion(() => event.target.value)}>
    {versions.map(({ tag }) =>
      <option key={tag} value={tag}>{tag}</option> 
    )}

    <PreloadDocs docsKey={versions.find(({ tag }) => tag === currentVersion).docsKey} />
  </select>
}

export default VersionSelect
