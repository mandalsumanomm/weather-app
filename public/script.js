document.getElementById('locationButton').addEventListener('click', () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetch(`/location?lat=${latitude}&lon=${longitude}`)
              .then(response => response.json())
              .then(data => {
                  if (data.error) {
                      alert(data.error);
                  } else {
                      window.location.reload();
                  }
              })
              .catch(error => console.error('Error fetching weather data:', error));
      }, error => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
      });
  } else {
      alert('Geolocation is not supported by this browser.');
  }
});

// Function to update current date and time
const updateDateTime = () => {
  const currentDateElement = document.getElementById('currentDate');
  const currentTimeElement = document.getElementById('currentTime');

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-US', options);
  const currentTime = new Date().toLocaleTimeString('en-US');

  currentDateElement.textContent = currentDate;
  currentTimeElement.textContent = currentTime;
};

// Update current date and time immediately when the page loads
updateDateTime();

// Update current date and time periodically every second
setInterval(updateDateTime, 1000);
