fetch("https://www.swapi.tech/api")
.then(res => res.json())
.then(data => {
    const ulElement = document.getElementById("options-list");
    const options = data.result;

    for(const option in options) {
        const liElement = document.createElement("p");
        const aElement = document.createElement("a");

        aElement.href = "./pages/" + option + ".html";
        aElement.textContent = option.toUpperCase();
        aElement.classList.add("button-like");

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }
})
.catch(err => console.error(err));