import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = ({onChangeInput, onButtonSubmit}) => {
    return(
        <div>
            <p className="f3">SmartBrain will detect faces in your pictures. Give it a try!</p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" placeholder="Enter Image Link" onChange={onChangeInput} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" type="submit" onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;