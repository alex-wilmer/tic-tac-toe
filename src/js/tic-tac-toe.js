/* global
   $ (https://jquery.com/)
 , R (http://ramdajs.com/0.16/index.html)
 , Bacon (https://baconjs.github.io/)
*/

// Tic Tac Toe : The Functional Way
// Alex Wilmer, July 2015
// github.com/alex-wilmer

;(() => { // Module Scope

  /* Pure Functions */

  const mapSum = // [array] -> array
    R.map(R.sum)

  const transpose = // [array] -> [array]
    matrix => matrix[0].map((cell, index) => matrix.map(row => row[index]))

  const diagonal = // [array] -> array
    matrix => matrix.map((row, index) => matrix[index][index])

  const sumVertical = // [array] -> array
    R.compose(mapSum, transpose)

  const sumDiagonalLR = // [array] -> array
    R.compose(R.sum, diagonal)

  const sumDiagonalRL = // [array] -> array
    R.compose(R.sum, diagonal, R.reverse)

  const total = // [array] -> number
    R.compose(R.sum, mapSum)

  const changeListValue =  // (array, integer, x) -> array
    (list, index, value) => {
      return list.map((n, i) => {
        if (index === i) return value
        else return n
      })
    }

  const switchPlayer = // boolean -> number
    x => x ? -1 : 1

  /* View State */

  $(`cell`).asEventStream(`click`).onValue((() => {
    const init = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]
    let states = [ init ]
    let gameOn = true

    $(`reset`).click(() => {
      gameOn = true
      states = [ init ]
      $(`cell, message`).html(``)
    })

    return event => { // observe click stream
      if (gameOn) {
        const {x, y} = event.target.dataset // clicked cell

        if (!states[states.length - 1][+x][+y]) {

          states.push( // push modified state
            states[states.length - 1].map((row, index) => {
              if (index === +x) {
                return changeListValue(
                  row, +y, switchPlayer(total(states[states.length - 1]))
                )
              }
              else return row
            })
          )

          // draw X or O
          $(`[data-x='${x}'][data-y='${y}']`).html(
           `<div class="center">
              ${!total(states[states.length - 1]) ? `O` : `X`}
            </div>`
          )

          if (states.length > 5) { // minimum number of moves to win
            const last = states[states.length - 1]

            if (Math.abs(sumDiagonalLR(last)) === 3
             || Math.abs(sumDiagonalRL(last)) === 3
             || mapSum(last).some(n => Math.abs(n) === 3)
             || sumVertical(last).some(n => Math.abs(n) === 3)) {
              $(`message`).html(
               `<div>
                  ${!total(last) ? `O wins!` : `X wins!`}
                </div>`
              )
              gameOn = false
            }

            else if (states.length === 10) {
              $(`message`).html(
               `<div>Cat's game!</div>`
              )
            }
          }
        }
      }
    }
  }()))
}())
