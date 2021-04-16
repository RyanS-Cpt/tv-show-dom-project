//You can edit ALL of the code here
//Global variables
  let search = document.getElementById("search");
  let searchResult = document.getElementById("searchResult");
  const rootElem = document.getElementById("root");
  // const allEpisodes = getAllEpisodes();
  let newList = [];
  let selector = document.getElementById("selector");
  let selectedOpt = [];
  let apiArray; // array to store data fetched






 //function for window load event
function setup() {
    // fetch to receive data
    fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(response =>{
      // console.log("This is response before .json",response);
      return response.json();
    })
    .then( data => {
      // console.log("This is data received after .json",data);
      apiArray = data;  
      console.log("This is stored array of data",apiArray);
    })

//use setTimeout to delay this section
setTimeout(function(){
 // makePageForEpisodes(allEpisodes);
      console.log("This is the array at time of page load after timeout",apiArray);
      makePageForEpisodes(apiArray);

      //Adds option element into select element
    //  addOption(allEpisodes);
    addOption(apiArray);

     //event listener for select
    selector.addEventListener("click", ()=>addEventOption(apiArray));

    //event listener for search input 
    search.addEventListener("input", ()=>searchEvent(apiArray));

},500);
     
}   




    //function to create and populate window with data from array
function makePageForEpisodes(episodeList) {

    searchResult.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;

    for (let episode of episodeList){

      let container = document.createElement("div");
      container.className = "container";
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
  //function to populate select element with options
  function addOption(episodeArray){
      let defaultDisplay = document.createElement("option");
      selector.appendChild(defaultDisplay);
      defaultDisplay.innerText = "Display all";
    episodeArray.forEach(element => {
        let optionElem = document.createElement('option');
        selector.appendChild(optionElem);
         if(element.season <10 && element.number < 10){
        optionElem.textContent = `S0${element.season}E0${element.number} - ${element.name}`;
      }else if(element.season < 100 && element.number < 10){
        optionElem.textContent = `S${element.season}E0${element.number} - ${element.name}`;
      }else if(element.number < 100 && element.season <10){
          optionElem.textContent = `S0${element.season}E${element.number} - ${element.name}`;
      }

    });

  }

  //function for select event
function addEventOption (episodeArray) {
    let selection = selector.value;
    if(selection === "Display all"){
      rootElem.innerHTML = "";
      makePageForEpisodes(episodeArray);
    }
    else{
      selectedOpt = episodeArray.filter(el=> selection.includes(el.name));
      rootElem.innerHTML = "";
      makePageForEpisodes(selectedOpt);
    }
};






// function for search event
function searchEvent(episodeArray){
      let result = search.value.toLowerCase();
      newList = episodeArray.filter( (el)=> {
        return (
              el.name.toLowerCase().includes(result) || 
              el.summary.toLowerCase().includes(result)
        );
      });
     
      rootElem.innerHTML = "";
      selector.innerHTML = "";
      addOption(newList);
      makePageForEpisodes(newList);
      searchResult.innerText = `Displaying ${newList.length}/${episodeArray.length}`;
    };

    
//event on page load
window.onload = setup;



