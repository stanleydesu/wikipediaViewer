"use strict";

let search = document.getElementById('search'),
	results = document.getElementById('results');

search.addEventListener('keyup', function(e) {
	if (e.which === 13 && e.target.value) {
		getQuery(e.target.value);
	}
});

function getQuery(query) {
	let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=5&search=' + encodeURIComponent(query) + '&callback=?';
	$.getJSON(url, function(data) {
	  loadData(data);
	});
}

function loadData(data) {
	let titles = data[1],
		summaries = data[2],
		links = data[3];

	for (let i = 0, len = titles.length; i < len; ++i) {
		let a = document.createElement('a');
		a.setAttribute('href', links[i]);
		a.textContent = titles[i] + summaries[i];
		results.appendChild(a);
	}
}