import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

/**
 * MusicDB Interface using Firebase Firestore
 */
class MusicDB {
  constructor() {
    this.storeName = "SongList";
    this.isAvailable = false;
    this.db = null;
  }

  /**
   * Opens the database.
   */
  open() {
    return new Promise((resolve, reject) => {
      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyCaLQmpKiH8KrZrPSae7e3w2G1UBT1FEeA",
        authDomain: "my-pwa-d40e2.firebaseapp.com",
        projectId: "my-pwa-d40e2",
        storageBucket: "my-pwa-d40e2.appspot.com",
        messagingSenderId: "389645985610",
        appId: "1:389645985610:web:86a19b9c3f261b45cc03b3",
        measurementId: "G-Q7278TDSGP",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Cloud Firestore and get a reference to the service
      this.db = getFirestore(app);
      if (this.db) {
        this.isAvailable = true;
        resolve();
      } else {
        reject("The database is not available.");
      }
    });

    // Initialize Cloud Firestore and get a reference to the service
    //     this.db = getFirestore(app);
    //     if (this.db) {
    //       this.isAvailable = true;
    //       resolve();
    //     } else {
    //       reject("The database is not available.");
    //     }
    //   } catch (error) {
    //     reject(error.message);
    //   }
  }

  /**
   * Adds a new song to the database.
   */
  add(title, artist) {
    console.log("Song Add", title, artist);
    // Creates the Song object to be added.
    const Song = {
      title: title,
      artist: artist,
      //likeCount: likeCount,
    };

    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Connects to the Firebase collection.
        const dbCollection = collection(this.db, this.storeName);

        // Includes the new object to the collection.
        addDoc(dbCollection, Song)
          .then(() => {
            resolve(Song);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  //   add(likeCount) {
  //     console.log("Song Add", title, artist);
  //     // Creates the Song object to be added.
  //     const Song = {
  //       title: title,
  //       artist: artist,
  //       likeCount: likeCount,
  //     };

  //     return new Promise((resolve, reject) => {
  //       if (!this.isAvailable) {
  //         reject("The database is not available.");
  //         return;
  //       }

  //       try {
  //         // Connects to the Firebase collection.
  //         const dbCollection = collection(this.db, this.storeName);

  //         // Includes the new object to the collection.
  //         addDoc(dbCollection, Song)
  //           .then(() => {
  //             resolve(Song);
  //           })
  //           .catch((error) => {
  //             reject(error);
  //           });
  //       } catch (error) {
  //         reject(error.message);
  //       }
  //     });
  //   }

  /**
   * Retrieves a specific Songs.
   */
  get(id) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Get the document reference.
        const docRef = doc(this.db, this.storeName, id);

        // Retrives the document.
        getDoc(docRef)
          .then((docSnap) => {
            const data = docSnap.data();
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  /**
   * Retrieves all Songs from the database.
   */
  getAll() {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Connects to the Firebase collection.
        const dbCollection = collection(this.db, this.storeName);

        // Gets the date form the collection.
        getDocs(dbCollection)
          .then((querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              result.push({
                ...data,
                id: doc.id,
              });
            });

            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  getByTitle(title) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Connects to the Firebase collection.
        const dbCollection = collection(this.db, this.storeName);

        // Creates a query for the collection.
        const dbQuery = query(dbCollection, where("title", "==", title));

        // Gets the date from the query.
        getDocs(dbQuery)
          .then((querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              result.push({
                ...data,
                id: doc.id,
              });
            });

            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  getByArtist(artist) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Connects to the Firebase collection.
        const dbCollection = collection(this.db, this.storeName);

        // Creates a query for the collection.
        const dbQuery = query(dbCollection, where("artist", "==", artist));

        // Gets the date from the query.
        getDocs(dbQuery)
          .then((querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              result.push({
                ...data,
                id: doc.id,
              });
            });

            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  update(updatedLikeCount) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Get the document reference.
        const docRef = doc(this.db, this.storeName, updatedLikeCount.id);

        // Updates the document.
        updateDoc(docRef, {
          likeCount: updatedLikeCount.likeCount,
        })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  /**
   * Removes an entry from the database.
   */
  delete(SongId) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("The database is not available.");
        return;
      }

      try {
        // Get the document reference.
        const docRef = doc(this.db, this.storeName, SongId);

        // Deletes the document.
        deleteDoc(docRef)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }
}

export default new MusicDB();
