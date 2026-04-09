document.addEventListener("DOMContentLoaded", function () {
    const badgeContainer = document.getElementById("badgeContainer");

    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    function unlockBadge(name, imgSrc) {
        if (!achievements.find(ach => ach.name === name)) {
            achievements.push({ name, imgSrc });
            localStorage.setItem("achievements", JSON.stringify(achievements));
        }
        updateBadgeStatus();
    }

    function updateBadgeStatus() {
        const badges = badgeContainer.querySelectorAll(".badge");
        badges.forEach(badge => {
            const achievementName = badge.getAttribute("data-achievement");
            if (achievements.some(ach => ach.name === achievementName)) {
                badge.classList.add("completed");
            } else {
                badge.classList.remove("completed");
            }
        });
    }

    function checkForAchievements() {
        let totalWorkouts = parseInt(localStorage.getItem("totalWorkouts")) || 0;
        let totalCalories = parseInt(localStorage.getItem("totalCalories")) || 0;
        let consecutiveDays = parseInt(localStorage.getItem("consecutiveDays")) || 0;

        if (totalWorkouts >= 1) unlockBadge("First Workout Logged", "Images/day1.png");
        if (totalCalories >= 1000) unlockBadge("1000 Calories Burned", "Images/calories.jpg");
        if (totalWorkouts >= 13) unlockBadge("Half Marathon Completed", "Images/medal.jpg");
        if (totalWorkouts >= 5) unlockBadge("5K Run Completed", "Images/5k_medal.png");
        if (consecutiveDays >= 7) unlockBadge("Consistent Week", "Images/week_medal.png");
    }

    checkForAchievements();
    updateBadgeStatus();

    // For testing purposes
    // localStorage.setItem("totalWorkouts", 10);
    // localStorage.setItem("totalCalories", 1500);
    // localStorage.setItem("consecutiveDays", 7);
});

function setChallenge() {
    let challengeDate = document.getElementById("challengeDate").value;
    if (!challengeDate) {
        alert("Please select a date!");
        return;
    }

    localStorage.setItem("challengeDate", challengeDate);
    startCountdown();
}

function startCountdown() {
    let challengeDate = localStorage.getItem("challengeDate");
    if (!challengeDate) return;

    let targetDate = new Date(challengeDate).getTime();

    let countdown = setInterval(function () {
        let now = new Date().getTime();
        let timeLeft = targetDate - now;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

        if (timeLeft < 0) {
            clearInterval(countdown);
            document.getElementById("timerMessage").textContent = "🏆 Challenge Complete!";
        }
    }, 1000);
}

startCountdown();