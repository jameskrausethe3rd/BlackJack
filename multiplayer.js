function randomFromArray (array) {
    return array[Math.floor(Math.random() * array.length)];
}

function createName() {
    const prefix = randomFromArray(["other", "new", "good", "high", "old", "great", "big", "American", "small", "large", "national", "young", "different", "black", "long", "little", "important", "political", "bad", "white", "real", "best", "right", "social", "only", "public", "sure", "low", "early", "able", "human", "local", "late", "hard", "major", "better", "economic", "strong", "possible", "whole", "free", "military", "true", "federal", "international", "full", "special", "easy", "clear", "recent", "certain", "personal", "open", "red", "difficult", "available", "likely", "short", "single", "medical", "current", "wrong", "private", "past", "foreign", "fine", "common", "poor", "natural", "significant", "similar", "hot", "dead", "central", "happy", "serious", "ready", "simple", "left", "physical", "general", "environmental", "financial", "blue", "democratic", "dark", "various", "entire", "close", "legal", "religious", "cold", "final", "main", "green", "nice", "huge", "popular", "traditional", "cultural", "GUNG", "MID", "TRASHY", "TOXIC", "SCUMMY", "HOT"]).toUpperCase();
    const animal = randomFromArray(["BEAR", "CAT", "DOG", "PANGOLIN", "PANDA", "GIRAFFE"]);

    return `${prefix} ${animal}`;
}


(function () {

    let playerID;
    let playerRef;
    let players = {};
    let playerElements = {};

    function initGame() {
        const allPlayersRef = firebase.database().ref(`players`);
        const playerListContainer = document.getElementById("playerList")
    
        allPlayersRef.on("value", (snapshot) => {
            //When a change happens
            players = snapshot.val() || {};
            Object.keys(players).forEach((key) => {
                const playerState = players[key];
                let el = playerElements[key];

                el.querySelector(".playerName").innerText = playerState.name;
            });

        })
        allPlayersRef.on("child_added", (snapshot) => {
            //When a new node is added
            //ie: New player joins
    
            const addedPlayer = snapshot.val();
            const playerElement = document.createElement("div");
    
            if (addedPlayer.id == playerID) {
                playerElement.classList.add("you")
            }
            playerElement.innerHTML = (`
                <div class="playerNameContainer">
                    <span class="playerName"></span>
                    <img src="imgs/card.png" width="10%">
                </div>`
            );
            playerElements[addedPlayer.id] = playerElement;
            playerElement.querySelector(".playerName").innerText = addedPlayer.name;
            playerListContainer.appendChild(playerElement);
        })

        //Remove name of player that has left
        allPlayersRef.on("child_removed", (snapshot) => {
            const removedKey = snapshot.val().id;

            playerListContainer.removeChild(playerElements[removedKey]);
            delete playerElements[removedKey];
        })
    }

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            console.log("You're logged in!")
            playerID = user.uid;
            playerRef = firebase.database().ref(`players/${playerID}`);

            const name = createName();

            playerRef.set({
                id: playerID,
                name,
                card1: null,
                card2: null,
                card3: null,
                card4: null,
                card5: null,
                handVal: 0
            })

            playerRef.onDisconnect().remove();

            initGame();

        } else {
            console.log("You're not logged in!")
        }
    })
    
    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        //..
        console.log(errorCode, errorMessage);
    });

})();