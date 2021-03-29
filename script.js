//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
    console.log(episodeList[0]);
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  

  for (let episode of episodeList){
    let pEl = document.createElement("p");
    rootElem.appendChild(pEl);
    if(episode.season <10 && episode.number < 10){
      pEl.textContent = `${episode.name}, S0${episode.season}E0${episode.number}`;
    }else if(episode.season < 100 && episode.number < 10){
      pEl.textContent = `${episode.name}, S${episode.season}E0${episode.number}`;
    }else if(episode.number < 100 && episode.season <10){
        pEl.textContent = `${episode.name}, S0${episode.season}E${episode.number}`;
    }
    let imgEl = document.createElement("img");
    imgEl.src = episode.image.medium;
    rootElem.appendChild(imgEl);
    let summaryP = document.createElement("p");
    rootElem.appendChild(summaryP);
    summaryP.innerHTML = episode.summary;
  }

}

window.onload = setup;

