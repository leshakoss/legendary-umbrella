import React from 'react'
import Entity from '_lib/Entity'
import VersionList from 'ui/resources/VersionList'
import Docs from 'ui/resources/Docs'
import Spinner from 'ui/components/Spinner'

const VersionSelect = () =>
  <VersionList renderLoading={Spinner}>
    {
      (versions) =>
        <Entity path='currentVersion' initialValue={versions[0].tag}>
          {(currentVersion, setCurrentVersion) =>
            <div>
              <select value={currentVersion} onChange={(event) => setCurrentVersion(() => event.target.value)}>
                {versions.map(({ tag }) =>
                  <option key={tag} value={tag}>{tag}</option> 
                )}
              </select>

              {/* Preload docs */}
              <Docs docsKey={versions.find(({ tag }) => tag === currentVersion).docsKey} />
            </div>
          }
        </Entity>
    }
  </VersionList>

export default VersionSelect
