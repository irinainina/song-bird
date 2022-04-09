import React, { Component } from 'react';
import './Bird.css';
import birdsData from '../../data/birds';
import AudioPlayer from '../Audio/AudioPlayer';

export default class Bird extends Component {

  render() {
    
    const { page, id, select } = this.props;
    const styleItem = {
      display: select ? 'flex' : 'none'
    };
    const styleInstruction = {
      display: select ? 'none' : 'block'
    };
    
    return (
      <div className="col-md-6">        
        <div className="bird-details card"> 
          <p className="instruction"
             style={styleInstruction} >
             <span>Послушайте плеер.</span>
             <span>Выберите птицу из списка</span>
          </p>
          <div className="card-body" 
               style={styleItem}>  
            <img className="bird-image"
            src={birdsData[page][id].image} alt={birdsData[page][id].name} />
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h4>{birdsData[page][id].name}</h4>
              </li>
              <li className="list-group-item">
                <span>{birdsData[page][id].species}</span>
              </li>
              <li className="list-group-item">
                <AudioPlayer url={birdsData[page][id].audio} />
              </li>
            </ul>
          </div>
          <span className="bird-description"
            style={styleItem}>
            {birdsData[page][id].description}
          </span>
        </div>
      </div>
    )
  }
}
