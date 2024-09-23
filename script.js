'use strict';

async function fetchRSS() {
  const response = await fetch('https://tass.ru/rss/v2.xml');
  console.log(response);

}
// Вызов функции для загрузки новостей
fetchRSS();

