// matches = books
// page = 1;

// Import all values from data.js to be used in this file.
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

/* 
totalBooksShown keeps track of the books displayed on the page and is
incremented by 1 each time a new book is added. */
let totalBooksShown = 0;

// "fragment" variable houses each book element on the page.
const fragment = document.createDocumentFragment()

/**
 * This object gets and houses all the html elements used in this file for easy
 * access.
 *
 * @type {object}
 */
const elements = {
    header: {
        search: document.querySelector("[data-header-search]"),
        settings: document.querySelector("[data-header-settings]")
    },
    main: {
        items: document.querySelector("[data-list-items]"),
        message: document.querySelector("[data-list-message]"),
        button: document.querySelector("[data-list-button]")
    },
    preview: {
        overlay: document.querySelector("[data-list-active]"),
        blur: document.querySelector("[data-list-blur]"),
        image: document.querySelector("[data-list-image]"),
        title: document.querySelector("[data-list-title]"),
        subtitle: document.querySelector("[data-list-subtitle]"),
        description: document.querySelector("[data-list-description]"),
        close: document.querySelector("[data-list-close]")
    },
    search: {
        overlay: document.querySelector("[data-search-overlay]"),
        form: document.querySelector("[data-search-form]"),
        title: document.querySelector("[data-search-title]"),
        genre: document.querySelector("[data-search-genres]"),
        author: document.querySelector("[data-search-authors]"),
        cancel: document.querySelector("[data-search-cancel]")
    },
    settings: {
        overlay: document.querySelector("[data-settings-overlay]"),
        form: document.querySelector("[data-settings-form]"),
        theme: document.querySelector("[data-settings-theme]"),
        save: document.querySelector("button.overlay__button.overlay__button_primary[form='settings']"),
        cancel: document.querySelector("[data-settings-cancel]")
    }
};

/**
 * A function that takes a book object from the "books" array, destructures it's
 * various values, creates a "div" element, and then inputs each value inside
 * its own element within the newly created "div" element, creating a class for
 * each that corresponds with the class selectors in the css file. It then
 * returns the html element.
 *
 * @param {object} book 
 * @returns {HTMLElement}
 */
const createBookElements = (book) => {
    // Each "book" object in "books" array is destructured for convenience.
    const { author, id, image, title, description, published } = book;
    // "author" id gets authors name from "authors" object.
    const authorName = authors[author];

    // Create "div" element to house each book.
    const bookElement = document.createElement("div");
    // Set class name to "preview" to correspond with ".preview" selector in css file.
    bookElement.className = "preview";
    // Set unique id for each book element to facilitate specific referencing.
    bookElement.dataset.id = id;

    /* 
    Set child elements of "bookElement" with each class name corresponding to
    those in the css file. */
    bookElement.innerHTML = /* html */ `
        <img class="preview__image" src="${image}" alt="super-epic-pic"/>

        <div class="preview__info">
            <p class="preview__title">${title}</p>
            <p class="preview__author">${authorName}</p>
            <p class="preview_hidden" id="description">${description}</p>
            <p class="preview_hidden" id="date">${published}</p>
        </div>
    `

    return bookElement;
};

/**
 * A handler function that adds 36 books to the 'data-list-items' element on the
 * page whenever it is run. It houses the array "extractedBooks" that contains
 * 36 book objects from the "books" array. It then uses a for loop to iterate
 * through the "extractedBooks" array and runs "createBookElements" for each
 * book. It then appends each book element to the "fragment" variable and
 * increment the "totalBooksShown" variable by 1. Finally, it appends the
 * fragment to the 'data-list-items' element
 */
const handleAddBooks = () => {
    /* 
    This variable stores all the books that should be added to the page whenever
    "handleAddBooks" is run, and is defined each time that happens. Since
    "totalBooksShown" is incremented by 1 with the addition of each book, the
    slice() method will constantly retrieve new books until there are none left.
    */
    const extractedBooks = books.slice(totalBooksShown, totalBooksShown + BOOKS_PER_PAGE);

    /* 
    Iterate through "extractedBooks" and run "createBookElements" function for
    each book object. Append each book element to "fragment" and increment
    "totalBooksShown" by 1. */
    for (const bookObj of extractedBooks) {
        // Save function result to a variable for clarity.
        const newBook = createBookElements(bookObj);
        fragment.appendChild(newBook);
        totalBooksShown += 1;
    };

    // Append fragment to 'data-list-items' element.
    elements.main.items.appendChild(fragment);
    // Update "data-list-button" to reflect the number of book left.
    elements.main.button.innerText = `Show more (${books.length - totalBooksShown})`;
};



handleAddBooks()



elements.main.button.addEventListener("click", handleAddBooks)
console.log(totalBooksShown)



const handleThemeSettings = () => {
    const isOpen = elements.settings.overlay

    if (!isOpen.open) {
        isOpen.open = true;
    } else {
        isOpen.open = false
    }
}


const char = document.querySelector(".backdrop")

char.innerText = "this is the backdrop"
// console.log(elements.settings.save)
console.log(elements.settings.cancel)
elements.header.settings.addEventListener("click", handleThemeSettings)
elements.settings.cancel.addEventListener("click", handleThemeSettings)

const handleAddTheme = (event) => {
    event.preventDefault()
    console.log("add button working")
    // const formData = new FormData(event.target)
    // const result = Object.fromEntries(formData)
    // document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    // document.documentElement.style.setProperty('--color-light', css[result.theme].light);
}

elements.settings.save.addEventListener("click", handleAddTheme)

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
// }

// const day = {
//     dark: '10, 10, 20',
//     light: '255, 255, 255',
// }

// const night = {
//     dark: '255, 255, 255',
//     light: '10, 10, 20',
// }

// console.log(window.matchMedia('(prefers-color-scheme: light)').matches)
// elements.settings.theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);

// if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')


// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)




// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')


// data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />

//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

// data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
// //         <span>Show more</span>
// //         <span class="list__remaining"> (${remaining})</span>
// //     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
// data-search-overlay.open = false
// }



const handlePreview = (event) => {

    // Select the div closest to the mouse click
    const targetOrder = event.target.closest('.preview');

    const isPreviewOpen = elements.preview.overlay

    if (isPreviewOpen.open) {
        isPreviewOpen.open = false;
    }

    if (targetOrder) {
        isPreviewOpen.open = true;

        // Get target order image element and save to a variable
        const previewImage = targetOrder.querySelector('.preview__image');
        // Get text 
        const previewTitle = targetOrder.querySelector('.preview__title').textContent;
        const previewAuthor = targetOrder.querySelector('.preview__author').textContent;
        const previewDescription = targetOrder.querySelector('#description').textContent;
        const previewDateText = targetOrder.querySelector('#date').textContent;

        const previewSrc = previewImage.src

        elements.preview.image.src = previewSrc;
        elements.preview.blur.src = previewSrc;
        elements.preview.title.innerText = previewTitle;
        elements.preview.subtitle.innerText = `${previewAuthor} (${previewDateText.slice(0, 4)})`;
        elements.preview.description.innerText = previewDescription;

    };
};

elements.main.items.addEventListener("click", handlePreview);
elements.preview.close.addEventListener("click", handlePreview);