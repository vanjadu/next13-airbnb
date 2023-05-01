'use client'

import qs from 'query-string'
import useSearchModal from '@/app/hooks/useSearchModal'
import Modal from '../Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, {
  CountrySelectValue,
} from '../../CountrySelect/CountrySelect'
import { formatISO, setDate } from 'date-fns'
import Heading from '../../Heading'
import DateCalendar from '../../DateCalendar'
import Counter from '../../Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState<number>(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [roomCount, setRoomCount] = useState<number>(1)
  const [bathroomsCount, setBathroomsCount] = useState<number>(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const Map = useMemo(
    () => dynamic(() => import('../../LocationMap'), { ssr: false }),
    [location]
  )

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQUery = {}

    if (params) {
      currentQUery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQUery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomsCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomsCount,
    dateRange,
    searchModal,
    onNext,
    params,
    router,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where are you going?'
        subTitle='Find the perfect place to stay'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng as number[]} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go'
          subTitle='Make sure everyone is free'
        />
        <DateCalendar
          value={dateRange}
          onChange={(value) => {
            setDateRange(value.selection)
          }}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subTitle='Find your perfect place' />
        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomsCount}
          onChange={(value) => setBathroomsCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  )
}

export default SearchModal
