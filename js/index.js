fetch("https://www.swapi.tech/api")
.then(res => res.json())
.then(data => {
    const ulElement = document.getElementById("options-list");
    const options = data.result;

    console.log(options)
    for(const option in options) {
        const liElement = document.createElement("div");
        const aElement = document.createElement("a");

        aElement.href = "./pages/" + option + ".html";
        aElement.textContent = option.toUpperCase();
        liElement.classList.add("option")
        aElement.classList.add("button-like");

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }
})
.catch(err => console.error(err));