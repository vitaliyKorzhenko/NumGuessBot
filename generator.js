// sequenceGenerator.js
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generatePrimeNumbers(size) {
    const primes = [];
    let num = 2;
    while (primes.length < size * size) {
        if (isPrime(num)) primes.push(num);
        num++;
    }
    return primes;
}

function generateSquareNumbers(size) {
    return Array.from({ length: size * size }, (_, i) => (i + 1) ** 2);
}

function generateCubicNumbers(size) {
    return Array.from({ length: size * size }, (_, i) => (i + 1) ** 3);
}

function generateFibonacciNumbers(size) {
    const fib = [0, 1];
    while (fib.length < size * size) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib.slice(0, size * size);
}

function generateArithmeticProgression(size, start, difference) {
    return Array.from({ length: size * size }, (_, i) => start + i * difference);
}

function generateGeometricProgression(size, start, ratio) {
    return Array.from({ length: size * size }, (_, i) => start * ratio ** i);
}

function generateSequence(size) {
    const types = [
        { name: "primes", generator: generatePrimeNumbers },
        { name: "squares", generator: generateSquareNumbers },
        { name: "cubes", generator: generateCubicNumbers },
        { name: "fibonacci", generator: generateFibonacciNumbers },
        { name: "arithmetic", generator: generateArithmeticProgression, args: [1, 2] },
        { name: "geometric", generator: generateGeometricProgression, args: [1, 2] }
    ];

    const chosenType = types[Math.floor(Math.random() * types.length)];
    const numbers = chosenType.generator(size, ...(chosenType.args || []));
    let missingNumber;

    // Создаем квадрат
    const numberSequence = [];
    for (let i = 0; i < size; i++) {
        numberSequence[i] = [];
        for (let j = 0; j < size; j++) {
            numberSequence[i][j] = numbers[i * size + j];
        }
    }

    // Скрываем одно случайное число
    const missingRow = Math.floor(Math.random() * size);
    const missingCol = Math.floor(Math.random() * size);
    missingNumber = numberSequence[missingRow][missingCol];
    numberSequence[missingRow][missingCol] = '?'; // Заменяем на вопросительный знак

    return { numberSequence, missingNumber, type: chosenType.name };
}



module.exports = generateSequence;
