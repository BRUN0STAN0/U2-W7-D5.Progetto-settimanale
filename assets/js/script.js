let inputSearch = document.getElementById("input-search");
let inputButton = document.getElementById("input-button");
const scrollContainer = document.querySelector("#output");

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
  document.getElementById("home").style = "display: none!important";
  for (let m of musicArray) {
    document.getElementById("output").innerHTML += `<div class="card bg-transparent" style="width: 14rem;">
                                                      <img src="${m.artist.picture_medium}" class="card-img-top" style="opacity: 0.8" alt="...">
                                                      <div class="card-body text-white">
                                                      <div class="preview-link">${m.preview}</div>
                                                        <h5 class="card-title">${m.title_short}</h5>
                                                        <p class="card-text">${m.artist.name}</p>
                                                        <button class="btn btn-primary" style="opacity: 0.8" onclick="selectSong(event)">Select this song</button>
                                                      </div>
                                                    </div>`;
  }
}

function selectSong(eventClick) {
  let preview = eventClick.target.parentElement.children[0].innerHTML;
  document.getElementById("bar-audio").innerHTML = `<audio controls style="width: 100vw;">
                                                        <source src="${preview}" type="audio/ogg">
                                                      </audio>`;
}

// ! SCROLL LEFT & RIGHT CONTAINER
scrollContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollContainer.scrollLeft += e.deltaY + 141;
  if (e.deltaY == -100) {
    scrollContainer.scrollLeft -= 241;
  }
});
