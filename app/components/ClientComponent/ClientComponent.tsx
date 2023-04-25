'use client'

import { useEffect, useState } from 'react'

interface ClientComponentProps {
  children: React.ReactNode
}

const ClientComponent = ({ children }: ClientComponentProps) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div>{children}</div>
}

export default ClientComponent
