console.log('Hello world')

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const cherpsElement = document.querySelector('.cherps');
const API_URL = 'http://localhost:5000/cherps'

loadingElement.style.display = '';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    
    const cherp = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(cherp),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdCherp => {
        console.log(createdCherp);
        form.reset();
        form.style.display = '';
        loadingElement.style.display = 'none';
    })
});

function listAllCherps(){
    fetch(API_URL)
    .then(response => response.json())
    .then(cherps => {
        console.log(cherps);
        cherps.forEach(cherp => {
            const div = document.createElement('div')

            const header = document.createElement('h3');
            header.textContent = cherp.name;

            const contents = document.createElement('p');
            content.textContent = cherp.content;

            div.appendChild(header);
            div.appendChild(contents);

            cherpsElement.appendChild(div)
        });
    });
}