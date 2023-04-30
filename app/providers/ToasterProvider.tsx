'use client'

import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        iconTheme: {
          primary: '#F43F5E',
          secondary: '#fff',
        },
      }}
    />
  )
}

export default ToasterProvider
