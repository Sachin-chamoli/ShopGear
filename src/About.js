
import HeroSection from './component/HeroSection'
import { useProductContext } from './context/productcontext';
// import { AppContext } from './context/productcontext'

const About = () => {

  // const{ myName} = useContext(AppContext);
  const{ myName} = useProductContext();

  const data = {
    name: "ShopKart Ecommerce",
  }
  return <>
  {myName}
    <HeroSection myData={data}/>
  </>
}

export default About
