/* global
   $ (https://jquery.com/)
 , R (http://ramdajs.com/0.16/index.html)
 , Bacon (https://baconjs.github.io/)
*/

// Tic Tac Toe : The Functional Way
// Alex Wilmer, July 2015
// github.com/alex-wilmer

'use strict';

;(function () {
  // Module Scope

  /* Pure Functions */

  var sum = // (number, number) -> number
  function sum(a, b) {
    return a + b;
  };

  var reduceSum = // array -> number
  function reduceSum(list) {
    return list.reduce(sum);
  };

  var mapReduceSum = // [array] -> array
  R.map(reduceSum);

  var reverse = // array -> array
  function reverse(list) {
    return list.map(function (item, index) {
      return list[list.length - 1 - index];
    });
  };

  var transpose = // [array] -> [array]
  function transpose(matrix) {
    return matrix[0].map(function (cell, index) {
      return matrix.map(function (row) {
        return row[index];
      });
    });
  };

  var diagonal = // [array] -> array
  function diagonal(matrix) {
    return matrix.map(function (row, index) {
      return matrix[index][index];
    });
  };

  var sumVertical = // [array] -> array
  R.compose(mapReduceSum, transpose);

  var sumDiagonalLR = // [array] -> array
  R.compose(reduceSum, diagonal);

  var sumDiagonalRL = // [array] -> array
  R.compose(reduceSum, diagonal, reverse);

  var total = // [array] -> number
  R.compose(reduceSum, mapReduceSum);

  var changeListValue = // (array, integer, x) -> array
  function changeListValue(list, index, value) {
    return list.map(function (n, i) {
      if (index === i) return value;else return n;
    });
  };

  var switchPlayer = // boolean -> number
  function switchPlayer(x) {
    return x ? -1 : 1;
  };

  /* View State */

  $('cell').asEventStream('click').onValue((function () {
    var init = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    var states = [init];
    var gameOn = true;

    $('reset').click(function () {
      gameOn = true;
      states = [init];
      $('cell, message').html('');
    });

    return function (event) {
      // observe click stream
      if (gameOn) {
        (function () {
          var _event$target$dataset = event.target.dataset;
          var x = _event$target$dataset.x;
          var y = _event$target$dataset.y;
          // clicked cell

          if (!states[states.length - 1][+x][+y]) {

            states.push( // push modified state
            states[states.length - 1].map(function (row, index) {
              if (index === +x) {
                return changeListValue(row, +y, switchPlayer(total(states[states.length - 1])));
              } else return row;
            }));

            // draw X or O
            $('[data-x=\'' + x + '\'][data-y=\'' + y + '\']').html('<div class="center">\n              ' + (!total(states[states.length - 1]) ? 'O' : 'X') + '\n            </div>');

            if (states.length > 5) {
              // minimum number of moves to win
              var last = states[states.length - 1];

              if (Math.abs(sumDiagonalLR(last)) === 3 || Math.abs(sumDiagonalRL(last)) === 3 || mapReduceSum(last).some(function (n) {
                return Math.abs(n) === 3;
              }) || sumVertical(last).some(function (n) {
                return Math.abs(n) === 3;
              })) {
                $('message').html('<div>\n                  ' + (!total(last) ? 'O wins!' : 'X wins!') + '\n                </div>');
                gameOn = false;
              } else if (states.length === 10) {
                $('message').html('<div>Cat\'s game!</div>');
              }
            }
          }
        })();
      }
    };
  })());
})();