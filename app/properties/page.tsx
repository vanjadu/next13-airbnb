import EmptyState from '../components/EmptyState'
import ClientComponent from '../components/ClientComponent'
import getCurrentUser from '../actions/getCurrentUser'
import getListings from '../actions/getListings'
import PropertiesClient from '../components/PropertiesClient'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientComponent>
        <EmptyState
          title='You are not signed in'
          subtitle='Sign in to view your trips.'
        />
      </ClientComponent>
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (!listings.length) {
    return (
      <ClientComponent>
        <EmptyState
          title='No properties found'
          subtitle='Looks like you have no properties.'
        />
      </ClientComponent>
    )
  }

  return (
    <ClientComponent>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientComponent>
  )
}

export default PropertiesPage
