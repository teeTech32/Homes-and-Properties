import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateListing from "./pages/CreateListing";
import Navbar from "./components/Navbar";
import Listing from "./pages/Listing";
import Editlisting from "./pages/Editlisting";
import Contact from "./pages/Contact";
import AOS from "aos";
import "aos/dist/aos.css" ;
import { useEffect } from "react";
import Footer from './pages/Footer'

function App() {
  useEffect(()=>{
    AOS.init({
      offset: 100,
      duration: 100,
      easing: 'ease-in-sine',
      delay:100
    });
    AOS.refresh();
  },[]);

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="/offer" element={<Offers/>}/>
        <Route path="/category/:categoryName" element={<Category/>}/>
        <Route path="/profile" element={<PrivateRoute/>}>
           <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
        <Route path="/contact/:landlordId" element={<Contact/>}/>
        <Route path="/edit-listing/:listingId" element={<Editlisting/>}/>
      </Routes>
      <Footer/>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
