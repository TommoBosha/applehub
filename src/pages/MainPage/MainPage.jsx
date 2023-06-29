import React from 'react'
import Slider from '../../components/Slider/Slider'
import InfoComponent from '../../components/AppBar/InfoComponent/InfoComponent'
import CatalogComponent from '../../components/CatalogComponent/CatalogComponent'
import { Container } from '@mui/material'


function MainPage() {
  return (
    <div>
      <Slider />
       <Container maxWidth="lg">
      <InfoComponent />
        <CatalogComponent />
        </Container>
    </div>
  )
}


export default MainPage