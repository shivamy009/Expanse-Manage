'use client'

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { Link } from 'react-router-dom'


const Header = () => {
    // const {user,isSignedIn}=useUser();
  return (
    <div className=' p-5 flex justify-between items-center border shadow-sm'>
        <Image src={'./logo.svg'} alt='logo' height={100} width={160}/>
        
            <Button>Get Started</Button>
           
    </div>
  )
}

export default Header