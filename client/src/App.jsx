import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import Gifts from './pages/Gifts'
import GiftDetails from './pages/GiftDetails'
import PageNotFound from './pages/PageNotFound'
import { Link } from 'react-router-dom'


const App = () => {
  
  const [gifts, setGifts] = useState([]);


useEffect(() => {
    // Define an async function to fetch the data
    const getGifts = async () => {
      // Make a GET request to the backend endpoint
      // Change the fetch request to explicitly hit the backend port
const res = await fetch('http://localhost:3001/gifts')
      // Parse the incoming JSON payload into an array
      const arr = await res.json()
      // Update the React state variable with the new array
      setGifts(arr)
    }

    // Immediately execute the fetch function when the component mounts
    getGifts()
  }, [])


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Gifts data={gifts}/>
    },
    {
      path:"/gift/:id",
      element: <GiftDetails data={gifts} />
    },
    {
      path:"/*",
      element: <PageNotFound />
    }
  ]);

  
  return ( 

    <div className="App">

      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/logo.png"/>
            <h1>UnEarthed</h1>
          </div>
          <div className="header-right">
            <Link to="/"><button className="homeBtn">Home</button></Link>
          </div>
        </div>
      </header>

        {element}
        
    </div>

  );
}

export default App;