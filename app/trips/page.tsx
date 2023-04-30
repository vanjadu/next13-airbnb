import EmptyState from '../components/EmptyState'
import ClientComponent from '../components/ClientComponent'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from '../components/TripsClient'

const TripsPage = async () => {
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

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (!reservations.length) {
    return (
      <ClientComponent>
        <EmptyState
          title='No trips found'
          subtitle='You have not booked any trips yet.'
        />
      </ClientComponent>
    )
  }

  return (
    <ClientComponent>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientComponent>
  )
}

export default TripsPage
