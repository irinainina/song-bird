import React, { Component } from 'react';
import "./GameOver.css";
import winImage from '../../assets/img/win.jpg';

export default class extends Component { 
  render() {
    const {score, showGame} = this.props;
    const congratulations = (
      <>
        <h1 className="display-3 text-center">Поздравляем!</h1>
        <p className="lead text-center">Вы прошли викторину и набрали {score} из 30 возможных баллов</p>         
        <hr className="my-4" />
      </>
    ) 
    if(score === 30) {
      return (
        <div className="jumbotron game-over">
          {congratulations}
          <img className="img-win" 
               src={winImage} alt="win" />
        </div>
      )
    } else {   
      return (
        <div className="jumbotron game-over">
          {congratulations}
          <button
            className="btn btn-next btn-game-over"
            onClick={showGame}>
              Попробовать еще раз!
          </button>
        </div>
      );
    }
  }
}
