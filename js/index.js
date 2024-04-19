fetch("https://www.swapi.tech/api")
.then(res => res.json())
.then(data => {
    const ulElement = document.getElementById("options-list");
    const options = data.result;

    for(const option in options) {
        const liElement = document.createElement("li");
        const aElement = document.createElement("a");

        aElement.innerText = option;
        aElement.href = "./pages/" + option + ".html";

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }
})
.catch(err => console.error(err));