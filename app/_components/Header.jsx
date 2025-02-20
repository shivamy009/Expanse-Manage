'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
 


const Header = () => {
     
  return (
    <div className=' p-3 flex justify-between items-center border shadow-sm bg-blue-500'>
        <Image src={'./logo.svg'} alt='logo' height={100} width={160}/>
        
            <Link href={'/dashboard'}><Button>Get Started</Button></Link>
           
    </div>
  )
}

export default Header