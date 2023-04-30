import EmptyState from '../components/EmptyState'
import ClientComponent from '../components/ClientComponent'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import ReservationsClient from '../components/ReservationsClient'

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientComponent>
        <EmptyState
          title='You are not logged in'
          subtitle='Please log in to see your reservations'
        />
      </ClientComponent>
    )
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (!reservations) {
    return (
      <ClientComponent>
        <EmptyState
          title='You have no reservations'
          subtitle='Looks like you have no reservations on your properties'
        />
      </ClientComponent>
    )
  }

  return (
    <ClientComponent>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientComponent>
  )
}

export default ReservationsPage
