import moment from '../../scripts/moment.js';

const sortByDate = (a, b) => (moment(a.date, 'DD.MM.YYYY').isBefore(moment(b.date, 'DD.MM.YYYY')) ? 1 : -1);

export default async function decorate(block) {
  const indexResponse = await fetch('/query-index.json');

  if (!indexResponse.ok) {
    return;
  }

  const index = await indexResponse.json();

  const container = document.createElement('ul');

  const heading = document.createElement('h2');
  heading.innerText = 'Articles';
  heading.classList.add('articles-list-heading');
  block.append(heading);

  let currentYear = null;
  index.data
    .sort(sortByDate)
    .forEach((post) => {
      const li = document.createElement('li');

      const postYear = moment(post.date, 'DD.MM.YYYY').year();
      const shouldShowYear = currentYear !== postYear;
      currentYear = postYear;

      li.innerHTML = `
      <a href="${post.path}">
          <h2>${post.title}</h2>
      </a>
      ${shouldShowYear ? `<span class="year-mark">${postYear}</span>` : ''}
    `;
      container.append(li);
    });

  block.append(container);
}
