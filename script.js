console.log("Spotify clone");
// index as 0;
let index = 0;

// Creating list of the song.
let song = [{
        id: 1,
        songName: "Aura - Justin",
        coverImage: "covers/1.jpg",
        songLocation: "songs/1.mp3",
    },
    {
        id: 2,
        songName: "Colie - Ardvina",
        coverImage: "covers/2.jpg",
        songLocation: "songs/2.mp3",
    },
    {
        id: 3,
        songName: "Blankspace - twoler",
        coverImage: "covers/3.jpg",
        songLocation: "songs/3.mp3",
    },
    {
        id: 4,
        songName: "TimeLine - NCC",
        coverImage: "covers/4.jpg",
        songLocation: "songs/4.mp3",
    },
    {
        id: 5,
        songName: "Love me - kalyan",
        coverImage: "covers/5.jpg",
        songLocation: "songs/5.mp3",
    },
];
// master Play song name id use in below code.
let masterPlaySongName = document.getElementById("masterPlaySongName");
let progressBar = document.getElementById("progressBar");
let masterPlay = document.getElementById("masterPlay");

progressBar.value = 0;
// Audio to be played.
let music = new Audio(song[0].songLocation);

// Adding song list to the container of the song list.s
let songItemContainer = document.getElementById("songItemContainer");

song.forEach((element) => {
    str = `
    <div class="songItem">
        <img src="${element.coverImage}" alt="" srcset="">
        <span class="songItemName"> ${element.songName}</span>
        <span class="timestamp">5:03 <i id="${element.id}" class="fa-solid fa-circle-play songItemPlay"></i></span>
    </div>
    `;
    songItemContainer.innerHTML += str;
});


// Change Music function to change the music and name in the masterPlay.
const changeMusic = (i) => {
    // making the opacity of the gif to 1.
    document.getElementById('gif').style.opacity = '1';

    // Restarting the progress bar.
    progressBar.value = "0";

    // playing the next song.
    music.src = song[i].songLocation;
    // displaying the name in the masterPlay.
    masterPlaySongName.innerText = song[i].songName;
    music.play();
};
// Making the play button working for the song Item container.
let songItemPlay = document.getElementsByClassName('songItemPlay');

// making all the button first play so that when we add event listener on them the previously button which was having pause logo change to the play logo.
const makeAllPlay = (value) => {
    Array.from(songItemPlay).forEach(element => {
        if (value !== element) {
            element.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
        }
    });

};

// Adding event Listener to the button.
Array.from(songItemPlay).forEach((element) => {
    // So that previously pause button change back to the play button.
    element.addEventListener('click', (e) => {
        // Making the play button to the pause button.
        makeAllPlay(e.target);
        if (e.target.classList.contains('fa-circle-play')) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            index = parseInt(e.target.id) - 1;
            changeMusic(index);

            // Making sure that the masterPlay also display the pause button.
            masterPlay.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play')
        } else {
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');

            // Making sure that the masterPlay also display the pause button.
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            document.getElementById('gif').style.opacity = '0';

            music.pause();
        }

        // Playing the song on which it has been click.
    });
});

// previous and next button of the masterPlay.
let masterForward = document.getElementById('masterForward');
let masterBackward = document.getElementById('masterBackward');

// If click on the forward button.
masterForward.addEventListener('click', () => {
    // Making sure the index is between 0 - 4;
    if (index == 4) {
        index = 0;
    } else {
        index += 1;
    }
    // making the button pause if it is play button.
    if (masterPlay.classList.contains('fa-circle-play')) {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    changeMusic(index);
});

// If click on the backward button.
masterBackward.addEventListener('click', () => {
    // Making sure the index is between 0 - 4;
    if (index <= 0) {
        index = 4;
        console.log("if");
    } else {
        console.log("else")
        index -= 1;
    }

    // making the button pause if it is play button.
    if (masterPlay.classList.contains('fa-circle-play')) {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
    }
    changeMusic(index);
});
// Button play and writing the name of the song.

let gif = document.getElementById('gif');

masterPlay.addEventListener("click", () => {
    console.log("played");
    if (music.paused || music.currentTime <= 0) {
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = "1";
        masterPlaySongName.innerText = song[index].songName;

        // doing the same in the container of the song list.
        let value = index + 1;
        let songContainerItemName = document.getElementById(value);
        songContainerItemName.classList.remove("fa-circle-play");
        songContainerItemName.classList.add("fa-circle-pause");
        music.play();

    } else {
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = "0";
        masterPlaySongName.innerText = song[index].songName;

        // doing the same in the container of the song list.
        let value = index + 1;
        let songContainerItemName = document.getElementById(value);
        songContainerItemName.classList.add("fa-circle-play");
        songContainerItemName.classList.remove("fa-circle-pause");
        music.pause();
    }
});

// updating the progress bar as the music is played.
music.addEventListener('timeupdate', () => {
    let progressValue = (music.currentTime / music.duration) * 100;
    progressBar.value = progressValue;

    if (music.currentTime == music.duration) {
        if (index == 4) {
            index = 0;
        } else {
            index++;
        }
        changeMusic(index);
    }
});

// playing the song as per click on the progress bar.
progressBar.addEventListener('click', () => {
    let currentTime = (progressBar.value * music.duration) / 100;
    music.currentTime = currentTime;
});


// pending
// making the play button on the container list to play the music.
// time duration to be added as per the time duration