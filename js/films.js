document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("films-list");

  fetch("https://www.swapi.tech/api/films/")
    .then((res) => res.json())
    .then((data) => {
      const films = data.result;

      films.forEach((film) => {
        const pEl = document.createElement("div");
        pEl.classList.add("film");

        const toggleBtn = document.createElement("div");
        toggleBtn.textContent =
          film.description + " episode " + film.properties.episode_id;
        pEl.appendChild(toggleBtn);

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("details");
        detailsContainer.style.display = "none";

        const name = document.createElement("p");
        name.textContent = "Name: " + film.properties.title;

        const description = document.createElement("p");
        description.textContent =
          "Description: " + film.properties.opening_crawl;

        const charactersToggle = document.createElement("span");
        charactersToggle.textContent =
          "Characters (click here to see the list)";
        charactersToggle.classList.add("characters-toggle");
        charactersToggle.addEventListener("click", () => {
          const charactersList = detailsContainer.querySelector(".characters");
          const isHidden = charactersList.style.display === "none";

          if (isHidden) {
            if (!detailsContainer.dataset.charactersLoaded) {
              const characterNames = [];
              const characterPromises = film.properties.characters.map(
                (charURL) => {
                  return fetch(charURL)
                    .then((res) => res.json())
                    .then((characterData) => {
                      const characterName =
                        characterData.result.properties.name;
                      characterNames.push(characterName);
                    });
                }
              );

              Promise.all(characterPromises).then(() => {
                charactersList.innerHTML = ""; // Clear previous list content
                characterNames.forEach((characterName) => {
                  const listItem = document.createElement("li");
                  listItem.textContent = characterName;
                  charactersList.appendChild(listItem);
                });
              });

              detailsContainer.dataset.charactersLoaded = true;
            }
            charactersList.style.display = "block";
            charactersToggle.textContent =
              "Characters (click here to hide the list)";
          } else {
            charactersList.style.display = "none";
            charactersToggle.textContent =
              "Characters (click here to see the list)";
          }
        });

        const charactersList = document.createElement("ul");
        charactersList.classList.add("characters");
        charactersList.style.display = "none";

        detailsContainer.appendChild(name);
        detailsContainer.appendChild(description);
        detailsContainer.appendChild(charactersToggle);
        detailsContainer.appendChild(charactersList);

        pEl.appendChild(detailsContainer);
        list.appendChild(pEl);

        toggleBtn.addEventListener("click", () => {
          const detailsContainer = pEl.querySelector(".details");

          detailsContainer.style.display =
            detailsContainer.style.display === "none" ? "block" : "none";

          if (detailsContainer.style.display === "block") {
            pEl.style.width = "100%";
          } else {
            if (window.innerWidth <= 1023) {
              // Apply width adjustments for tab and mobile devices
              pEl.style.width = "100%";
            } else {
              pEl.style.width = "50%";
            }
          }
        });
      });
    })
    .catch((err) => console.error(err));
});
