document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById('icon');
    const output = document.querySelector(".output");
    const dateElement = document.querySelector('.date');
    const dayElement = document.querySelector('.day');

    // Function to fetch and display a new quote
    function fetchNewQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                const { content, author } = data;
                output.textContent = `"${content} - ${author}"`;
            })
            .catch(error => {
                console.log('Error Fetching quote', error);
            });
    }

    // Function to update the icon based on the current hour
    const container = document.querySelector('.container');
    function updateIcon(hour) {
        if (hour >= 6 && hour < 12) {
            // Morning icon
            icon.innerHTML = '<i class="fas fa-sun"></i>';

        } else if (hour >= 12 && hour < 18) {
            // Afternoon icon
            icon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
            
        } else {
            // Evening/Night icon
            icon.innerHTML = '<i class="fas fa-moon"></i>';
            
        }
    }
    
    // Get the current hour
    const currentHour = new Date().getHours();
    // Update the icon
    updateIcon(currentHour);

    // Initial fetch and update
    fetchNewQuote();

    // Fetch a new quote and update every minute
    setInterval(() => {
        fetchNewQuote();
        const currentHour = new Date().getHours();
        updateIcon(currentHour);
    }, 60000); // 60000 milliseconds = 1 minute

    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    // Function to get the current day
    function getCurrentDay() {
        const d = new Date();
        const dayIndex = d.getDay();
        return days[dayIndex];
    }

    // Function to get the current date
    function getCurrentDate() {
        const d = new Date();
        const date = d.getDate();
        const monthIndex = d.getMonth();
        const year = d.getFullYear();
        const month = months[monthIndex];
        return `${date} ${month} ${year}`;
    }

    // Set the current date and day
    dateElement.textContent = getCurrentDate();
    dayElement.textContent = getCurrentDay();
});
