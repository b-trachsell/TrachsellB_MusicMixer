(()=>{

//Set the variables
const closeButton = document.querySelector("#closeInstButton"),
	lightBox= document.querySelector("#instructionsBG"),
	openButton= document.querySelector("#openInst"),
	dropZone = document.querySelectorAll('.drop-zone'),
	dragZone = document.querySelectorAll('.drag-zone'),
	draggables= document.querySelectorAll(".dog"),
	ppButton= document.querySelector("#playPause"),
	resetButton= document.querySelector("#reset"),
	audioElements= document.querySelectorAll("audio")
	;

let globalPaused = false;
var audioRef;
const playPause = ["▶","■"];
const instrumentNames = ["Clarinet", "Piano", "Piccolo", "tenorDrum", "snareDrum", "Trumpet", "Violin",  "Vocal", "Harp"];


function reset(){

	dropZone.forEach ((zone, index) => {
		//goes through each zone
			if (dropZone[index].children[0] === (undefined)){
			// dertermines if there is not a child in the zone
				return;
			//if so doesn't do anything
			}
			else{
				//if there IS a child
				dragZone.forEach ((zoned, index) =>{
					//Go through each dragZone see if it has a child
					if (dragZone[index].children[0] === (undefined)){
						//debugger;
					//if there is not a child already in there
	    				dragZone[index].appendChild(draggables[index]);

	    				//put the child there
	    			}
	    			else{
	    				return;
	    				//if there is already a child do nothing
	    			}
    			})
    			audioElements.forEach((a,index) => {
					//go through each audio element and pause them all
					audioElements[index].pause();
				})
    		}	
		})
}

function globalPlayPause(){
	if (globalPaused == false) {
		//if global paused is false
		audioElements.forEach((a,index) => {
			//go through each audio element
			audioElements[index].pause();
			//and pause it
			ppButton.textContent = playPause[0]
			//change the play button
			globalPaused= true;
			//and let the program know its paused
		})
	}
	else if (globalPaused == true) {
		//if global paused is true

		audioElements.forEach((a, index )=> {
			//go through each audio element
			if ( draggables[index].parentElement.className == "drop-zone"){
				// if it is in the drop zone,
				
				if (index == 8){
					//Harp was being weird
					//first check if its the harp
					//if its the harp
					//fix the harp
					index = -1;
				}

				audioElements[index+1].play();
				// then you play it
				ppButton.textContent = playPause[1]
				//change the play button
				}

			else{
				console.log("ass these dont play");
				}

				ppButton.textContent = playPause[1]
				//if it is in the drag zone do nothing
				return;
			})
			globalPaused=false;
			console.log(globalPaused);
			//now set globalPaused to false
	}
}


function playTrack(){
	if (globalPaused == false){
		audioElements[audioRef].load();
		audioElements[audioRef].play();
	}
	else{
		console.log("paused");
	}

}
function stopTrack(){
	//globalPaused = true;
	audioElements[audioRef].pause();

}


function closelightBox(){
	//adds closeInst which hides the lightbox
	lightBox.classList.add("closeInst");
	//does this in close lightbox because
	//you have to close the light box anyway
	instrumentNames.forEach((instrument, index) => {
			draggables[index].id = `dog${instrument}`;

		});
	//debugger;
}

function openlightBox(){
	lightBox.classList.remove("closeInst");
}

function allowDrag(){
		console.log('Drag Start!');
		event.dataTransfer.setData("text/plain", this.id);
		audioRef = (this.dataset.imgref);
		
		
	}

function allowDragOver(event){
		event.preventDefault();
		console.log('DragOver Start!');
	}

function allowDrop(event){
		if (event.target.className == ('drop-zone')) {
			console.log(event.target.class);
			event.preventDefault();
			console.log('Drop Start!');
			let currentImage = event.dataTransfer.getData("text/plain");
			//debugger;
			event.target.appendChild(document.querySelector(`#${currentImage}`));
			console.log(event.target.class);
			playTrack();
		}
		if (event.target.className == ('drag-zone')) {
			console.log(event.target.class);
			event.preventDefault();
			console.log('Drop Start!');
			let currentImage = event.dataTransfer.getData("text/plain");
			//debugger;
			event.target.appendChild(document.querySelector(`#${currentImage}`));
			console.log(event.target.class);
			stopTrack();
		}
	}

closeButton.addEventListener("click", closelightBox);
openButton.addEventListener("click", openlightBox);
ppButton.addEventListener("click", globalPlayPause); 
resetButton.addEventListener("click", reset);

draggables.forEach(dog => dog.addEventListener('dragstart', allowDrag));
dropZone.forEach(zone => {
	zone.addEventListener('dragover', allowDragOver)
	zone.addEventListener('drop', allowDrop)
});
dragZone.forEach(zonedrag => {
	zonedrag.addEventListener('dragover', allowDragOver)
	zonedrag.addEventListener('drop', allowDrop)
});








})();