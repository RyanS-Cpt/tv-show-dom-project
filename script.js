//You can edit ALL of the code here
//Global variables
  const search = document.getElementById("search");
  const searchResult = document.getElementById("searchResult");
  const rootElem = document.getElementById("root");
  const selector = document.getElementById("episodeSelector");
  const showSelect = document.getElementById("showSelector");
  const shows = getAllShows();
  // const allEpisodes = getAllEpisodes();
  let newList = [];
  let selectedOpt = [];
  let apiArray; // array to store data fetched








 //function for window load event
function setup() {
    // console.log(shows);
    //add option for show select
    showSelectOption(shows);

  // console.log(showSelect.value);
    let [showId] = shows;
  //   .filter((show) => {
  //     // console.log(show.id);
  //   if (showSelect.value == show.id)
    
  //     return show;
  // });

    fetchShowData(showId.id);


 // makePageForEpisodes(allEpisodes);
      // console.log("This is the array at time of page load after timeout",apiArray);
     
      //Adds option element into select element
    //  addOption(allEpisodes);


     //event listener for select
    selector.addEventListener("click", ()=>addEventOption(apiArray));

    //event listener for search input 
    search.addEventListener("input", ()=>searchEvent(apiArray));

    //event listener for show select
    showSelect.addEventListener("change", ()=>fetchShowData(showSelect.value));


     
}   




function fetchShowData(showId) {

  rootElem.innerHTML = "";


  
  // fetch to receive data
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`) //use string interpolation to change id of url here to selected show
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw `Error + ${response.status}:${response.statusText}`;
      }
    })
    .then(data => {
      apiArray = data;
      makePageForEpisodes(apiArray);
      addOption(apiArray);


    })
    .catch(error => alert("Error!"));
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
      if (episode.image){
      imgEl.src = episode.image.medium;
      rootElem.appendChild(imgEl);
      }else{
        console.log(`No image for ${episode.name}`);
      }
      
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

//function for show select
function showSelectOption (showArray){
  let sortedShows = [];
  showArray.forEach(show => sortedShows.push({name: show.name, id: show.id})); //need to sort the array or grab the names and then sort them
  sortedShows.sort();
  sortedShows.forEach(show =>{
    let showOpt = document.createElement("option"); //add id as value attribute to each option
    showSelect.appendChild(showOpt);
    showOpt.textContent = show.name;
    // console.log(show);
    showOpt.setAttribute("value",show.id);
  })
}

//Function to fetch show data based on showSelect value
// function showChanger(selectValue){ 



// }

// function for search event
function searchEvent(episodeArray){
      let result = search.value.toLowerCase();
      newList = episodeArray.filter( (el)=> {
        if(el.summary){
        return (                                       //include if statement to check for presence of summary as with img on line 86
              el.name.toLowerCase().includes(result) || 
              el.summary.toLowerCase().includes(result)
        )}else{

          console.log(`No summary for ${el.name} `);
          return el.name.toLowerCase().includes(result);
          
        }
      });
     
      rootElem.innerHTML = "";
      selector.innerHTML = "";
      addOption(newList);
      makePageForEpisodes(newList);
      searchResult.innerText = `Displaying ${newList.length}/${episodeArray.length}`;
    };

    

//event on page load

window.onload = setup; 


