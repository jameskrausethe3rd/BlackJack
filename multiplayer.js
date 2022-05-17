import { getPlayerCards } from "./player.js";

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
    let numPlayers = 0;
    
    const playerNameInput = document.querySelector("#player-name")
    const playerHandContainer = document.getElementById("playerHand")
    
    function addPlayerCardFirebase() {
        var cards = {}
        var obj = {}
        var hand = getPlayerCards()
        hand.forEach((card, index) => {
            var cardNum = ("card" + (index+1))
            obj[cardNum] = card
        })
        cards["cardsInHand"] = obj
        playerRef.update(cards)
        
    }
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
                const cardDivs = el.querySelector(".playerNameContent")

                //Update counter
                var counter = document.getElementById("currentPlayers");
                counter.innerText = "Current Players: " + numPlayers

                //If the cardsInHand element exists:
                if (playerState.cardsInHand){
                    var obj = playerState.cardsInHand
                    Object.keys(obj).forEach(key => {
                        if(!el.querySelector("#" + key)){
                            var img = document.createElement("img")
                            img.setAttribute('id', key)
                            img.src = "imgs/cards/" + obj[key] + ".png";  
                            cardDivs.appendChild(img)   
                        }
                      }); 
                } else if (!playerState.cardsInHand) {
                    var images = el.getElementsByTagName('img');
                    var l = images.length;
                    for (var i = 0; i < l; i++) {
                        images[0].parentNode.removeChild(images[0]);
                    }
                }     
            });
        })
        allPlayersRef.on("child_added", (snapshot) => {
            //When a new node is added
            //ie: New player joins

            const addedPlayer = snapshot.val();
            const playerElement = document.createElement("div");

            numPlayers += 1;

            if (addedPlayer.id == playerID) {
                playerElement.classList.add("you")
            }
            playerElement.innerHTML = (`
                <div class="playerNameContainer collapsible">
                    <span class="playerName"></span>
                    <div class="playerNameContent"></div>
                </div>`
            );
            playerElements[addedPlayer.id] = playerElement;
            playerElement.querySelector(".playerName").innerText = addedPlayer.name;
            playerListContainer.appendChild(playerElement);

            //Create collapsible event listeners for drop down
            var coll = document.getElementsByClassName("collapsible");
            for (let i = 0; i < coll.length; i++) {
                if(coll[i].getAttribute('listener') !== 'true') {
                    coll[i].setAttribute('listener', 'true');
                    coll[i].addEventListener("click", function() {
                        this.classList.toggle("active");
                        var child = this.firstChild;
                        var content = child.nextElementSibling.nextElementSibling
                        if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.height = content.scrollHeight + "px";
                        }
                    });
                }
            } 

        })

        //Remove name of player that has left
        allPlayersRef.on("child_removed", (snapshot) => {
            const removedKey = snapshot.val().id;

            playerListContainer.removeChild(playerElements[removedKey]);
            delete playerElements[removedKey];

            numPlayers -= 1;
        })

        //Change the player name
        playerNameInput.addEventListener("change", (e) => {
            const currentUser = auth.currentUser
            const newName = e.target.value || createName();
            playerNameInput.value = newName;

            if(!currentUser.isAnonymous){
                currentUser.updateProfile({
                    displayName: newName
                  })
            }
            playerRef.update({
                name: newName
            })
        })

        //Add the player card
        playerHandContainer.addEventListener("DOMNodeInserted", (e) =>{
            if(e.target.className == "cardHolder") {
               addPlayerCardFirebase()
            }
        })

        //Resets cards in hand
        document.getElementById('restart').addEventListener("click", () => {
            playerRef.update({
                cardsInHand : null})
            });
        document.getElementById('quit').addEventListener("click", () => {
            playerRef.update({
                cardsInHand : null})
            });
    }
    auth.onAuthStateChanged((user) => {
        if (user) {
            let name
            playerID = user.uid;
            playerRef = firebase.database().ref(`players/${playerID}`);

            if (!user.isAnonymous){
                if (user.displayName){
                    name = user.displayName;
                } else {
                    name = createName();
                    user.updateProfile({
                        displayName: name
                      })
                }
                playerNameInput.value = name;
            } else{
                name = createName();
                playerNameInput.value = name;
            }
            playerRef.set({
                id: playerID,
                name,
                handVal: 0
            })
            playerRef.onDisconnect().remove();

            initGame();

        } else {
            console.log("You're not logged in!")
                firebase.auth().signInAnonymously().catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                //..
                console.log(errorCode, errorMessage);
            });
        }
    })

})();