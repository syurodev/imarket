import NavbarComponent from '@/Components/Navbar/NavbarComponent'
import React from 'react'

type IProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 pb-5">
        {children}
      </main>
    </div>
  )
}

export default MainLayout