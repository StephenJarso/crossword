# Crossword Solver

## Overview

Crossword Solver is a JavaScript-based puzzle solving engine that automatically fills crossword templates using a given list of words.

The project uses a recursive backtracking algorithm to explore valid word placements while enforcing crossword constraints such as:

- Correct word lengths
- Valid letter intersections
- Unique puzzle solution detection
- Invalid puzzle handling

If the puzzle:

- Has no valid solution
- Has multiple valid solutions
- Contains invalid formatting

the solver prints:

```text
Error
```

## Features

- Parses crossword puzzle grids
- Detects horizontal and vertical word paths
- Validates puzzle structure and inputs
- Solves puzzles using recursive backtracking
- Detects ambiguous solutions
- Detects impossible puzzles
- Includes unit tests

## Project Structure

```text
crossword-solver/
│
├── crosswordSolver.js
├── crosswordSolver-test.js
├── package.json
└── README.md
```

## How the Solver Works

The program follows the following steps:

```text
Input Puzzle
      ↓
Parse and Validate Puzzle
      ↓
Detect Word Paths
      ↓
Try Word Placements
      ↓
Recursively Solve Puzzle
      ↓
Backtrack Invalid Placements
      ↓
Check Solution Count
      ↓
Print Solved Puzzle OR "Error"
```

## Puzzle Format

The crossword puzzle is represented as a multiline string.

Each character in the puzzle represents:


| Character | Meaning |
| :--- | :--- |
| `.` | Blocked/empty cell |
| `0` | Empty fillable cell |
| `1` | Starting point of one word |
| `2` | Starting point of two words |

### Example Puzzle

```javascript
const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];
```

### Expected Output

```text
casa
i..l
anta
o..n
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crossword-solver.git
   ```
2. Navigate into the project directory:
   ```bash
   cd crossword-solver
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the solver script directly:
```bash
node crosswordSolver.js
```

### Example Usage

```javascript
const { crosswordSolver } = require('./crosswordSolver');

const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];

crosswordSolver(emptyPuzzle, words);
```

## Core Functions

### `parseAndValidatePuzzle()`
Responsible for:
- Validating puzzle formatting
- Checking valid characters
- Verifying rectangular grid structure
- Preventing duplicate words
- Counting total required slots

### `detectWordPaths()`
Responsible for:
- Detecting horizontal paths
- Detecting vertical paths
- Storing path metadata

Example path object:
```javascript
{
    r: 0,
    c: 0,
    len: 4,
    dir: 'H'
}
```

### `canPlaceWord()`
Responsible for:
- Validating word length
- Checking letter intersections
- Preventing conflicting placements

### `runBacktrackingSolver()`
Responsible for:
- Recursive solving
- Trying word placements
- Backtracking invalid paths
- Detecting multiple solutions

## Backtracking Algorithm

The solver uses recursion and backtracking to navigate potential answers.

### Algorithm Steps
1. Select a word path
2. Try each unused word
3. Check if placement is valid
4. Place the word
5. Recursively solve the next path
6. Backtrack if placement fails
7. Continue until solution is found

## Error Handling

The solver prints `Error` when:
- The puzzle format is invalid
- Duplicate words exist in the input array
- No valid solution exists
- Multiple solutions exist
- Word count does not match puzzle requirements

### Example Invalid Cases

#### Invalid Grid
```text
200
0..
1000
```

#### Duplicate Words
```javascript
["casa", "casa"]
```

#### Impossible Puzzle
```text
Error
```

#### Multiple Valid Solutions
```text
Error
```

## Testing

The project includes automated tests for:
- Puzzle validation
- Path detection
- Word placement
- Recursive solving
- Edge cases

### Run Tests
```bash
npm test
```

### Example Test Cases

#### Valid Puzzle
```javascript
const words = ["casa", "alan", "ciao", "anta"];
```

#### Duplicate Words
```javascript
const words = ["casa", "casa"];
```

#### Invalid Characters
```text
20a1
0..0
```

## Complexity Analysis

### Time Complexity
Worst-case complexity: **$O(W!)$** where $W$ is the number of words. This occurs because the solver may explore multiple word permutations recursively.

### Space Complexity
Space complexity: **$O(W \times P)$** where $W$ is the number of words and $P$ is

## Technologies Used
- JavaScript
- Node.js
- Recursive Backtracking
