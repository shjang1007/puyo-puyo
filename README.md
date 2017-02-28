## JS Project Proposal: Puyo-Puyo

### Background

Puyo-Puyo is a Tetris-like puzzle video game. The game is played similar to the Tetris in that the player has to clear the falling blocks. The game follow these rules:

1) If you combined 4 or more of the same color of the pieces, it will pop and clear,
2) With each stage, the speed of objects dropping will be faster,
3) The goal is to get the highest score.

### Functionality & MVP  

With Puyo-Puyo, users will be able to:

- [ ] Start or pause the game board
- [ ] Select where to place the dropping pieces
- [ ] Toggle pieces to either fall down vertically or horizontally
- [ ] Choose to drop down pieces straight down without having to wait for it to fall down

In addition, this project will include:

- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game directions, game controls, and nav links to the Github, and my LinkedIn. On the left will be game instructions along with the game control which will be two buttons, one for starting the game and the other for pausing the game. (These two buttons will also have hotkeys assigned to it). On the left side will be where nav links will be located.

<!-- ![wireframes](https://github.com/appacademy/ny-portfolio-curriculum/blob/master/javascript-project/js-proposal-wireframe.jpg) -->

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be two scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`piece.js`: this script will handle the logic for the pieces. A piece will be 2 X 1 2d array. Each will be able to toggle to position either vertically or horizontally. Each piece will have random colors from set colors.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of two scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Piece` object to connect to the `Board` object.  Then, use `board.js` to create and render the board grid.

**Day 3**: Create the game logic for moving the pieces, toggling the pieces, and determining the speed and color of the pieces.

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, shape color
- Have a styled `Canvas`, nice looking controls and title


### Bonus features

- [ ] Add rock pieces that will only disappear if neighboring pieces pop to make the game more difficult
- [ ] Create AI player to vs against.
- [ ] Make it multiplayer game to vs against each other.
