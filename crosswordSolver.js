// crosswordSolver.js - Part 1
// function crosswordSolver(emptyPuzzle, words) {
function parseAndValidatePuzzle(emptyPuzzle, words) {
    if (typeof emptyPuzzle !== 'string' || !Array.isArray(words)) return null;
    if (new Set(words).size !== words.length) return null;

    const lines = emptyPuzzle.split('\n');
    const height = lines.length;
    const width = lines[0] ? lines[0].length : 0;

    if (width === 0 || !lines.every(line => line.length === width && /^[012.]+$/.test(line))) {
        return null;
    }

    const grid = lines.map(line => line.split(''));
    
    let totalSlots = 0;
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (grid[r][c] !== '.') totalSlots += parseInt(grid[r][c]);
        }
    }
}
    
    //logic for path detection
   function detectWordPaths(grid, height, width) {
    const paths = [];
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (grid[r][c] === '.') continue;

            // Horizontal Path Detection
            if (c === 0 || grid[r][c - 1] === '.') {
                let len = 0;
                while (c + len < width && grid[r][c + len] !== '.') len++;
                if (len >= 2) paths.push({ r, c, len, dir: 'H' });
            }

            // Vertical Path Detection
            if (r === 0 || grid[r - 1][c] === '.') {
                let len = 0;
                while (r + len < height && grid[r + len][c] !== '.') len++;
                if (len >= 2) paths.push({ r, c, len, dir: 'V' });
            }
        }
    }
    return paths;
}
function canPlaceWord(grid, path, word) {
    if (word.length !== path.len) return false;

    for (let j = 0; j < path.len; j++) {
        const currR = path.dir === 'H' ? path.r : path.r + j;
        const currC = path.dir === 'H' ? path.c + j : path.c;
        const currentCell = grid[currR][currC];

        // If the cell already contains a letter, it must match the word's letter
        if (/[a-z]/.test(currentCell) && currentCell !== word[j]) {
            return false;
        }
    }
    return true;
}

function runBacktrackingSolver(grid, paths, words) {
    const solutions = [];
    const usedWords = new Array(words.length).fill(false);

    function solve(pathIdx) {
        if (pathIdx === paths.length) {
            solutions.push(grid.map(row => row.join('')).join('\n'));
            return;
        }

        const path = paths[pathIdx];
        for (let i = 0; i < words.length; i++) {
            if (usedWords[i]) continue;

            const word = words[i];
            if (!canPlaceWord(grid, path, word)) continue;

            // Save state for backtracking
            const originalChars = [];
            for (let j = 0; j < path.len; j++) {
                const currR = path.dir === 'H' ? path.r : path.r + j;
                const currC = path.dir === 'H' ? path.c + j : path.c;
                originalChars.push(grid[currR][currC]);
                grid[currR][currC] = word[j]; // Place letter
            }

            usedWords[i] = true;
            solve(pathIdx + 1);
            if (solutions.length > 1) return; // Optimization: Abort early if not unique

            // Backtrack state
            usedWords[i] = false;
            for (let j = 0; j < path.len; j++) {
                const currR = path.dir === 'H' ? path.r : path.r + j;
                const currC = path.dir === 'H' ? path.c + j : path.c;
                grid[currR][currC] = originalChars[j];
            }
        }
    }

    solve(0);
    return solutions;
}
function crosswordSolver(emptyPuzzle, words) {
    const parsedData = parseAndValidatePuzzle(emptyPuzzle, words);
    if (!parsedData) {
        console.log('Error');
        return;
    }

    const { grid, height, width } = parsedData;
    const paths = detectWordPaths(grid, height, width);

    const solutions = runBacktrackingSolver(grid, paths, words);

    if (solutions.length !== 1) {
        console.log('Error');
    } else {
        console.log(solutions[0]);
    }
}