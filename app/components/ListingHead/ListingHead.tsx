'use client'

import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

interface ListingHeadProps {
  title: string
  locationValue: string
  imageSrc: string
  id: string
  currentUser?: SafeUser | null
}

const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.label}, ${location?.region}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image src={imageSrc} alt={title} fill className='object-cover' />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
