const signUpForm = document.querySelector('#signup-form')
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.getElementById("signUpModal");
        modal.style.display = "none"; 
        signUpForm.reset();
    })

});

//logout method
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    const user = auth.currentUser
    const playerID = user.uid;
    const playerRef = firebase.database().ref(`players/${playerID}`);
    playerRef.remove()

    auth.signOut().then(() => {
        console.log("User logged out")
        location.reload()
    })
})

//login
const login = document.querySelector('#login-form')
login.addEventListener('submit', (e) => {
    e.preventDefault();

    //user info
    const email = login['login-email'].value;
    const password = login['login-password'].value;

    //login user
    const user = auth.currentUser
    const playerID = user.uid;
    const playerRef = firebase.database().ref(`players/${playerID}`);
    playerRef.remove()

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        location.reload()
        const modal = document.getElementById("loginModal");
        modal.style.display = "none"; 
        login.reset();
    })
})