'use client'
import {signIn} from 'next-auth/react'


function Login() {
  return (
    <div>
        <button onClick={() => signIn()} className=''>
            Sign In
        </button>
    </div>
  )
}

export default Login