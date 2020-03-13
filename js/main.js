(()=>{

//Set the variables
const closeButton = document.querySelector("#closeInstButton"),
	lightBox= document.querySelector("#instructionsBG"),
	openButton= document.querySelector("#openInst"),
	dropZone = document.querySelectorAll('.drop-zone'),
	dragZone = document.querySelectorAll('.drag-zone'),
	draggables= document.querySelectorAll(".dog"),
	audioElements= document.querySelectorAll("audio")
	;

let globalPaused = false;
var audioRef ;
const instrumentNames = ["Trumpet", "Harp", "Oboe", "Piano", "Piccolo", "snareDrum", "tenorDrum", "Tuba", "Violin", "Vocal"];


function playTrack(){
	globalPaused=false;
	audioElements[audioRef].load();
	audioElements[audioRef].play();

}
function stopTrack(){
	globalPaused = true;
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
}

function openlightBox(){
	lightBox.classList.remove("closeInst");
}

function allowDrag(){
		console.log('Drag Start!');
		event.dataTransfer.setData("text/plain", this.id);
		audioRef = (this.dataset.imgref);
		//debugger;
		
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