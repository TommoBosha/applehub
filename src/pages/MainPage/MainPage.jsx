import React from 'react'
import Slider from '../../components/Slider/Slider'
import InfoComponent from '../../components/AppBar/InfoComponent/InfoComponent'
import CatalogComponent from '../../components/CatalogComponent/CatalogComponent'
import OrderForm from '../../components/OrderForm/OrderForm'



function MainPage() {
  return (
    <div>
      <Slider />
      <OrderForm/>
      <InfoComponent />
        <CatalogComponent />
       
    </div>
  )
}


export default MainPage