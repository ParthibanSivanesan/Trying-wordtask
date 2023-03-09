import React, { Component, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.css'
import CorrectAnswer from './Sounds/CorrectAnswer.mp3'
import IncorrectAnswer from './Sounds/IncorrectAnswer.mp3'
import Winaudio from './Sounds/Winaudio.mp3'
import Failaudio from './Sounds/Failaudio.mp3'

const WORD_LIST = [
  { answer: 'YOUTUBE', hint: 'Like share and subscribe' },
  { answer: 'AMAZON', hint: 'Online shopping' },
  { answer: 'REACT', hint: 'Javascript library' },
  { answer: 'AVENGERS', hint: 'Infinity war' },
  { answer: 'DIAMOND', hint: 'Can cut the glass' },
  { answer: 'AVATAR', hint: 'The way of water' },
  { answer: 'WIKIPEADIA', hint: 'Online dictionary' },
  { answer: 'JAVASCRIPT', hint: 'Dynamic Language' },
  { answer: 'AEROPLANE', hint: 'Travel on the air' },
  { answer: 'FACEBOOK', hint: 'Social Media App' },
];


class Hard extends Component {
    constructor(props) {
      super(props);
  
      const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
      const { answer, hint } = WORD_LIST[randomIndex];
   
  
      this.state = {
        answer,
        hint,
        userInput: '',
        userAttempts: 0,
        userChances: 5,
        inputFields: Array.from({ length: answer.length }, () => ''),
        gameEnded: false,
        gameWon: false,
        caudio: new Audio(CorrectAnswer),
        iaudio: new Audio(IncorrectAnswer),
        winaudio: new Audio(Winaudio),
        failaudio: new Audio(Failaudio),
        time: {},
        seconds: 10,
      };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
        let divisor_for_minutes = secs % (60 * 60);
        // let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
        //   "m": minutes,
          "s": seconds
        };
        
        return obj;
        
      }

  componentDidMount(){
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({time: timeLeftVar});
    // this.startTimer();
  }  
  
  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
    time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    //To End the game if after 10sec
    this.setState({ gameEnded: true });
    this.fail(); 
    }
  }
  


  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value.toUpperCase() });
  };

  isValidInput = () => {
    const { userInput } = this.state;

    return userInput.length >= 1;
  };

  handleSubmit = () => {
    const { answer, userInput, inputFields, userAttempts, userChances } =
      this.state;
    let newInputFields = [...inputFields];
    let newGameEnded = false;
    let newGameWon = false;

    if (userInput.length === 1) {
      if (answer.includes(userInput)) {
        answer.split('').forEach((char, index) => {
          if (char === userInput) {
            newInputFields[index] = char;
            this.state.caudio.play();
          }
        });
      } else {
        this.setState({ userChances: userChances - 1 });
        this.state.iaudio.play();
      }
    } else {
      if (userInput === answer) {
        newInputFields = answer.split('');
        newGameEnded = true;
        newGameWon = true;
        this.state.caudio.play();
      } else {
        this.setState({ userChances: userChances - 1 });
        this.state.iaudio.play();
        //console.log("play");
      }
    }

    if (newInputFields.join('') === answer) {
      newGameWon = true;
      newGameEnded = true;
    }

    this.setState({
      inputFields: newInputFields,
      userInput: '',
      userAttempts: userAttempts + 1,
      gameEnded: newGameEnded,
      gameWon: newGameWon,
    });

    if (userChances === 1) {
      this.setState({ gameEnded: true });
    }
  };


  startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    const { answer, hint } = WORD_LIST[randomIndex];

    this.setState({
      answer,
      hint,
      userInput: '',
      userAttempts: 0,
      userChances: 5,
      inputFields: Array.from({ length: answer.length }, () => ''),
      gameEnded: false,
      gameWon: false,
      time: {},
      seconds: 10,
    });
    this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    this.startTimer();
  };

  win = () =>{
    this.state.winaudio.play();
    alert(`Congratulations! You guessed it correct`);
  }
  
  fail = () =>{
    this.state.failaudio.play();
    alert(`Try Again!! The correct word is ${this.state.answer}`);
  }
 

  render() {
    const {
      hint,
      inputFields,
      userInput,
      userAttempts,
      userChances,
      gameEnded,
      gameWon,
    } = this.state;
    
    // this.startTimer();

    return (
      
      <div className="wrapper" >
        <h1><center>Can You Guess?</center></h1>
        <div className="input-fields">
          {inputFields.map((field, index) => (
            <input className="inputbox" key={index} type="text" value={field} readOnly/>
          ))}
        </div>
        

        <div className="hint">
          <b>Hint: </b>
          <span className="message">{hint}</span>
          
        </div>
        
        <div className="hint">
        <b>Remaining Time: </b>
        {/* <span>{}</span> */}
        
        s: {this.state.time.s}
        </div>

        <div className="user-input">
          <b>Enter Your Answer: </b>
          <input
            className="typinginputbox"
            type="text"
            value={userInput}
            onChange={this.handleInputChange}
          />
        </div>


        <div className="message">
        <button className="button" disabled={!this.isValidInput()} onClick={this.handleSubmit}>
            <div>Submit</div>
        </button>
        </div>
        
        <div className="message">
          {gameWon &&  <div>
            {this.win()}
            Congratulations!!
            </div>}
          {gameEnded && !gameWon && <div>
            {this.fail()}
            Try again!</div>}
          {!gameEnded && (
            <div>
             <b>Attempts:</b> {userAttempts}<br></br>
             <br></br><b>Chances Left:</b> {userChances}
            </div>
          )}
          {gameEnded && <button className="button" onClick={this.startNewGame}>Try Again</button>}
        </div>
        <div>
        <button>
        <Link to="/" className="button2">Home</Link>
        </button>
        <button className="button2" onClick={this.startTimer}>Start</button>
        <Outlet />
        </div>
      </div>
      
    );
  }
}


export default Hard;