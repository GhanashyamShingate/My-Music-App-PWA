/**
 * Appends a new song to the list.
 */
import MusicDB from "./MusicDB.js";
MusicDB.open()
  .then(() => {
    document.getElementById("add-button").disabled = false;
    MusicDB.getAll().then(displaySongs).catch(displayErrorMessage);
  })
  .catch((error) => {
    const shyam = document.createElement("div");
    shyam.className = "Error";
    shyam.innerText = error;
    shyam.appendChild(shyam);
  });

//import MusicDB from "./MusicDB";

// Gets the user input.
document.getElementById("add-button").addEventListener("click", () => {
  const title = document.getElementById("song-title").value;
  const artist = document.getElementById("song-artist").value;
  //MusicDB.add(title, artist);
  if (title && artist) {
    console.log("inside if");
    MusicDB.getByTitle(title).then(displaySongs).catch(displayErrorMessage);
    MusicDB.getByArtist(artist).then(displaySongs).catch(displayErrorMessage);
  } else {
    console.log("inside else");
    MusicDB.getAll().then(displaySongs).catch(displayErrorMessage);
  }
  MusicDB.add(title, artist);
});

//   messageOutput.innerHTML = "";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "/" })
    .then(function (registration) {
      console.log("Register Succes:", registration);
    })
    .catch(function (error) {
      console.log("Register Failed:", error);
    });
} else {
  console.log("Service worker not supported");
}
// var artist;
// var title;
//var count;
//MusicDB.getAll().then(displaySongs);
function displaySongs(Songs) {
  document.getElementById("list-output").innerText = "";

  if (Songs.length > 0) {
    Songs.forEach((Song) => {
      songList(Song);
    });
  } else {
    displayNotFound();
  }
}
function songList(Song) {
  //alert("yyyyyy");
  console.log("this");
  //const title = document.getElementById("song-title").value;
  // // if (title) {
  // //   MusicDB.getBytitle(title).then(displaySongs).catch(displayErrorMessage);
  // // } else {
  // //   MusicDB.getAll().then(displaySongs).catch(displayErrorMessage);
  // // }
  //const artist = document.getElementById("song-artist").value;

  // Validates the user input.

  // if (!title) {
  //   alert("The title field is required.");
  // }

  // if (!artist) {
  //   alert("The Artist field is required.");
  // } else {
  const elemSong = document.createElement("div");
  elemSong.className = "song-item";
  document.getElementById("list-output").append(elemSong);

  // Includes the artist.
  const elemArtist = document.createElement("h2");
  elemArtist.innerText = Song.artist;
  elemSong.append(elemArtist);

  // Includes the title.
  const elemTitle = document.createElement("h3");
  elemTitle.innerText = Song.title;
  elemSong.append(elemTitle);

  // const elemRemLike = document.createElement("div");
  // elemRemLike.className = "remove-like";
  // document.getElementById("List-output").append(elemRemLike);

  //Include Remove Button
  // const removeButton = document.createElement("button");
  // removeButton.className = "remove-Button";
  // removeButton.innerText = "remove";
  // elemSong.append(removeButton);

  // //Include Like Button
  // const LikeButton = document.createElement("button");
  // LikeButton.className = "likeButton";
  // LikeButton.id = "Like-Button";
  // LikeButton.innerText = "+1 Like";
  // elemSong.append(LikeButton);
  // document.getElementById("Like-Button").addEventListener("click", () => {
  //   console.log("Inside Like");
  //   const count = 0;
  //   const LikeCount = document.createElement("h4");
  //   LikeCount.className = "likeCount";
  //   LikeCount.id = "Like-Count";
  //   LikeCount.innerText = count + 1;
  //   console.log(LikeCount);
  //MusicDB.add(title, artist);
  //});
  //MusicDB.add(title, artist);
  renderRemoveButton(Song, elemSong);
  renderLikeButton(Song, elemSong);
}

function renderRemoveButton(Song, elemSong) {
  //Include Remove Button
  const removeButton = document.createElement("button");
  removeButton.className = "remove-Button";
  removeButton.innerText = "remove";
  elemSong.append(removeButton);

  removeButton.addEventListener("click", () => {
    //alert("hie");
    MusicDB.delete(Song.id)
      .then(() => {
        console.log("inside delete");
        elemSong.remove();
      })
      .catch((error) => {
        console.log("Failed to remove", error);
      });
  });
}

function renderLikeButton(Song, elemSong) {
  //Include Like Button
  const LikeButton = document.createElement("button");
  LikeButton.className = "likeButton";
  LikeButton.id = "Like-Button";
  LikeButton.innerText = "+1 Like";
  elemSong.append(LikeButton);

  LikeButton.addEventListener("click", () => {
    // Includes the Like Count.

    const LikeCount = document.createElement("h4");
    LikeCount.innerText = Song.count;
    LikeCount.className = "Like";
    elemSong.append(LikeCount);

    // Includes the status label.
    const elemStatusLabel = document.createElement("span");
    elemStatus.append(elemStatusLabel);
    writeStatusLabel(elemStatusLabel, game.hasFinished);

    renderUpdateButton(game, elemGame, elemStatusLabel);
  });
}
/**
 * Displays an error message.
 */
function displayErrorMessage(error) {
  document.getElementById("list-output").innerHTML = `
    <div class='game-failure'>
      Failed to list the Songs.
      <span>${error}</span>
    </div>
  `;
}

/**
 * Displays a 'not found' message.
 */
function displayNotFound() {
  document.getElementById("list-output").innerHTML = `
    <div class='game-not-found'>
      No Songs was found in the database.
    </div>
  `;
}

/**
 * Displays an error message before the list.
 */
// function displayFailureMessage(message, description) {
//   //messageOutput.innerHTML = `
//     <div class='song-failure'>
//       ${message}
//       <span>${description}</span>
//     </div>
//   `;
// }
console.log(window.navigator);
console.log(window.navigator.serviceWorker);
console.log("navigator", navigator);
