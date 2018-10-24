import React from 'react'
import VersionList from 'ui/resources/VersionList'
import CurrentVersion from 'ui/entities/CurrentVersion'
import PreloadDocs from 'ui/resources/Docs'
import Spinner from 'ui/components/Spinner'

const VersionSelect = () =>
  <VersionList renderLoading={Spinner}>
    {
      (versions) =>
        <CurrentVersion initialValue={versions[0].tag}>
          {(currentVersion, setCurrentVersion) =>
            <div>
              <select value={currentVersion} onChange={(event) => setCurrentVersion(() => event.target.value)}>
                {versions.map(({ tag }) =>
                  <option key={tag} value={tag}>{tag}</option> 
                )}
              </select>

              {/* Preload docs */}
              <PreloadDocs docsKey={versions.find(({ tag }) => tag === currentVersion).docsKey} />
            </div>
          }
        </CurrentVersion>
    }
  </VersionList>

export default VersionSelect
