function sortData() {
    console.log("Function called"); // This line helps to check if the function is called when the button is clicked
    const rawData = document.getElementById('dataInput').value; // This gets the raw data from the textarea
    console.log(rawData); // This line helps to check what raw data was captured
    const lines = rawData.split('\n'); // This splits the raw data into lines

    // Initialize the data structure to hold sorted entries for each key type
    const sortedData = {
        ':chaoskey:': [],
        ':goldkey:': [],
        ':silverkey:': [],
        ':bronzekey:': [],
        'noKey': []
    };

    // Iterate over each line of data
    lines.forEach(line => {
        const parts = line.split('·');
        if (parts.length > 1) { // Check if the line contains a key
            const name = parts[0].trim();
            const details = parts[1].trim().split(' ');
            const keyType = details[0]; // The key type, e.g., ":chaoskey:"
            const kaValue = parseInt(details[details.length - 2]); // The 'ka' value for sorting

            if (sortedData.hasOwnProperty(keyType)) {
                sortedData[keyType].push({ name, ka: kaValue, full: line.trim() });
            }
        } else {
            // Handle entries with no keys
            const parts = line.trim().split(' ');
            const kaValue = parseInt(parts[parts.length - 2]); // The 'ka' value for sorting, assuming 'ka' is always at the second last position
            if (!isNaN(kaValue)) { // Check if kaValue is a number
                sortedData['noKey'].push({ name: line.trim(), ka: kaValue, full: line.trim() });
            }
        }
    });

    // Sort each key type array by the 'ka' value in descending order
    Object.keys(sortedData).forEach(key => {
        sortedData[key].sort((a, b) => b.ka - a.ka);
        const boxId = key.replace(':', '') + 'Box'; // Format the key type to match the HTML element id
        const box = document.getElementById(boxId);
        box.innerHTML = ''; // Clear the box before adding sorted entries

        // Add sorted entries to the box
        sortedData[key].forEach(item => {
            const p = document.createElement('p');
            p.textContent = item.full;
            box.appendChild(p);
        });
    });
}
