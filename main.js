'use strict';

async function fetchRSS() {
  try {
    const response = await fetch('https://lenta.ru/rss');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');

    // Проверка на ошибки парсинга XML
    const xmlError = xml.querySelector('parsererror');
    if (xmlError) {
      throw new Error('Error parsing XML');
    }

    const items = xml.querySelectorAll('item');
    let output = '';

    items.forEach(item => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      const description = item.querySelector('description').textContent;

      output += `
      <div class="news-item">
        <h3><a href="${link}" target="_blank">${title}</a></h3>
        <p>${description}</p>
      </div>
      `;
    });

    document.querySelector('#news-container').innerHTML = output;

  } catch (error) {
    console.error('Fetch RSS error:', error);
  }
}

fetchRSS();


