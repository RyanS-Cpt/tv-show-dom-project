//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
    console.log(episodeList[0]);
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  

  for (let episode of episodeList){
    let pEl = document.createElement("p");
    rootElem.appendChild(pEl);
    pEl.textContent = `${episode.name}, season:${episode.season}, episode number:${episode.number}`;
    let imgEl = document.createElement("img");
    imgEl.src = episode.image.medium;
    rootElem.appendChild(imgEl);
    let summaryP = document.createElement("p");
    rootElem.appendChild(summaryP);
    summaryP.innerHTML = episode.summary;
  }

}

window.onload = setup;

