function sortData() {
    console.log("Function called"); // Check if function is called
    const rawData = document.getElementById('dataInput').value;
    console.log(rawData); // Check if data is being read correctly
    const rawData = document.getElementById('dataInput').value;
    // Split the raw data into lines
    const lines = rawData.split('\n');

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
        // Split the line into parts
        const parts = line.split('·');
        const name = parts[0].trim();
        // Check if the line contains a key
        if (parts.length > 1) {
            const details = parts[1].trim().split(' ');
            const keyType = details[0]; // The key type, e.g., ":chaoskey:"
            const kaValue = parseInt(details[2]); // The 'ka' value for sorting

            // Add the entry to the corresponding key type array
            if (sortedData.hasOwnProperty(keyType)) {
                sortedData[keyType].push({ name, ka: kaValue, full: line });
            }
        } else {
            // If there is no key, it goes into the 'noKey' category
            const kaValue = parseInt(name.split(' ')[name.split(' ').length - 2]); // Get the 'ka' value for sorting
            sortedData['noKey'].push({ name: name, ka: kaValue, full: line });
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
