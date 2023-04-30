'use client'

import { SafeReservation, SafeUser } from '@/app/types'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Heading from '../Heading'
import Container from '../Container'
import ListingCard from '../ListingCard'

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string>('')

  const onCacel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Something went wrong')
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title='Reservations' subTitle='Bookingson your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-calls-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCacel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
