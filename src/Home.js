import React from 'react'
import FeatureProduct from './component/FeatureProduct';
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
      <FeatureProduct/>
      <Services/>
      <Truested/>
    </>
  )
}

export default Home
