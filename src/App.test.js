import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import FastCardStore from './store.js';

const fcs = new FastCardStore()

it('first deck name is Faces of Cage', () => {
  fcs.deckName = 'Faces of Cage';
  expect(fcs.currentDeck.name).toEqual('Faces of Cage')
  expect(fcs.currentCard.a).toEqual('The Rock')
})


it('set deck works', () => {
  fcs.deckName = 'Hiragana alphabet';
  expect(fcs.currentDeck.name).toEqual('Hiragana alphabet')
  expect(fcs.currentCard.a).toEqual('a')
  expect(fcs.currentDeck.cards.length).toEqual(46)
})

it('toggling linear should work', () => {
  fcs.toggleRandom()
  expect(fcs.random).toEqual(true)
  fcs.toggleRandom()
  expect(fcs.random).toEqual(false)
})

it('should increment the nextCard in bounds', () => {
  fcs.nextCard()
  expect(fcs.cardIndex).toEqual(1)
})
it('should go to the first card if at the end of the deck', () => {
  fcs.cardIndex = fcs.currentDeck.cards.length - 1
  fcs.nextCard()
  expect(fcs.cardIndex).toEqual(0)
})

it('there should be 3 random answers', () => {
  expect(fcs.randomAnswers.length).toEqual(3)
  expect(fcs.randomAnswers.filter((card) => card.a === fcs.currentCard.a).length).toEqual(1)
})

it('valid answer is The Rock', () => {
  fcs.deckName = 'Faces of Cage';
  fcs.setAnswer('toto')
  expect(fcs.isValidAnswer).toEqual(false)
  fcs.setAnswer('The Rock')
  expect(fcs.isValidAnswer).toEqual(true)
})