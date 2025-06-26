fetch('terms.json')
  .then(res => res.json())
  .then(terms => {
    const grouped = {};
    terms.forEach(term => {
      if (!grouped[term.initial]) grouped[term.initial] = [];
      grouped[term.initial].push(term);
    });

    // インデックス
    const nav = document.getElementById('nav-index');
    const indexSection = document.getElementById('term-index');
    const container = document.getElementById('term-container');

    Object.keys(grouped).forEach(initial => {
      const safeId = 'index-' + initial.replace(/[^a-zA-Z0-9]/g, '');
      nav.innerHTML += `<a href="#${safeId}">${initial}</a>`;

      indexSection.innerHTML += `<div id="${safeId}">${initial}:</div>`;
      grouped[initial].forEach(term => {
        indexSection.innerHTML += `<a href="#${term.id}">${term.title}</a> `;
      });

      container.innerHTML += `
        <div class="term-group" id="group-${safeId}">
          <h2>${initial}</h2>
          ${grouped[initial].map(term => `
            <div class="term" id="${term.id}">
              <div class="term-title">${term.title}</div>
              <div class="term-reading">（${term.reading}）</div>
              <div class="term-definition"><strong>意味：</strong>${term.definition}</div>
              <div class="term-context"><strong>自治体においては：</strong>${term.context}</div>
            </div>
          `).join('')}
        </div>
      `;
    });
  });
