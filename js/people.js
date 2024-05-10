document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("people-list");
  
    fetch("https://www.swapi.tech/api/people/")
      .then((res) => res.json())
      .then((data) => {
        const peopleList = data.results;
  
        peopleList.forEach((person) => {
          const pEl = document.createElement("div");
          pEl.classList.add("person");
  
          const detailsContainer = document.createElement("div");
          detailsContainer.classList.add("details");
  
          const toggleBtn = document.createElement("div");
          toggleBtn.textContent = person.uid + ". " + person.name;
  
          toggleBtn.addEventListener("click", () => {
            const personDetails = detailsContainer.querySelector(".person-details");
            if (personDetails.style.display === "none") {
              // If person details are currently hidden, fetch and display them
              fetch(person.url)
                .then((res) => res.json())
                .then((personData) => {
                  console.log(personData); // Log fetched data
                  const birthYear = personData.result.properties.birth_year.toUpperCase();
                  const eyeColor = personData.result.properties.eye_color.toUpperCase();
                  const gender = personData.result.properties.gender.toUpperCase();
                  const hairColor = personData.result.properties.hair_color.toUpperCase();
                  const height = personData.result.properties.height;
                  const mass = personData.result.properties.mass;
                  const skinColor = personData.result.properties.skin_color.toUpperCase();
          
                  const personInfo = [
                    `Birth Year: ${birthYear}`,
                    `Eye Color: ${eyeColor}`,
                    `Gender: ${gender}`,
                    `Hair Color: ${hairColor}`,
                    `Height: ${height}`,
                    `Mass: ${mass}`,
                    `Skin Color: ${skinColor}`
                  ];
          
                  personDetails.innerHTML = ""; // Clear previous details
                  personInfo.forEach((info) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = info;
                    personDetails.appendChild(listItem);
                  });
          
                  // Show person details
                  personDetails.style.display = "block";
                  pEl.style.width = "100%";
                })
                .catch((err) => console.error(err));
            } else {
              // If person details are currently visible, hide them
              personDetails.style.display = "none";
              if (window.innerWidth <= 1023) {
                // Apply width adjustments for tab and mobile devices
                pEl.style.width = "100%";
              } else {
                pEl.style.width = "50%";
              }
            }

            
          });
          
          const personDetails = document.createElement("ul");
          personDetails.classList.add("person-details");
          personDetails.style.display = "none"; // Initially hide details
  
          detailsContainer.appendChild(toggleBtn);
          detailsContainer.appendChild(personDetails);
  
          pEl.appendChild(detailsContainer);
          list.appendChild(pEl);
        });
      })
      .catch((err) => console.error(err)); // Log any initial fetch errors
  });
