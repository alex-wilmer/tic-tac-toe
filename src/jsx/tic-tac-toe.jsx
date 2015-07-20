const TicTacToe = React.createClass({
  render() {
    const board = this.props.board
    return (
      <div className="board">
        { board.map((item, x) => {
            return (
              <div key={ x } className="row">
                { board.map((item, y) => {
                    return (
                      <div key={ y } className="cell"
                      data-x={ x } data-y={ y }></div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
})

const board = [0, 1, 2]

React.render(
  <TicTacToe board={ board }/>, document.getElementById('tic-tac-toe')
)
