# Terminal-Color-Puzzle-Game
A logic-based color puzzle game built using JavaScript that runs in the VS Code terminal with Node.js. The objective of the game is to sort colors into their respective tubes, ensuring that each tube contains only pure layers of the same color.


🎮 How to Play:

The game presents multiple tubes, each containing layered colors.

Your goal is to rearrange the colors by moving them between tubes, ensuring each tube contains only one color.

Players can move a color from one tube to another, but only if the top layer of the receiving tube is either empty or matches the color being moved.

The game is complete when all tubes have only one pure color.


🛠 Features:

Command-Line Interface (CLI): Runs directly in the terminal using Node.js.

Dynamic Puzzle Generation: The game generates new challenges with randomized color arrangements.

Color Logic: Prevents invalid moves where colors don’t match.

Undo Option: Allows players to undo their last move.

Node.js Powered: Pure JavaScript implementation without dependencies, working seamlessly with the VS Code terminal.
