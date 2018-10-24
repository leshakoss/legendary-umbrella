import React from 'react'
import Spinner from 'ui/components/Spinner'
import VersionSelect from 'ui/components/VersionSelect'
import Contributors from 'ui/resources/Contributors'

const UserListItem = ({ user }) =>
  <a href={user.url}>
    <img src={user.avatarUrl} style={{width: 100, height: 100}} />
    <span>{user.name}</span>
  </a>

const Home = () =>
  <div>
    <VersionSelect />

    <Contributors renderLoading={Spinner}>
      {
        (contributors) =>
          <ul>
            {contributors.map(user =>
              <li key={user.id}>
                <UserListItem user={user} />
              </li>
            )}
          </ul>
      }
    </Contributors>
  </div>

export default Home
