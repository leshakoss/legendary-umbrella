import React from 'react'
import Entity from '_lib/Entity'
import VersionList from 'ui/resources/VersionList'
import Contributors from 'ui/resources/Contributors'
import Docs from 'ui/resources/Docs'
import Home from 'ui/screens/Home'
import NotFound from 'ui/screens/NotFound'

const routes = [
  {
    path: '',
    exact: true,
    component: Home
  },
  {
    path: '**',
    component: NotFound
  }
]

const UI = () =>
  <div>
    <Entity path='counter' initialValue={0}>
      {
        (counter, act) =>
          <div>
            {counter}
            <button onClick={() => act(counter => counter + 1)}>Increment</button>
          </div>
      }
    </Entity>

    <VersionList>
      {
        (versionsResource) => {
          if (versionsResource.error) {
            return <div>Houston, we have a problem!</div>
          }

          if (versionsResource.content) {
            return <div>
              <select>
                {versionsResource.content.map(({ tag }) =>
                  <option key={tag} value={tag}>{tag}</option> 
                )}
              </select>

              <Docs docsKey={versionsResource.content[0].docsKey}>
                {
                  (docsResource) => {
                    if (docsResource.error) {
                      return <div>Docs preload error</div>
                    }

                    if (docsResource.content) {
                      return <div>Docs are preloaded!</div>
                    }

                    return <div>Loading...</div>
                  }
                }
              </Docs>
            </div>
          }

          return <div>Loading...</div>
        }
      }
    </VersionList>

    <Contributors>
      {
        (contributorsResource) => {
          if (contributorsResource.error) {
            return <div>Houston, we have a problem!</div>
          }

          if (contributorsResource.content) {
            return <ul>
              {contributorsResource.content.map(user =>
                <li key={user.id}>
                  <a href={user.url}>
                    <img src={user.avatarUrl} style={{width: 100, height: 100}} />
                    <span>{user.name}</span>
                  </a>
                </li>
              )}
            </ul>
          }

          return <div>Loading...</div>
        }
      }
    </Contributors>
  </div>

export default UI
