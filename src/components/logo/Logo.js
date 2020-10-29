import React from 'react';
import Tilt from "react-tilt";
import './logo.css';
import brainlogo from './brain-logo.png';

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 40 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img src={brainlogo} alt="Brain-Logo" style={{paddingTop:'5px'}} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;