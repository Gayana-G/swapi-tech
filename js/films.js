document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("films-list");
  
    fetch("https://www.swapi.tech/api/films/") // Delay set to 1 second (1000 milliseconds)
      .then((res) => res.json())
      .then((data) => {
        const films = data.result;
  
        films.forEach((film) => {
          const divEl = document.createElement("div");
          divEl.classList.add("film");
  
          const toddleBtn = document.createElement("button");
          toddleBtn.textContent = film.description + " episode " + film.properties.episode_id;
          toddleBtn.addEventListener("click", () => {
            const details = divEl.querySelector(".details");
            details.style.display = details.style.display === "none" ? "block" : "none";
          });
  
          divEl.appendChild(toddleBtn);
  
          // Create details container
          const detailsContainer = document.createElement("div");
          detailsContainer.classList.add("details");
          detailsContainer.style.display = "none"; // Initially hide details
  
          // Populate details container with information
          // Assuming your data has some properties like "name", "description", etc.
          const name = document.createElement("p");
          name.textContent = "Name: " + film.properties.title;
          detailsContainer.appendChild(name);
  
          const description = document.createElement("p");
          description.textContent = "Description: " + film.properties.opening_crawl;
          detailsContainer.appendChild(description);

  
            // Append details container to div element
            divEl.appendChild(detailsContainer);
  
            // Append div element to list
            list.appendChild(divEl);
          });
        })
      .catch((err) => console.error(err));
  });
  
  