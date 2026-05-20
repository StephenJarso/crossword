const { 
    crosswordSolver, 
    parseAndValidatePuzzle, 
    detectWordPaths, 
    canPlaceWord, 
    runBacktrackingSolver 
} = require('./crosswordSolver');

describe('Crossword Solver Unit & Integration Tests', () => {
    let logSpy;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    // Validation Function Tests
    describe('parseAndValidatePuzzle()', () => {
        test('should return null if emptyPuzzle is not a string', () => {
            expect(parseAndValidatePuzzle(12345, ['word'])).toBeNull();
        });

        test('should return null if words parameter is not an array', () => {
            expect(parseAndValidatePuzzle('00', 'not-an-array')).toBeNull();
        });

        test('should return null if there are duplicate words', () => {
            expect(parseAndValidatePuzzle('00', ['test', 'test'])).toBeNull();
        });

        test('should return null if grid contains invalid characters', () => {
            expect(parseAndValidatePuzzle('0A\n00', ['a', 'b'])).toBeNull();
        });

        test('should parse correctly if formatting and slots match perfectly', () => {
            const puzzle = `10\n00`;
            const result = parseAndValidatePuzzle(puzzle, ['aa']);
            expect(result).not.toBeNull();
            expect(result.height).toBe(2);
            expect(result.width).toBe(2);
        });
    });

    // Path  Detection Tests 
    describe('detectWordPaths()', () => {
        test('should accurately identify horizontal and vertical slots', () => {
            const grid = [
                ['2', '0'],
                ['0', '.']
            ];
            const paths = detectWordPaths(grid, 2, 2);
            
            expect(paths).toHaveLength(2);
            expect(paths).toContainEqual({ r: 0, c: 0, len: 2, dir: 'H' });
            expect(paths).toContainEqual({ r: 0, c: 0, len: 2, dir: 'V' });
        });
    });

    // Word Placement Constraint Tests
    describe('canPlaceWord()', () => {
        test('should return false if word length does not match path length', () => {
            const grid = [['0', '0', '0']];
            const path = { r: 0, c: 0, len: 3, dir: 'H' };
            expect(canPlaceWord(grid, path, 'go')).toBe(false); // Length 2 instead of 3
        });

        test('should return false if word clashes with letters already on grid', () => {
            const grid = [['c', 'a', 't']];
            const path = { r: 0, c: 0, len: 3, dir: 'H' };
            expect(canPlaceWord(grid, path, 'car')).toBe(false); // 'r' conflicts with 't'
        });

        test('should return true if space is clear or letters match exactly', () => {
            const grid = [['c', '0', '0']];
            const path = { r: 0, c: 0, len: 3, dir: 'H' };
            expect(canPlaceWord(grid, path, 'cat')).toBe(true);
        });
    });

    // Solver Logic Tests 
    describe('runBacktrackingSolver()', () => {
        test('should find all valid matching solutions', () => {
            const grid = [
                ['2', '0'],
                ['0', '.']
            ];
            const paths = [
                { r: 0, c: 0, len: 2, dir: 'H' },
                { r: 0, c: 0, len: 2, dir: 'V' }
            ];
            const words = ['aa', 'ab'];
            
            const solutions = runBacktrackingSolver(grid, paths, words);
            
            // Fix: Change expected length from 1 to 2
            expect(solutions).toHaveLength(2);
            expect(solutions).toContain('aa\nb.');
            expect(solutions).toContain('ab\na.');
        });
    });

    //  Main Controller Tests
    describe('crosswordSolver() Integration', () => {
        test('should print the unique puzzle solution correctly', () => {
            const emptyPuzzle = `2001\n0..0\n1000\n0..0`;
            const words = ["casa", "alan", "ciao", "anta"];
            const expectedOutput = `casa\ni..l\nanta\no..n`;

            crosswordSolver(emptyPuzzle, words);
            expect(logSpy).toHaveBeenCalledWith(expectedOutput);
        });

        test('should print Error if multiple solutions exist', () => {
            const emptyPuzzle = `20\n00`;
            const words = ["aa", "bb"]; 
            
            crosswordSolver(emptyPuzzle, words);
            expect(logSpy).toHaveBeenCalledWith('Error');
        });

        test('should print Error if no valid word layout is found', () => {
            const emptyPuzzle = `2001\n0..0\n1000\n0..0`;
            const words = ["zyxx", "wvvv", "uttt", "ssss"]; 
            
            crosswordSolver(emptyPuzzle, words);
            expect(logSpy).toHaveBeenCalledWith('Error');
        });
    });
});
