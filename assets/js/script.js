let inputSearch = document.getElementById("input-search");
let inputButton = document.getElementById("input-button");

window.onload = () => {
  newSearch();
};

function newSearch() {
  inputButton.addEventListener("click", loadJSON);
  inputSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      loadJSON();
    }
  });
}

async function loadJSON() {
  document.getElementById("output").innerHTML = " ";
  let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputSearch.value}`);
  let musicObject = await musicResponse.json();
  let musicArray = musicObject.data;
  iterateArray(musicArray);
}

function iterateArray(musicArray) {
  for (let m of musicArray) {
    document.getElementById("output").innerHTML += `<img src="${m.artist.picture_medium}">`;
  }
}
