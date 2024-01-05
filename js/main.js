// Gets elements from DOM
const elFilmsList = document.querySelector('.films__list');
const elFilmsListForm = document.querySelector('.form');
const elFilmTemplate = document.querySelector('#film-template').content;
const elGenreTemplate = document.querySelector('#film-genre-template').content;
const elFilmsSelect = document.querySelector('.film-select');
// const elListSelect = document.querySelector("#select")
const elFilmsSearchInput = document.querySelector('.film-search-input');
const elSelectSotr = document.querySelector('.select__sotr')


function NormalizDate(format) {
	const date = new Date(format)
	const day = String(date.getDate()).padStart(2, 0)
	const month = String(date.getMonth() + 1).padStart(2, 0)
	const year = date.getFullYear()

	return day + '.' + month + '.' + year
}


	// ALL
	function renderAll() {
		const newOptions = document.createElement("option")
		newOptions.value = "All"
		newOptions.textContent = "All"

		elFilmsSelect.append(newOptions)
	}

	renderAll()


// Generates array of unique genres
const generateGenres = (films) => {
	const genres = [];

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!genres.includes(genre)) {
				genres.push(genre);
			}
		});
	});

	return genres;
};


// Renders genres to select
const renderGenresSelect = (genres, element) => {

	genres.forEach((genre) => {
		const newOption = document.createElement('option');
		newOption.value = genre;
		newOption.textContent = genre;

		element.appendChild(newOption);
	});
};

// Renders genres to film's item
var renderGenres = (array, element) => {
	element.innerHTML = null;

	array.forEach((genre) => {
		var genreTemplate = elGenreTemplate.cloneNode(true);

		genreTemplate.querySelector('.film-genre').textContent = genre;

		element.appendChild(genreTemplate);
	});
};

// Renders films
var renderFilms = (array, element) => {
	element.innerHTML = null;

	array.forEach((film) => {
		const filmTemplate = elFilmTemplate.cloneNode(true);

		filmTemplate.querySelector('.film__title').textContent = film.title;
		filmTemplate.querySelector('.film__image').src = film.poster;
		filmTemplate.querySelector('.film__overview').textContent = film.overview;
		filmTemplate.querySelector('.film__time').textContent = NormalizDate(film.release_date)

		const elGenres = filmTemplate.querySelector('.film__genres');

		renderGenres(film.genres, elGenres);

		element.appendChild(filmTemplate);
	});
};

renderFilms(films, elFilmsList);
renderGenresSelect(generateGenres(films), elFilmsSelect)


elFilmsListForm.addEventListener("submit", (evt) => {
	// elFilmsListForm.addEventListener("input", (evt) => {
	evt.preventDefault();

	const selectValue = elFilmsSelect.value.trim();
	const inputValue = elFilmsSearchInput.value.trim();
	const ValueSort = elSelectSotr.value.trim();

	let filterAllGenres = []

	if(selectValue === 'All') {
		filterAllGenres = films;
	}else {
		filterAllGenres = films.filter((film) => 
			film.genres.includes(selectValue)
		)
	}

	const regex = new RegExp(inputValue, 'gi');

	const filteredbySearch = filterAllGenres.filter((film) =>
		film.title.match(regex),
	);

	//sort

	if (ValueSort === 'a_z') {
		filteredbySearch.sort((a, z) => {
			if (a.title > z.title) {
				return 1
			} else if (a.title < z.title) {
				return -1
			} else {
				return 0
			}
		})
	}

	if (ValueSort === 'z_a') {
		filteredbySearch.sort((a, z) => {
			if (a.title < z.title) {
				return 1
			} else if (a.title > z.title) {
				return -1
			} else {
				return 0
			}
		})
	}

	if (ValueSort === 'new_old') {
		filteredbySearch.sort((a, z) => {
			if (a.release_date > z.release_date) {
				return 1
			} else if (a.release_date < z.release_date) {
				return -1
			} else {
				return 0
			}
		})
	}

	if (ValueSort === 'old_new') {
		filteredbySearch.sort((a, z) => {
			if (a.release_date < z.release_date) {
				return 1
			} else if (a.release_date > z.release_date) {
				return -1
			} else {
				return 0
			}
		})
	}

	renderFilms(filteredbySearch, elFilmsList)
})





// elFilmsSelect.addEventListener('change', (evt) => {
// 	const generInput = evt.target.value.trim();
// 	const FinFilmsRender = films.filter((film) => 
// 	film.genres.includes(generInput),
// 	)
// 	renderFilms(FinFilmsRender, elFilmsList)
// })


// elFilmsSearchInput.addEventListener('change', (evt) => {
// 	const searchinput = evt.target.value.trim();
// 	const regex = new RegExp(searchinput, 'gi')
// 	const filteredRegex = films.filter((film) => film.title.match(regex));
// 	renderFilms(filteredRegex, elFilmsList)
// })


// elInput.addEventListener("input", )