import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from "./brain.png";


const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="tilt br2 shadow-2" tiltMaxAngleX={35} tiltMaxAngleY={35}>
        <div className="pa3">
          <img style={{ paddingTop: '5px' }} alt="brain logo" src={brain}></img>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;