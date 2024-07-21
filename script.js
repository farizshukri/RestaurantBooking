// Function to convert form data to CSV format
function convertFormDataToCSV(formData) {
    const entries = formData.entries();
    let csvContent = '';

    for (const pair of entries) {
        csvContent += `${pair[0]},${pair[1]}\n`;
    }

    return csvContent;
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Basic form validation (you can add more complex validation here)
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let guests = document.getElementById('guests').value;

    if (name === '' || email === '' || date === '' || time === '' || guests === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Create FormData object and append form data
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Date', date);
    formData.append('Time', time);
    formData.append('Guests', guests);

    // Convert FormData to CSV format
    const csvContent = convertFormDataToCSV(formData);

    // Create a Blob object to save CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element to download the CSV file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'booking_info.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Automatically click the link to download the CSV file
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    // Optionally, reset the form after submission
    this.reset();
});
