import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
        {
          boxes.map((box, index) => {
            return (
              <div key={index} className="bounding-box" style={{ top: box.topRow, right: box.rigthCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            )
          })
        }

      </div>
    </div>
  )
}

export default FaceRecognition;