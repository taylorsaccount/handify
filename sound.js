let loaded = false;
fft = new Tone.FFT(64)
const crusher = new Tone.BitCrusher(3).toDestination();
const cheby = new Tone.Chebyshev(30).toDestination();
const phaser = new Tone.Phaser({
	frequency: 35,
	octaves: 5,
	baseFrequency: 10000
}).toDestination();
const effectBus = new Tone.Gain().toDestination();

const outputBus = new Tone.Gain();

window.fft = fft
window.outputBus = outputBus;
window.crusher = crusher;
window.cheby = cheby;
window.phaser = phaser;
window.effectBus = effectBus;
let audioFiles = ["tone1.wav", "tone2.wav", "tone3.wav"]
let tracks = []; // Array to hold SoundFile instances

document.querySelector("#buttonSound")?.addEventListener("click", async () => {
	if (!loaded) {
		await Tone.start();
		loaded = true;
		console.log("audio is ready");
	}	
});

window.addEventListener("load", (event) => {
	for (let i = 0; i < audioFiles.length; i++) {
		tracks.push(new SoundFile(audioFiles[i]));
	}
	
	// Connect all tracks to the output bus
	tracks.forEach(track => track.player.connect(outputBus));

	outputBus.connect(effectBus);
	
	
	Tone.loaded().then(() => {console.log("all files loaded")});
	
});

// Function to play all tracks at the same time
function playAllTracks() {
	tracks.forEach(track => track.playerStart());
}

// Function to stop all tracks
function stopAllTracks() {
	tracks.forEach(track => track.playerStop());
}



class SoundFile {
	constructor(filename){
		this.player = new Tone.Player(filename).toDestination();
		this.playing = false;
		
		
	}

	playerStart(){
		this.player.start()
		this.playing = true
		
	}

	playerStop() {
		this.player.stop()
		this.playing = false
	}
	
}

