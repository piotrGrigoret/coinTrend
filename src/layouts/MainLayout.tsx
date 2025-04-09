import React from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'

export const MainLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
