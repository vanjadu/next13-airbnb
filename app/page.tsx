import getCurrentUser from './actions/getCurrentUser'
import getListings, { IListingsParams } from './actions/getListings'
import ClientComponent from './components/ClientComponent'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/ListingCard'

interface HomeProps {
  searchParams: IListingsParams
}

export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientComponent>
        <EmptyState showReset />
      </ClientComponent>
    )
  }

  return (
    <div>
      <ClientComponent>
        <Container>
          <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
      </ClientComponent>
    </div>
  )
}

export default Home
