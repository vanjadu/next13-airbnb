'use client'

import { PuffLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center'>
      <PuffLoader color='#F43F5E' size={100} />
    </div>
  )
}

export default Loader
