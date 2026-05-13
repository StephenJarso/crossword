// crosswordSolver.js - Part 1
function crosswordSolver(emptyPuzzle, words) {
    if (typeof emptyPuzzle !== 'string' || !Array.isArray(words)) {
        console.log('Error');
        return;
    }

    const lines = emptyPuzzle.split('\n');
    const height = lines.length;
    const width = lines[0].length;

    if (!lines.every(line => line.length === width && /^[012.]+$/.test(line))) {
        console.log('Error');
        return;
    }

    if (new Set(words).size !== words.length) {
        console.log('Error');
        return;
    }

    const grid = lines.map(line => line.split(''));
    
    let totalSlots = 0;
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (grid[r][c] !== '.') totalSlots += parseInt(grid[r][c]);
        }
    }

    if (totalSlots !== words.length) {
        console.log('Error');
        return;
    }
    //logic for path detection
    const paths = [];
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (grid[r][c] === '.') continue;

            if (c === 0 || grid[r][c - 1] === '.') {
                let len = 0;
                while (c + len < width && grid[r][c + len] !== '.') len++;
                if (len >= 2) paths.push({ r, c, len, dir: 'H' });
            }

            if (r === 0 || grid[r - 1][c] === '.') {
                let len = 0;
                while (r + len < height && grid[r + len][c] !== '.') len++;
                if (len >= 2) paths.push({ r, c, len, dir: 'V' });
            }
        }
    }

}
