'use client'
import {signOut} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'


type User = {
image: string
}

function Logged({image}: User) {
  return (
    <div className='flex space-x-2'>
        <button 
        className='bg-myOrange py-1 px-4 rounded-md text-sm'
        onClick={() => signOut({callbackUrl:'/'})}>Sign Out</button>
        <Link href={'/dashboard'}>
            <Image
            className='rounded-full object-cover'
            height={40} 
            width={40} 
            src={image}
            alt={image}
            priority
            />
        </Link>
    </div>
  )
}

export default Logged