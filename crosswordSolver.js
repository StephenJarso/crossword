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
//implement recursive solver with backtracking
    const solutions = [];
    const usedWords = new Array(words.length).fill(false);

    function solve(pathIdx) {
        if (pathIdx === paths.length) {
            solutions.push(grid.map(row => row.join('')).join('\n'));
            return;
        }

        const { r, c, len, dir } = paths[pathIdx];
        for (let i = 0; i < words.length; i++) {
            if (usedWords[i] || words[i].length !== len) continue;

            const word = words[i];
            const originalChars = [];
            let canPlace = true;

            // Check if word fits with letters already on the board
            for (let j = 0; j < len; j++) {
                const currR = dir === 'H' ? r : r + j;
                const currC = dir === 'H' ? c + j : c;
                if (/[a-z]/.test(grid[currR][currC]) && grid[currR][currC] !== word[j]) {
                    canPlace = false;
                    break;
                }
                originalChars.push(grid[currR][currC]);
            }

            if (canPlace) {
                for (let j = 0; j < len; j++) {
                    grid[dir === 'H' ? r : r + j][dir === 'H' ? c + j : c] = word[j];
                }
                usedWords[i] = true;
                solve(pathIdx + 1);
                
                // Backtrack
                usedWords[i] = false;
                for (let j = 0; j < len; j++) {
                    grid[dir === 'H' ? r : r + j][dir === 'H' ? c + j : c] = originalChars[j];
                }
                if (solutions.length > 1) return; 
            }
        }
    }
