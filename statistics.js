var navLinks = document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right = "0";
}
function hideMenu(){
    navLinks.style.right = "-200px";
}

//Move the statistics script inline or keep as separate file 

// Workout data storage
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// Chart instances
let workoutChart, typeChart;

// Initialize charts
function initCharts() {
    // Line Chart for Calories Trend
    const workoutCtx = document.getElementById('workoutChart').getContext('2d');
    workoutChart = new Chart(workoutCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Calories Burned',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Calories' }
                },
                x: {
                    title: { display: true, text: 'Date' }
                }
            }
        }
    });

    // Pie Chart for Workout Types
    const typeCtx = document.getElementById('typeChart').getContext('2d');
    typeChart = new Chart(typeCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Update statistics and charts
function updateStats() {
    // Summary stats
    document.getElementById('totalWorkouts').textContent = workouts.length;
    const totalCalories = workouts.reduce((sum, w) => sum + Number(w.calories), 0);
    document.getElementById('totalCalories').textContent = totalCalories;
    const avgDuration = workouts.length ? 
        (workouts.reduce((sum, w) => sum + Number(w.duration), 0) / workouts.length).toFixed(1) : 0;
    document.getElementById('avgDuration').textContent = avgDuration;

    // Update line chart
    workoutChart.data.labels = workouts.map(w => w.date);
    workoutChart.data.datasets[0].data = workouts.map(w => w.calories);
    workoutChart.update();

    // Update pie chart
    const typeCount = workouts.reduce((acc, w) => {
        acc[w.type] = (acc[w.type] || 0) + 1;
        return acc;
    }, {});
    typeChart.data.labels = Object.keys(typeCount);
    typeChart.data.datasets[0].data = Object.values(typeCount);
    typeChart.update();
}

// Form submission
document.getElementById('workoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const workout = {
        type: document.getElementById('workoutType').value,
        duration: document.getElementById('duration').value,
        calories: document.getElementById('calories').value,
        date: document.getElementById('date').value
    };
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    updateStats();
    e.target.reset();
});

// Initial setup
window.onload = () => {
    initCharts();
    updateStats();
};