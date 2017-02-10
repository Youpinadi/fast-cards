import React, { Component } from 'react'
import classNames from 'classnames'

import RaisedButton from 'material-ui/RaisedButton'

import DeckSelector from './DeckSelector.js'
import Stats from './Stats.js'
import Card from './Card.jsx';
import Paper from 'material-ui/Paper'
import Toggle from 'material-ui/Toggle'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { observer } from 'mobx-react';


import './App.css'

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.handleDeckSelected = this.handleDeckSelected.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyUp)
  }

  handleKeyUp(event) {
    let {
      answer,
      currentCard,
      randomAnswers
    } = this.props.appState

    event.preventDefault()
    const keyMap = {
      v: 0,
      b: 1,
      n: 2
    }
    if (event.key === ' ') {
      answer = currentCard.a;
      return
    }
    const index = keyMap[event.key]
    if (!isNaN(index)) {
      answer = randomAnswers[index].a
    }
  }

  handleDeckSelected(event, index, value) {
    this.props.appState.deckName = value;
  }

  render() {
    let {
      decks,
      deckName,
      currentCard,
      cardIndex,
      currentDeck,
      cardClassName,
      random,
      toggleRandom,
      randomAnswers,
      setAnswer,
      answer
    } = this.props.appState

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
              value={deckName}
              onDeckSelected={this.handleDeckSelected}
            />
            <Toggle
              className="toggle"
              label="Linear mode"
              value={random}
              onToggle={toggleRandom}
              defaultToggled={true}
            />
            <Card value={currentCard.q} />
            <Paper
              className={classNames('card', `card--${cardClassName}`)}
            >
              <input
                type="text"
                value={answer}
              />
            </Paper>
            {
              randomAnswers.map((answer) => (
                <RaisedButton
                  key={`button-${answer.a}`}
                  className="answer-button"
                  label={`${answer.a}`}
                  onClick={setAnswer.bind(this, answer.a)}
                />
              ))
            }
            <RaisedButton
              className="learn"
              label="learn (space)"
            />
            <Stats deck={currentDeck} currentIndex={cardIndex} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
