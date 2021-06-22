import React from 'react';


const BCard = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
        <div className='card-body'>
            {props.children}
        </div>
    </div>
  );
};

export default BCard;