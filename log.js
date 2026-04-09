document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workoutList");
    const workoutForm = document.getElementById("workoutForm");
    const printButton = document.getElementById("printSummaryButton");

    function updateSummary() {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        
        let totalWorkouts = workouts.length;
        let totalCalories = workouts.reduce((sum, workout) => sum + Number(workout.calories), 0); 
        let totalMinutes = workouts.reduce((sum, workout) => sum + Number(workout.duration), 0); 
        let avgDuration = totalWorkouts > 0 ? (totalMinutes / totalWorkouts).toFixed(2) : 0;
        let avgCalories = totalWorkouts > 0 ? (totalCalories / totalWorkouts).toFixed(2) : 0;

        workoutList.innerHTML = `
            <h3>Logged Workouts</h3>
            <p><strong>Total Workouts Logged:</strong> ${totalWorkouts}</p>
            <p><strong>Total Calories Burned:</strong> ${totalCalories} kcal</p>
            <p><strong>Average Workout Duration:</strong> ${avgDuration} minutes</p>
            <p><strong>Average Calories Burned Per Workout:</strong> ${avgCalories} kcal</p>
            <ul>
                ${workouts.map(workout => 
                    `<li>${workout.type} - ${workout.duration} min - ${workout.calories} kcal</li>`
                ).join("")}
            </ul>
        `;
    }

    workoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let workoutType = document.getElementById("workoutType").value.trim();
        let duration = parseFloat(document.getElementById("duration").value);
        let calories = parseFloat(document.getElementById("calories").value);
        let date = document.getElementById("date").value;

        if (!workoutType || isNaN(duration) || isNaN(calories) || duration <= 0 || calories <= 0) {
            alert("Please enter valid values for workout type, duration, and calories.");
            return;
        }

        let newWorkout = { 
            type: workoutType, 
            duration: Number(duration), 
            calories: Number(calories), 
            date 
        };

        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.push(newWorkout);
        localStorage.setItem("workouts", JSON.stringify(workouts));

        updateSummary();
        workoutForm.reset();
    });

    /**
     * Function to generate a printable workout summary and open the print dialog
     */
    function printWorkoutSummary() {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        
        if (workouts.length === 0) {
            alert("No workouts logged to print.");
            return;
        }

        let summaryWindow = window.open("", "", "width=800,height=600");
        summaryWindow.document.write(`
            <html>
            <head>
                <title>Workout Summary</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h2 { text-align: center; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin: 5px 0; }
                </style>
            </head>
            <body>
                <h2>Workout Summary</h2>
                <p><strong>Total Workouts Logged:</strong> ${workouts.length}</p>
                <p><strong>Total Calories Burned:</strong> ${workouts.reduce((sum, workout) => sum + Number(workout.calories), 0)} kcal</p>
                <p><strong>Average Workout Duration:</strong> ${(workouts.reduce((sum, workout) => sum + Number(workout.duration), 0) / workouts.length).toFixed(2)} minutes</p>
                <p><strong>Average Calories Burned Per Workout:</strong> ${(workouts.reduce((sum, workout) => sum + Number(workout.calories), 0) / workouts.length).toFixed(2)} kcal</p>
                <h3>Workout Log:</h3>
                <ul>
                    ${workouts.map(workout => 
                        `<li><strong>${workout.type}</strong> - ${workout.duration} min - ${workout.calories} kcal</li>`
                    ).join("")}
                </ul>
                <script>
                    window.onload = function() {
                        window.print();
                        window.close();
                    };
                </script>
            </body>
            </html>
        `);
        summaryWindow.document.close();
    }

    // Attach print button event listener
    printButton.addEventListener("click", printWorkoutSummary);

    updateSummary();
});
