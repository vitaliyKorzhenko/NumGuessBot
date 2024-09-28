const createMenu = (language) => {
    const menus = {
      en: {
        inline_keyboard: [
          [
            { text: '🇺🇦 Switch to Ukrainian', callback_data: 'uk' },
            { text: '📝 Feedback', callback_data: 'feedback' }
          ],
          [
            { text: '🎮 Play', callback_data: 'play' }
          ]
        ]
      },
      uk: {
        inline_keyboard: [
          [
            { text: '🇬🇧 Перейти на англійську', callback_data: 'en' },
            { text: '📝 Фідбек', callback_data: 'feedback' }
          ],
          [
            { text: '🎮 Грати', callback_data: 'play' }
          ]
        ]
      }
    };
  
    return menus[language];
  };
  
  module.exports = { createMenu };
  