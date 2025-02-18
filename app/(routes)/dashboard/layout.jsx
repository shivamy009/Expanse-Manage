'use client'
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
// import { db } from '@/utils'
import { Budget } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import  { db } from '../../../utils/index'
import { useRouter } from 'next/navigation'

const DashboardLayout = ({children}) => {
  const user=useUser();
const router=useRouter();
  // useEffect(()=>{
  //   user?.user&&checkUserBudget()
  // },[user?.user])
  // const checkUserBudget=async()=>{
  //   const resulti=await db.select()
  //   .from(Budget)
  //   .where(eq(Budget.createdBy,user?.user?.primaryEmailAddress?.emailAddress))

  //   console.log(resulti)

    
  // }
  return (
    <div>
        <div className=' fixed md:w-64 hidden md:block '>
            <SideNav/>
        </div>
        <div className=' md:ml-64 '>
            <DashboardHeader/>
        {children}

        </div>
        
        
        </div>
  )
}

export default DashboardLayout