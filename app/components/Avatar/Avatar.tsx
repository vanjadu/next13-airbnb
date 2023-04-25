'use client'

import Image from 'next/image'
import AvatarGif from '../../assets/avatarPlaceholder.gif'

const Avatar = () => {
  return (
    <Image
      alt='Avatar'
      className='rounded-full'
      height={30}
      width={30}
      src={AvatarGif}
    />
  )
}

export default Avatar
