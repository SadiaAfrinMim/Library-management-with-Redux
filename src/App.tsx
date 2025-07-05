import { Outlet } from "react-router-dom"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"



function App() {


  return (
    <>
     <Navbar></Navbar>
     <div className="h-screen">
      <Outlet></Outlet>
     </div>
     <Footer></Footer>
    </>
  )
}

export default App
