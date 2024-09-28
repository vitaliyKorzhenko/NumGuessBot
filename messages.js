// messages.js
const messages = {
    en: {
        welcome: "Welcome to 'Guess the Missing Number'! Type /play to start.",
        gridSizeSet: "Grid size has been randomly selected. Type /play to start a new game.",
        hint: "Hint: {hint}",
        solution: "The missing number was {number}. Type /play to play again.",
        tryAgain: "Try again!",
        congratulations: "Congratulations! The missing number was {number}. Type /play to play again.",
        chooseLanguage: "Choose your language:",
        noMoreHints: "No more hints available!"
    },
    uk: {
        welcome: "Ласкаво просимо до 'Вгадайте відсутнє число'! Напишіть /play, щоб почати.",
        gridSizeSet: "Розмір сітки було вибрано випадково. Напишіть /play, щоб почати нову гру.",
        hint: "Підказка: {hint}",
        solution: "Відсутнє число було {number}. Напишіть /play, щоб зіграти ще раз.",
        tryAgain: "Спробуйте ще раз!",
        congratulations: "Вітаємо! Відсутнє число було {number}. Напишіть /play, щоб зіграти ще раз.",
        chooseLanguage: "Виберіть свою мову:",
        noMoreHints: "Більше підказок немає!"
    }
};

module.exports = messages; // Экспортируем сообщения
