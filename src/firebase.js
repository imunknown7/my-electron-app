const firebaseConfig = {
    apiKey: "AIzaSyBHz3SdCdLWpPZHHtT5LppL44faM-94AiM",
    authDomain: "vote-ballot.firebaseapp.com",
    projectId: "vote-ballot",
    storageBucket: "vote-ballot.appspot.com",
    messagingSenderId: "471438619978",
    appId: "1:471438619978:web:bf6197b3177b823664fdb3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// db.collection('users').get().then((snapshot) => {
// snapshot.docs.forEach(doc => {
//     // console.log(doc.data())
//     const userName = doc.data().admNum;
//     const userPass = doc.data().adhNum
//     console.log(userName, userPass)
//     let y = "0987"
//     let x = "1234"
//     if ( x == userName && y == userPass) {
//         console.log("Success")
//     }
//     else {
//         console.log("nope")
//     }
// });
// })


// Function to validate user credentials
function validateUser(admNum, adhNum) {
    // Retrieve user data from Firestore and check against input
    return db.collection('users').where('admNum', '==', admNum).where('adhNum', '==', adhNum)
        .get()
        .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            // User exists with provided credentials
            return true;
        } else {
            // No user found with provided credentials
            return false;
        }
        })
        .catch((error) => {
        console.error('Error validating user:', error);
        return false; // Return false in case of error
        });
}

    // Function to handle form submission
function handleSubmit(event) {
event.preventDefault();

const userName = document.getElementById('userName').value;
const userPass = document.getElementById('userPass').value;

// Perform validation
validateUser(userName, userPass)
    .then((isValid) => {
    if (isValid) {
        console.log("Login successful");
        window.location.href = 'dashboard.html';
        // Redirect to dashboard or perform further actions
    } else {
        console.log("Invalid credentials");
        alert("Invalid Credentials")
        window.location.reload()
        // Display error message or handle invalid credentials
    }
    })
    .catch((error) => {
    console.error('Error validating user:', error);
    });
}
