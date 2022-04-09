import React, { Component }  from 'react';
import "./App.css";
import Header from '../Header/Header';
import Quiz from '../Quiz/Quiz';
import BirdsList from '../BirdsList/BirdsList';
import Bird from '../Bird/Bird';
import GameOver from '../GameOver/GameOver';
import winAudio from '../../assets/audio/win.mp3';
import errorAudio from '../../assets/audio/error.mp3';

export default class App extends Component { 
  state = {
    random: 0,
    page: 0,
    id: 0,
    select: false,
    win: false,
    score: 0,
    step: 0,
    gameEnd: false
  }

  componentDidMount() {
    this.setState({
      random: this.randomBird()
    });
  }

  randomBird = () => {
    return Math.floor(Math.random() * 6);
  }

  onBirdSelected = (id, event) => {
    event.persist();
    this.setState({
      id: id - 1,
      select: true
    });
    if(!event.target.classList.contains('success') && !event.target.classList.contains('error')) {
      this.setState((prevState) => ({
        step: prevState.step + 1
      }));
    }
    this.getWin(id);
    this.styleListItem(event);  
  };

  styleListItem = (event) => {
    if(event._targetInst.key - 1 === this.state.random && !this.state.win) { 
      event.target.classList.add('success')
    } else if(event._targetInst.key - 1 !== this.state.random && !this.state.win) {  
      event.target.classList.add('error')
    } 
  }

  getWin = (id) => {
    if(this.state.win) return;
    if(id - 1 !== this.state.random) {
      this.audioEffects(false);
    } else {
      this.setState((prevState) => ({
        score: prevState.score + 5 - this.state.step,
        win: true
      }));
      this.audioEffects(true);
    }    
  }
  
  audioEffects = (win) => {
    const winAudio = document.getElementById("winSound");
    const errorAudio = document.getElementById("errorSound");
    if(win) {
      winAudio.currentTime = 0;
      winAudio.play();
    } else {
      errorAudio.currentTime = 0;
      errorAudio.play();
    }
  }

  getNextPage = () => {
    if(!this.state.win) return;
    if(this.state.page === 5) {
      this.setState({
        page: -1,
        gameEnd: true
      });
    };
    this.setState((prevState) => ({       
      random: this.randomBird(),
      page: prevState.page + 1,
      select: false,
      win: false,
      step: 0
    }));
  }  
  
  showGame = () => {
    this.setState({
      score: 0,
      gameEnd: false
    });
  }
  
  render() {
    const {random, page, id, select,  win, score, gameEnd } = this.state;
    if(gameEnd) {
      return (
       <> 
        <Header 
          page={page}
          score={score} />
        <GameOver 
          score={score} 
          showGame={this.showGame} />
        </>
      )
    } else {   
      return (
        <>        
          <Header 
            page={page}
            score={score} />        
          <Quiz 
            random={random} 
            page={page}
            win={win} />
          <div className="row mb2">
            <BirdsList
              onItemSelected={this.onBirdSelected}
              page={page} />
            <Bird 
              id={id} 
              page={page}
              select={select} />
            <button
              className={win ? "btn btn-next" : "btn"}
              onClick={this.getNextPage}>
                Next Level
            </button>
          </div>
          <audio src={winAudio} id="winSound"></audio>
          <audio src={errorAudio} id="errorSound"></audio>
        </>
      )
    }
  }
}