import Link from 'next/link'
import Login from './Login'
import { getServerSession } from 'next-auth/next'
import Logged from './Logged'
import {authOptions} from '../../pages/api/auth/[...nextauth]'

export default async function Nav() {
    const session = await getServerSession(authOptions)
return (
    <nav className='flex justify-between items-center p-5 bg-[#1A385A] text-white font-600'>
        <Link
        href={"/"}>
            <h1>Test</h1>
        </Link>
        <div className='flex items-center'>
            <Link
            className='mr-2'
                href={"/dashboard/profile"}>
                    <button>Entertainer</button>
            </Link>
            {session?.user.role === 'Admin' &&  
            <Link
            className='mr-2'
                href={"/admin"}>
                    <h1>Admin</h1>
            </Link>
            }
            {!session?.user && <Login/>}
            {session?.user && <Logged image={session.user?.image || ''}/>}
        </div>
    </nav>
)
}