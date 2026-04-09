//workouts
let workouts = [
    { name: "Arm Raises", img: "Images/Arm Raises.png" },
    { name: "Elbow Plank", img: "Images/Elbow Plank.png" },
    { name: "Flutter Kicks", img: "Images/Flutter Kicks.png" },
    { name: "Gliding Mountain Climbers", img: "Images/Gliding Mountain Climbers.png" },
    { name: "Lunge", img: "Images/Lunge.png" },
    { name: "Plank", img: "Images/Plank.png" },
    { name: "Side Lunge", img: "Images/Side Lunge.png" },
    { name: "Side Plank", img: "Images/Side Plank.png" },
    { name: "Squats", img: "Images/Squats.png" },
    { name: "Weighted Bulgarian Split Squats", img: "Images/Weighted Bulgarian Split Squats.png" },
    { name: "Weighted Squats", img: "Images/Weighted Squats.png" }
];

// Motivational messages
const motivationalMessages = [
    "You're stronger than you think!",
    "Push yourself, because no one else is going to do it for you.",
    "Every workout counts. Keep going!",
    "Your only limit is your mind. Keep pushing!",
    "The pain you feel today will be the strength you feel tomorrow.",
    "One more rep, one more step! You got this!",
    "Stay dedicated, results will follow.",
    "You're doing great! Don't stop now!"
];

// load favorites from local Storage. If there are none use empty array
let favorites = JSON.parse(localStorage.getItem('favoriteWorkouts')) || [];

// render workouts
function renderWorkouts() {
    const list = document.getElementById('workoutList');
    list.innerHTML = '';

    // Sort workouts: favorites first
    const sortedWorkouts = [
        ...workouts.filter(w => favorites.includes(w.name)),
        ...workouts.filter(w => !favorites.includes(w.name))
    ];

    sortedWorkouts.forEach(workout => {
        const div = document.createElement('div');
        div.className = 'workout-item';
        div.innerHTML = `
            <img src="${workout.img}" alt="${workout.name}">
            <span>${workout.name}</span>
            <i class="fa fa-heart${favorites.includes(workout.name) ? '' : '-o'}" 
               onclick="toggleFavorite('${workout.name}')"></i>
        `;
        list.appendChild(div);
    });
}

// toggle favorite status
function toggleFavorite(workoutName) {
    const index = favorites.indexOf(workoutName);
    if (index === -1) {
        favorites.push(workoutName);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favoriteWorkouts', JSON.stringify(favorites));
    renderWorkouts();
}

// Menu functions
function showMenu() {
    document.getElementById("navLinks").style.right = "0";
}

function hideMenu() {
    document.getElementById("navLinks").style.right = "-200px";
}

// function to show a motivational message.
function showMotivation() {
    const messageElement = document.getElementById("motivationMessage");
    if (!messageElement) return; 

    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    messageElement.innerText = motivationalMessages[randomIndex];

  
    messageElement.style.opacity = 0;
    setTimeout(() => {
        messageElement.style.opacity = 1;
    }, 200);
}



    renderWorkouts(); 

    
    const motivationButton = document.getElementById("motivationButton");
    if (motivationButton) {
        motivationButton.addEventListener("click", showMotivation);
    }

