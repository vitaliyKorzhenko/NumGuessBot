const TelegramBot = require('node-telegram-bot-api');
const generateSequence = require('./generator'); // Импортируем генератор
const messages = require('./messages'); // Импортируем сообщения
const { createMenu } = require('./menu');

const token = '7868921778:AAF1-y9rzXlAZ_8IvHiutsYo_Yy8OBWTeDg'; // Ваш токен
const bot = new TelegramBot(token, { polling: true });

let missingNumber; // Переменная для хранения пропущенного числа
let numberSequence; // Массив для хранения последовательности
let gridSize; // Размер сетки, теперь будет случайным
let currentHints = []; // Подсказки для текущего задания
let language = 'en'; // Язык по умолчанию



bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправка сообщения для выбора языка с HTML-форматированием
  bot.sendMessage(chatId, "<b>Welcome! Please choose your language:</b>", {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🇺🇦 Українська', callback_data: 'uk' }],
        [{ text: '🇬🇧 English', callback_data: 'en' }]
      ]
    },
    parse_mode: 'HTML' // Указываем, что мы используем HTML
  });
});

// Хранение выбранного языка для каждого чата
const chatLanguages = {};

bot.on('callback_query', (query) => {

  const chatId = query.message.chat.id;
  const language = query.data;

  // Сохраняем выбранный язык для данного чата
  chatLanguages[chatId] = language;

  // Сообщение о выбранном языке
  const languageMessage = language === 'en' 
    ? "<b>You have selected English.</b>" 
    : "<b>Ви обрали Українську.</b>";

  // Отправка сообщения о выбранном языке
  bot.sendMessage(chatId, languageMessage, { parse_mode: 'HTML' });

  // Создание и отправка меню в зависимости от выбранного языка
  
  const menu = createMenu(language);
  bot.sendMessage(chatId, "<b>Please choose an option:</b>", {
    reply_markup: menu,
    parse_mode: 'HTML' // Указываем, что мы используем HTML
  });
});

const sendSquare = (chatId, square) => {
  const formattedSquare = square.map(row => 
      row.map(cell => cell === '?' ? '<b>❓</b>' : `<b>${cell}</b>`).join('   ')
  ).join('<br>');

  bot.sendMessage(chatId, formattedSquare, { parse_mode: 'HTML' });
};


// Функция для отправки меню выбора языка
function sendLanguageMenu(chatId) {
    const options = {
        reply_markup: {
            keyboard: [
                [{ text: 'English' }, { text: 'Українська' }],
                [{ text: 'Play' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    bot.sendMessage(chatId, messages[language].chooseLanguage, options);
}

// Обработка выбора языка
bot.on('message', (msg) => {
    const userText = msg.text;

    if (userText === 'English') {
        language = 'en';
        bot.sendMessage(msg.chat.id, messages[language].welcome);
        return sendLanguageMenu(msg.chat.id);
    } else if (userText === 'Українська') {
        language = 'uk';
        bot.sendMessage(msg.chat.id, messages[language].welcome);
        return sendLanguageMenu(msg.chat.id);
    } else if (userText === 'Play' || userText === '/play') {
        startGame(msg.chat.id);
        return;
    }

    const userGuess = parseInt(userText, 10);
    if (!isNaN(userGuess)) {
        checkGuess(msg.chat.id, userGuess);
    }
});

// Функция для начала игры
function startGame(chatId) {
    gridSize = getRandomGridSize(); // Случайный размер сетки
    const sequence = generateSequence(gridSize);
    numberSequence = sequence.numberSequence;
    missingNumber = sequence.missingNumber;
    currentHints = generateHints(missingNumber); // Генерация подсказок

    const sequenceMessage = `Guess the missing number in the following ${sequence.type} sequence:\n` + 
                            numberSequence.map(row => row.join(' ')).join('\n') +
                            `\nType /hint to see a hint or /solution to see the solution.`;
    sendSquare(chatId, square);

    bot.sendMessage(chatId, sequenceMessage);
}

// Генерация случайного размера сетки
function getRandomGridSize() {
    return Math.floor(Math.random() * 3) + 2; // Возвращает 2, 3 или 4
}

// Проверка предположения
function checkGuess(chatId, userGuess) {
    if (userGuess === missingNumber) {
        bot.sendMessage(chatId, messages[language].congratulations.replace('{number}', missingNumber));
    } else {
        bot.sendMessage(chatId, messages[language].tryAgain);
    }
}

// Команда /hint
bot.onText(/\/hint/, (msg) => {
    if (currentHints.length > 0) {
        const hint = currentHints.pop(); // Берем последнюю подсказку
        bot.sendMessage(msg.chat.id, messages[language].hint.replace('{hint}', hint));
    } else {
        bot.sendMessage(msg.chat.id, messages[language].noMoreHints);
    }
});

// Команда /solution
bot.onText(/\/solution/, (msg) => {
    bot.sendMessage(msg.chat.id, messages[language].solution.replace('{number}', missingNumber));
});

// Функция для генерации подсказок
function generateHints(missingNumber) {
    const hints = {
        en: [
            `The missing number is ${missingNumber % 2 === 0 ? 'even' : 'odd'}.`,
            `The missing number is ${missingNumber > 0 ? 'positive' : 'negative'}.`,
            `The sum of the digits of the missing number is ${missingNumber.toString().split('').reduce((a, b) => +a + +b, 0)}.`,
            `The missing number is ${missingNumber}. Try to find a pattern!`
        ],
        uk: [
            `Відсутнє число ${missingNumber % 2 === 0 ? 'парне' : 'непарне'}.`,
            `Відсутнє число ${missingNumber > 0 ? 'позитивне' : 'негативне'}.`,
            `Сума цифр відсутнього числа становить ${missingNumber.toString().split('').reduce((a, b) => +a + +b, 0)}.`,
            `Відсутнє число ${missingNumber}. Спробуйте знайти закономірність!`
        ]
    };
    
    return hints[language]; // Возвращаем подсказки в зависимости от языка
}
