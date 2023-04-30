import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import getReservations from '@/app/actions/getReservations'
import ClientComponent from '@/app/components/ClientComponent'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from '@/app/components/ListingClient'

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientComponent>
        <EmptyState
          title='Listing not found'
          subtitle='The listing you are looking for does not exist or has been removed.'
        />
      </ClientComponent>
    )
  }

  return (
    <ClientComponent>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientComponent>
  )
}

export default ListingPage
