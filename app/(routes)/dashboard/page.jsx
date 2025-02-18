'use client'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

const Dashboard = () => {
  const [budgetlist,setBudgetList]=useState([])
  const [expanses,setExpanses]=useState([])
  
      useEffect(()=>{
         getBudgetListmongo();
      },[])

  //mongoDb

  const getBudgetListmongo=async()=>{
    // e.preventDefault();
    console.log("uiyuyui")
    try{
   const res=   await fetch('../api/budget/getbudgetlist',{
        method:'GET'
      })
      const data = await res.json();
      console.log(data.budgets,"dfsdfuu")
      getAllExpanseswithMongo();
      setBudgetList(data.budgets);
      console.log(budgetlist,"trrty")
    }catch(err){

      console.log(err)
    }
  }
  const getAllExpanseswithMongo = async () => {
    try {
        const res = await fetch('../api/expanses/getallExpanses', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (data.success) {
            setExpanses(data.expenses);
            console.log(data.expenses, "uio");
        }
    } catch (err) {
        console.error("Error fetching expenses:", err);
    }
};

  return (
    <div className=' p-8'>
      <h2 className=' font-bold text-3xl'>Hi,Shivam Yadav</h2>
      <p className=' text-gray-500 '>Here's what happening with your money,Let's Manage your expanses </p>

      <CardInfo budgetList={budgetlist} />
      <div className=' grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className=' md:col-span-2'>
          <BarChartDashboard budgetList={budgetlist}/>

          <ExpenseListTable expansesList={expanses} refreshData={()=>getBudgetListmongo()}/>
        </div>
        <div className=' grid gap-5'>
          <h2 className=' font-bold text-lg'>Latest Budget</h2>
          {budgetlist.map((budget,index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))
        
        }
        </div>

      </div>
    </div>
  )
}

export default Dashboard