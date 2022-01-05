import React, { useEffect, useState,useRef  } from "react";
import Projects from './Projects';
import Users from './Users'
import Tickets from './Tickets';
import TicsByProject from "./TicsByProject";


function Main () {

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