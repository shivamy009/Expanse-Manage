'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { Link } from 'react-router-dom'


const Header = () => {
    // const {user,isSignedIn}=useUser();
  return (
    <div className=' p-5 flex justify-between items-center border shadow-sm'>
        <Image src={'./logo.svg'} alt='logo' height={100} width={160}/>
        
            <Link href={'/dashboard'}><Button>Get Started</Button></Link>
           
    </div>
  )
}

export default Header