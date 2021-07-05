import React from "react";
import { Route } from "react-router-dom";
import NavBar from './components/NavBar';
import SideMenu from './components/NavBar/SideMenu';
import LandPage  from './components/LandPage';
import Home from './components/Home';
import BreedDetail from './components/BreedDetail';
import AddBreed from './components/AddBreed';


function App() {

  // React state to know if display mobile menu
  const [mobile, setMobile] = React.useState(false);
  // Function to toggle menu
  const isMobile = () =>{ setMobile(!mobile) };

  // Menu will be display in all routes

  return (
    <React.Fragment>
        <SideMenu mobile={mobile} isMobile={isMobile} />
        <NavBar isMobile={isMobile}/>
        <Route exact path="/" component={LandPage} />
        <Route exact path="/breeds" component={Home} />
        <Route path="/addBreed" component={AddBreed} />
        <Route path="/breeds/:idRaza" component={BreedDetail} />
    </React.Fragment>
  );
}

export default App;
