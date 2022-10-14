import React from 'react'
import styled from 'styled-components'
import HeroSection from './component/HeroSection';
import Services from './component/Services';
import Truested from './component/Truested';


const Home = () => {
  const data = {
    name: "ShopGear Store",

  }
  return (
    <>
      <HeroSection myData= {data}/>
      <Services/>
      <Truested/>
    </>
  )
}

export default Home
