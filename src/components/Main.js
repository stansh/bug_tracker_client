import React from "react";
import Projects from './Projects';
import Users from './Users'
import TicsByProject from "./TicsByProject";


function Main () {
  document.body.style.backgroundColor = 'white'
  document.body.style.backgroundImage = null

  return (
      <>
        <div className = 'row'>
          <div className = 'col-lg-6 mt-5'>
            <Projects  />
          </div>
          <div className = 'col-lg-6 mt-5'>
            <Users/>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-3-md mt-5'>
            <TicsByProject/>
          </div>
        </div> 
      </>
  )
}

export default Main