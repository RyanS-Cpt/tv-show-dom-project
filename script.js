//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
    // console.log(episodeList[0]);
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // add search input with type text and append to body - added in HTML
  let search = document.getElementById("search");
  
  // only matching name or summary should be included - ?filter with includes method
  // search should be case insensitive
  function filter (){
    let result = search.value.toLowerCase();
    console.log(result);
    let newList = episodeList.filter( el=> el.name.includes(result) || el.summary.includes(result));
    console.log(newList);
    return newList;
  }
  
  for (let index of episodeList){
        search.addEventListener("input", filter);
  }
  // search input should be live/immediate response after keystroke - add event-listener 'input' to respond to every change in the value 
  // display number of matching results next to search input
  // if search input is cleared all episodes should be displayed

    for (let episode of episodeList){
          if (search.value.length === 0){

      let container = document.createElement("div");
      let pEl = document.createElement("p");
      rootElem.appendChild(container);
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
      container.appendChild(pEl);
      container.appendChild(imgEl);
      container.appendChild(summaryP);
    } else if (search.value.length > 0){
        
       let container = document.createElement("div");
      let pEl = document.createElement("p");
      rootElem.appendChild(container);
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
      container.appendChild(pEl);
      container.appendChild(imgEl);
      container.appendChild(summaryP);
    }
  }
}

window.onload = setup;

