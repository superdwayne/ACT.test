import React from 'react'

import Header from '@/components/Header'
import MainContent from '@/components/MainContent'
import Sidebar from '@/components/Sidebar'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  )
}

export default Dashboard
