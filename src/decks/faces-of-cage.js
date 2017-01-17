import theRock from './images/cage/the-rock.jpg'
import raisingArizona from './images/cage/raising-arizona.png'
import seasonOfTheWitch from './images/cage/season-of-the-witch.jpg'
import snakeEyes from './images/cage/snake-eyes.png'
import benjaminGates from './images/cage/benjamin-gates.jpg'
import birdy from './images/cage/birdy.jpg'
import conAir from './images/cage/con-air.png'
import faceOff from './images/cage/face-off.jpg'
import ghostRider from './images/cage/ghost-rider.jpg'
import lordOfWar from './images/cage/lord-of-war.jpg'
import _8mm from './images/cage/8mm.jpg'
import adaptation from './images/cage/adaptation.jpg'
import badLieutenant from './images/cage/bad-lieutenant.jpg'
import bangkokDangerous from './images/cage/bangkok-dangerous.jpg'


const deck = {
    name: 'Faces of Cage',
    description: 'Guess the movie Nicolas Cage plays in',
    fuzzy: true,
    linear: false,
    cards: [
         {q: theRock, a: 'The Rock'},
         {q: raisingArizona, a: 'Raising Arizona'},
         {q: seasonOfTheWitch, a: 'Season of the Witch'},
         {q: snakeEyes, a: 'Snake Eyes'},
         {q: benjaminGates, a: 'Benjamin Gates'},
         {q: birdy, a: 'Birdy'},
         {q: conAir, a: 'Con Air'},
         {q: faceOff, a: 'Face/Off'},
         {q: ghostRider, a: 'Ghost Rider'},
         {q: lordOfWar, a: 'Lord of War'},
         {q: _8mm, a: '8mm'},
         {q: adaptation, a: 'Adaptation'},
         {q: badLieutenant, a: 'Bad Lieutenant'},
         {q: bangkokDangerous, a: 'Bangkgok Dangerous'},
    ]
}

export default deck
