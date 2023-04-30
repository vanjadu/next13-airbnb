import EmptyState from '../components/EmptyState'
import ClientComponent from '../components/ClientComponent'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from '../components/FavoritesClient'

const ListingPage = async () => {
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientComponent>
        <EmptyState
          title='No Favorites'
          subtitle="You don't have any favorites yet."
        />
      </ClientComponent>
    )
  }

  return (
    <ClientComponent>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientComponent>
  )
}

export default ListingPage
