import React from 'react'
import Spinner from 'ui/components/Spinner'
import VersionSelect from 'ui/components/VersionSelect'
import useContributors from 'ui/resources/Contributors'

const UserListItem = ({ user }) =>
  <a href={user.url}>
    <img src={user.avatarUrl} style={{width: 100, height: 100}} />
    <span>{user.name}</span>
  </a>

const Home = () => {
  const [{ content: contributors = [], loading }] = useContributors()

  return <React.Fragment>
    <VersionSelect />

    {
      loading
        ? <Spinner />
        : <ul>
          {contributors.map(user =>
            <li key={user.id}>
              <UserListItem user={user} />
            </li>
          )}
        </ul>
    }
  </React.Fragment>
}

export default Home
