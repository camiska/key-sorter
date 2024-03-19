function sortData() {
    const rawData = document.getElementById('dataInput').value;
    const lines = rawData.split('\n');

    // Initialize objects to hold sorted data for each key type.
    const sortedData = {
        ':chaoskey:': [],
        ':goldkey:': [],
        ':silverkey:': [],
        ':bronzekey:': [],
        'noKey': []
    };

    // Process each line of the input data.
    lines.forEach(line => {
        // Split the line into name and the rest.
        const parts = line.split('·');
        const name = parts[0].trim();
        if (parts.length > 1) {
            // If there is a key and value associated.
            let [keyWithCount, kaPart] = parts[1].trim().split(' ');
            const kaValue = parseInt(kaPart.split('ka')[0]); // Get the numerical value for sorting.
            const keyType = keyWithCount.split(' ')[0]; // Extract the key type, e.g., ':chaoskey:'.

            if (sortedData.hasOwnProperty(keyType)) {
                sortedData[keyType].push({ name, ka: kaValue, full: line });
            } else {
                // If no recognized key type is found, add to 'noKey'.
                sortedData['noKey'].push({ name, ka: kaValue, full: name + ' ' + kaPart });
            }
        } else {
            // If there is no key, assume no '·' was found and process accordingly.
            const kaValue = parseInt(name.split(' ')[name.split(' ').length - 2]); // Assumes format "Name XYZ ka".
            sortedData['noKey'].push({ name: name, ka: kaValue, full: line });
        }
    });

    // Sort each category by the ka value.
    Object.keys(sortedData).forEach(key => {
        sortedData[key].sort((a, b) => b.ka - a.ka); // Sort based on 'ka' value.
        const boxId = key.replace(':', '') + 'Box'; // Remove ':' from key to match HTML id.
        const box = document.getElementById(boxId);
        box.innerHTML = ''; // Clear existing content.
        sortedData[key].forEach(item => {
            const p = document.createElement('p');
            p.textContent = item.full;
            box.appendChild(p);
        });
    });
}
