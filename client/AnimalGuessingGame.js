const url = "https://api.thecatapi.com/v1/breeds";
const api_key = "live_3heUFiZslAqfzorY87fuKrJdCV33WyCSeUV4iO67RHjgIjI3bCiTpNItOedzV5by"
let savedCatBreeds = []
var updateScore = 0;

fetch(url,
        {headers: 
            {
            'x-api-key': api_key //this api key is so that more than 10 images can be displayed, only 10,000 images a month can be displayed
            }
        }
    )
.then((response) => { 
 return response.json();
                    }
    )
.then((data) => {
 
 data = data.filter(img=> img.image?.url != null) //gets rid of any breeds that may not have an image
 
savedCatBreeds = data;
 
 for (let i = 0; i < savedCatBreeds.length; i++)  {
  const breed = savedCatBreeds[i];
  let choice = document.createElement('option');

   if(!breed.image)continue

  choice.value = i;
  choice.innerHTML = `${breed.name}`;
document.getElementById('catBreedSelector').appendChild(choice);
  }
showCatBreedImage(0)
}
)
.catch(function(error) { //watching for errors
    console.log("There was a problem fetching the breeds.");
}
);

function showCatBreedImage(index)
{ 
document.getElementById("catBreedImage").src= savedCatBreeds[index].image.url; //picture of cat

document.getElementById("catBreedDesc").textContent= savedCatBreeds[index].temperament //description of cat
}

function guess(){
    const input = document. createElement("input");
    input.setAttribute("id", "guess");
    input.setAttribute("type", "text");

    document.body.appendChild(input);

    const label = document.createElement("label")
    label.setAttribute("for", "guess");
    label.innerHTML = "Guess: ";
    const guessText = document.getElementById("guess");

    document.body.insertBefore(label, guessText);
}

function setScore(updateScore) {
    document.getElementById("Score-id").value = updateScore;
}

function cheat(){
    let text = "Are you sure you want to cheat?";
    if (confirm(text) == true){
    ++ updateScore;
    setScore(updateScore);
    } else {
    alert("You are not a cheater.");
    }
}

function match(){
    if(guess == catBreedSelector){
    alert("This is a match!");
    ++ updateScore;
    setScore(updateScore);
    } else {
    alert("This is not a match.");
    }
}

function initApplication() {
    console.log('AnimalGuessingGame Has Begun!');
}