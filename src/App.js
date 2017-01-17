import React, { Component } from 'react'
import classNames from 'classnames'

import RaisedButton from 'material-ui/RaisedButton'
import sampleSize from 'lodash.samplesize'

import decks from './decks/all-decks'

import DeckSelector from './DeckSelector.js'
import Stats from './Stats.js'

import Paper from 'material-ui/Paper'
import Toggle from 'material-ui/Toggle'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { findDeck } from './lib/decks.js'


import './App.css'


function Card({value, status}) {
  let style = {}
  if (value.endsWith('jpg') || value.endsWith('png')) {
    style = {
      backgroundImage: `url(${value})`,
      backgroundSize: 'cover',
      height: '300px',
      color: 'transparent'
    }
  }

  return <Paper
            className={classNames('card', `card--${status}`)}
            style={style}
            zDepth={1}
         >
          {value}
        </Paper>
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      random: false,
      answers: [],
      consecutiveGoodAnswers: 0,
      currentIndex: 0,
      previousCard: null,
      flipped: false,
      repeatLastCard: false,
      input: '',
      inputClass: '',
      decks: decks,
      deck: decks[0],
      stats: {},
      hint: '',
      userData: {}
    }

    this.handleDeckSelected = this.handleDeckSelected.bind(this)
    this.nextCard = this.nextCard.bind(this)
    this.resetAnswer = this.resetAnswer.bind(this)
    this.toggleRandom = this.toggleRandom.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    this.getRandomAnswers()
    window.addEventListener('keypress', this.handleKeyUp)
  }

  showAnswer() {
    this.setState({
      answer: this.getCurrentCard().a
    })
  }

  handleKeyUp(event) {
    event.preventDefault()
    const keyMap = {
      v: 0,
      b: 1,
      n: 2
    }
    if (event.key === ' ') {
      this.showAnswer()
      return
    }
    const index = keyMap[event.key]
    if (!isNaN(index)) {
      this.checkAnswer(this.state.answers[index].a)
    }
  }

  handleDeckSelected(event, index, value) {
    const newDeck = findDeck(value, decks)
    this.setState({
      deck: newDeck,
      linear: typeof newDeck.linear === 'boolean' ?  newDeck.linear : false
    },this.getRandomAnswers)
  }

  nextCard() {
    let currentIndex
    if (this.state.random) {
        currentIndex = Math.floor(Math.random() * this.state.deck.cards.length)
    } else {
        const nextIndex = this.state.currentIndex + 1
        currentIndex = nextIndex <= this.state.deck.cards.length - 1 ? nextIndex : 0
    }
    this.setState({
      currentIndex,
      answer: '',
      status: 'normal'
    }, this.getRandomAnswers)
  }

  getRandomAnswers() {
    const numberAnswers = 3
    const currentCard = this.getCurrentCard()
    const filteredCards = this.state.deck.cards
      .filter((card) => card.a !== currentCard.a)
    let res = sampleSize(filteredCards, numberAnswers)
    // TODO put in random place
    res[Math.floor(Math.random() * numberAnswers)] = currentCard
    this.setState({
      answers: res
    })
  }

  resetAnswer() {
    this.setState({
      status: 'normal',
      answer: ''
    })
  }

  checkAnswer(answer) {
    this.setState({answer})
    if (answer === this.getCurrentCard().a) {
      this.setState({status: 'correct'})
      setTimeout(this.nextCard, 500)
    } else {
      this.setState({status: 'wrong'}, () => {
        setTimeout(this.resetAnswer, 500)
      })
    }
  }

  toggleRandom() {
      this.setState({
        random: !this.state.random
      })
  }

  getCurrentCard() {
    return this.state.deck.cards[this.state.currentIndex]
  }

  render() {
    const deck = this.state.deck
    const currentCard = this.getCurrentCard()

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span><i>Fast</i> <b>Cards</b></span>}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div className="button-container">
            <DeckSelector
              className="selector"
              decks={decks}
              value={this.state.deck.name}
              onDeckSelected={this.handleDeckSelected}
            />
            <Toggle
               className="toggle"
               label="Linear mode"
               value={this.state.random}
               onToggle={this.toggleRandom}
               defaultToggled={true}
             />
            <Card value={currentCard.q}/>
            <Paper
              className={classNames('card', `card--${this.state.status}`)}
            >
              <input
                type="text"
                value={this.state.answer}
              />
            </Paper>
            {
              this.state.answers.map((answer) => (
                <RaisedButton
                  key={`button-${answer.a}`}
                  className="answer-button"
                  label={`${answer.a}`}
                  onClick={this.checkAnswer.bind(this, answer.a)}
                />
              ))
            }
            <RaisedButton
              className="learn"
              label="learn (space)"
            />
            <Stats deck={deck} currentIndex={this.state.currentIndex}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
