// const jokeUrl = 'https://jokeservicedipajn.herokuapp.com/api/jokes';

const setup = document.querySelector('#setup');
const punchline = document.querySelector('#punchline');
const btnAddJoke = document.querySelector('#addJoke');


async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.json();
}

btnAddJoke.onclick = async () => {
    try {
        await post("/addJoke", { setup: setup.value, punchline: punchline.value });
    } catch (e) {
        fejl.innerHTML = "Error i joke input!";
    }
}



async function get(url) {
    respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

function genererTabel(jokes) {
    let html = '<table>';
    for (joke of jokes) {
        html +=
            '<tr><td>' + joke.setup +
            '</td><td>' + joke.punchline +
            '</td></tr>\n';
    }
    html += '</table>';
    return html;
}


function sendJSON(){ 

    let result = document.querySelector('.result'); 
    let setup = document.querySelector('#setup'); 
    let punchline = document.querySelector('#punchline'); 

    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let jokeUrl = 'https://jokeservicedipajn.herokuapp.com/api/jokes'
    // open a connection 
    xhr.open("POST", jokeUrl, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            result.innerHTML = this.responseText; 

        } 
    }; 

    // Converting JSON data to string 
    var data = JSON.stringify({ "setup": setup.value, "punchline": punchline.value }); 

    // Sending data with the request 
    xhr.send(data); 
}