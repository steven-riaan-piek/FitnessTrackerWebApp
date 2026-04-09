document.addEventListener("DOMContentLoaded", function () {
    // Grab all the important elements from the HTML
    const goalForm = document.getElementById("goalForm");
    const goalName = document.getElementById("goalName");
    const goalTarget = document.getElementById("goalTarget");
    const goalUnit = document.getElementById("goalUnit");

    const goalDisplayName = document.getElementById("goalDisplayName");
    const goalDisplayTarget = document.getElementById("goalDisplayTarget");
    const goalProgressBar = document.getElementById("progress");
    const goalProgressText = document.getElementById("goalProgressText");
    const message = document.getElementById("message");

    const progressInput = document.getElementById("progressInput");

    // Get saved goal & progress from local storage, if they exist
    let currentGoal = JSON.parse(localStorage.getItem("currentGoal")) || null;
    let currentProgress = localStorage.getItem("currentProgress") 
        ? parseFloat(localStorage.getItem("currentProgress")) 
        : 0;  // If there's no saved progress, just start at 0

    /**
     * Updates the goal display so users know how far they've gotten
     */
    function updateGoalDisplay() {
        if (currentGoal) {
            // Show the goal name and target amount
            goalDisplayName.textContent = `Goal: ${currentGoal.name}`;
            goalDisplayTarget.textContent = `Target: ${currentGoal.target} ${currentGoal.unit}`;

            // Calculate how much progress they’ve made (as a percent)
            let progressPercent = (currentProgress / currentGoal.target) * 100;
            progressPercent = Math.min(progressPercent, 100); // Don’t go over 100%

            // Update the progress bar (because it looks cool)
            goalProgressBar.style.width = progressPercent + "%";
            goalProgressText.textContent = `Progress: ${progressPercent.toFixed(2)}%`;

            // Show some motivation based on progress level
            if (progressPercent >= 100) {
                message.textContent = "Wooo! You made it! 🎉";
            } else if (progressPercent >= 50) {
                message.textContent = "You're past halfway! Keep pushing!";
            } else if (progressPercent > 0) {
                message.textContent = "You're on your way! Keep it up!";
            } else {
                message.textContent = "Set a goal and start tracking your progress!";
            }
        } else {
            // If no goal has been set, just show a default message
            goalDisplayName.textContent = "No goal set yet";
            goalDisplayTarget.textContent = "Target: 0";
            goalProgressBar.style.width = "0%";
            goalProgressText.textContent = "Progress: 0%";
            message.textContent = "Set a goal and start tracking your progress!";
        }
    }

    /**
     * Handles when the user submits a new goal
     */
    goalForm.addEventListener("submit", function (event) {
        event.preventDefault();  // Stops page from refreshing

        // Store the user's goal
        currentGoal = {
            name: goalName.value,
            target: parseFloat(goalTarget.value),
            unit: goalUnit.value
        };

        currentProgress = 0;  // Reset progress whenever they create a new goal

        // Save everything in localStorage so it sticks around
        localStorage.setItem("currentGoal", JSON.stringify(currentGoal));
        localStorage.setItem("currentProgress", currentProgress);

        // Refresh the goal display
        updateGoalDisplay();
        goalForm.reset(); // Clear the form fields
    });

    /**
     * Lets the user update their progress
     */
    function updateProgress() {
        let addedProgress = parseFloat(progressInput.value);

        // Make sure they actually entered a number that makes sense
        if (!isNaN(addedProgress) && addedProgress > 0 && currentGoal) {
            currentProgress += addedProgress; // Add progress to the total

            localStorage.setItem("currentProgress", currentProgress); // Save the new progress
            updateGoalDisplay(); // Update the screen

            progressInput.value = ""; // Clear input field after submission
        } else {
            alert("Uhh, that doesn’t look like a valid number. Try again.");
        }
    }

    // Show the saved goal info when the page loads
    updateGoalDisplay();

    // Expose updateProgress so it can be called from a button or somewhere else
    window.updateProgress = updateProgress;
});
