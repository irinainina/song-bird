import React, { Component } from 'react';
import "./Quiz.css";
import birdsData from '../../data/birds';
import AudioPlayer from '../Audio/AudioPlayer';
import birdImage from '../../assets/img/bird.jpg';
import winAudio from '../../assets/audio/win.mp3';

export default class Quiz extends Component {

  render() {

    const { page, random, win } = this.props;

    return (
      <div className="random-bird jumbotron rounded">
        <img className="bird-image"
             src={win ? birdsData[page][random].image : birdImage} 
             alt={win ? birdsData[page][random].name : 'bird'} />
        <div>          
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h3>{win ? birdsData[page][random].name : '******'}</h3>
            </li>
            <li className="list-group-item">
              <AudioPlayer url={win ? winAudio : birdsData[page][random].audio} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}