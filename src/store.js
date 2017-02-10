import decks from './decks/all-decks'
import { findDeck } from './lib/decks.js'
import {observable, computed, action } from 'mobx';
import sampleSize from 'lodash.samplesize'

export class FastCardStore {
  @observable decks = decks
  @observable cardIndex = 0
  @observable deckName = 'Faces of Cage'
  @observable linear = true
  @observable random = false
  @observable answer = ''

  @computed get isValidAnswer() {
    return this.answer === this.currentCard.a
  }

  @computed get cardClassName() {
    if (!this.answer || this.answer === '') {
        return  'normal'
    } else if (this.answer === this.currentCard.a) {
        return 'ok'
    } else {
        return 'ko'
    }
  }


  @computed get currentDeck() {
    return findDeck(this.deckName, this.decks)
  }

  @computed get currentCard() {
    return this.currentDeck.cards[this.cardIndex]
  }

  @computed get randomAnswers() {
    const numberAnswers = 3
    const filteredCards = this.currentDeck.cards
                            .filter((card) => card.a !== this.currentCard.a)
    let res = sampleSize(filteredCards, numberAnswers)
    res[Math.floor(Math.random() * numberAnswers)] = this.currentCard
    return res;
  }

  @action.bound
  setAnswer(answer) {
    this.answer = answer
    if (this.isValidAnswer) {
        setTimeout(this.nextCard, 500)        
    }
  }

  @action.bound
  toggleRandom() {
    this.random = !this.random
  }

  @action.bound
  nextCard() {
    this.cardIndex = this.cardIndex + 1 < this.currentDeck.cards.length
      ? this.cardIndex + 1
      : 0
    this.answer = ''
  }
}

export default FastCardStore;