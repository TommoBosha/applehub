import React from 'react'
import Slider from '../../components/Slider/Slider'
import InfoComponent from '../../components/AppBar/InfoComponent/InfoComponent'
import CatalogComponent from '../../components/CatalogComponent/CatalogComponent'



function MainPage() {
  return (
    <div>
      <Slider />
      
      <InfoComponent />
        <CatalogComponent />
       
    </div>
  )
}


export default MainPage