"use strict";

var TicTacToe = React.createClass({
  displayName: "TicTacToe",

  render: function render() {
    var board = this.props.board;
    return React.createElement(
      "div",
      { className: "board" },
      board.map(function (item, x) {
        return React.createElement(
          "div",
          { key: x, className: "row" },
          board.map(function (item, y) {
            return React.createElement("div", { key: y, className: "cell",
              "data-x": x, "data-y": y });
          })
        );
      })
    );
  }
});

var board = [0, 1, 2];

React.render(React.createElement(TicTacToe, { board: board }), document.getElementById("tic-tac-toe"));