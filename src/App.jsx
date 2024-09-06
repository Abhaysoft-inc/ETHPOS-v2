import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OnBoarding from './Pages/OnBoarding'
import AddressContext from './context/walletConnectContext'
import { useState } from 'react'
import HomePage from './Pages/HomePage'
import AddShopDetails from './Pages/AddShopDetails'
import { Analytics } from "@vercel/analytics/react"
import AddPayment from './Pages/AddPayment'

function App() {

  const [account, setAccount] = useState(null);
  return (
    <>

      <AddressContext.Provider value={{ account, setAccount }}>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<OnBoarding />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/shop-details' element={<AddShopDetails />} />
            <Route path='/add-payment' element={<AddPayment />} />
          </Routes>
        </BrowserRouter>

      </AddressContext.Provider>
      <Analytics />

    </>
  )
}

export default App
