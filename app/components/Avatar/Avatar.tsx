'use client'

import Image from 'next/image'
import AvatarGif from '../../assets/avatarPlaceholder.gif'

interface AvatrProps {
  src: string | null | undefined
}

const Avatar = ({ src }: AvatrProps) => {
  return (
    <Image
      alt='Avatar'
      className='rounded-full'
      height={30}
      width={30}
      src={src || AvatarGif}
    />
  )
}

export default Avatar
