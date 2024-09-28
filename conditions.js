const conditions = [
  { condition: "greater than 50", example: 51 },
  { condition: "less than 30", example: 29 },
  { condition: "divisible by 3", example: 6 },
  { condition: "divisible by 5", example: 10 },
  { condition: "an even number", example: 4 },
  { condition: "an odd number", example: 7 },
  { condition: "a perfect square", example: 16 },
  { condition: "a prime number", example: 11 },
  { condition: "the sum of the digits is greater than 10", example: 29 },
  { condition: "the difference of the digits is less than 5", example: 34 }
];

// Функция для случайной генерации условий
const getRandomCondition = () => {
  const shuffled = conditions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2); // Берем два случайных условия
};

module.exports = { getRandomCondition };
