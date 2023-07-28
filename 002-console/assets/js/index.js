function fetchData() {
  const deckID = document.getElementById("deckID").value;
  fetch(`https://www.pokemon-card.com/deck/confirm.html/deckID/${deckID}`)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, "text/html");

      const deck_pke = htmlDocument.querySelector("#deck_pke");
      const deck_gds = htmlDocument.querySelector("#deck_gds");
      const deck_tool = htmlDocument.querySelector("#deck_tool");
      const deck_sup = htmlDocument.querySelector("#deck_sup");
      const deck_sta = htmlDocument.querySelector("#deck_sta");
      const deck_ene = htmlDocument.querySelector("#deck_ene");
      const deck_ajs = htmlDocument.querySelector("#deck_ajs");

      const ids = [deck_pke, deck_gds, deck_tool, deck_sup, deck_sta, deck_ene, deck_ajs];

      const liElements = [];  // New array to store li elements

      ids.forEach((element, index) => {
        if (element) {
          const value = element.value;
          console.log(`ID: card-${String(index + 1).padStart(3, '0')}, Value: ${value}`);

          let i = 0;
          let count = 1;
          while (i < value.length) {
            const fiveChars = value.slice(i, Math.min(i + 5, value.length));
            const singleChar = value[Math.min(i + 6, value.length)];

            const idNumber = `set-${String(index + 1).padStart(3, '0')}-${String(count).padStart(3, '0')}-number`;
            console.log(`ID: ${idNumber}, Value: ${fiveChars}`);

            const idSheets = `set-${String(index + 1).padStart(3, '0')}-${String(count).padStart(3, '0')}-sheets`;
            console.log(`ID: ${idSheets}, Value: ${singleChar}`);

            // Create the image URL using the fetched value (fiveChars) and set it to the src attribute of the corresponding image element
            const baseURL = '/images/';
            const imageURL = baseURL + fiveChars + '.jpeg';  // Changed to .jpeg

            // Create new li element
            const newLi = document.createElement('li');

            // Create new img element and set its id and src attributes
            const newImg = document.createElement('img');
            newImg.id = idNumber;
            newImg.src = imageURL;
            newLi.appendChild(newImg);

            // Create new p element and set its id
            const newP = document.createElement('p');
            newP.id = idSheets;
            newLi.appendChild(newP);

            // Add the new li element to the array
            liElements.push(newLi);

            // Duplicate the image based on the value of idSheets
            const sheets = parseInt(singleChar, 10);
            if (!isNaN(sheets)) {
              for (let j = 1; j < sheets; j++) {
                const clone = newLi.cloneNode(true);
                clone.querySelector('img').id = `${idNumber}-clone-${j}`;
                clone.querySelector('p').id = `${idSheets}-clone-${j}`;
                liElements.push(clone);
              }
            }

            count += 1;
            i += 10;
          }
        } else {
          console.error("Element not found");
        }
      });

      // Shuffle the array
      shuffleArray(liElements);

      // Add the li elements to the ul element
      const cardList = document.querySelector('.card-list-precedence');
      liElements.forEach(li => cardList.appendChild(li));
    })
    .catch(error => console.error('Error:', error));
};