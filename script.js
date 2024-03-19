// Initialize sortedData as an empty object
let sortedData = {};

function sortData() {
    const rawData = document.getElementById('dataInput').value;
    const lines = rawData.split('\n');

    // Reset sortedData before populating it with new data
    sortedData = {
        ':chaoskey:': [],
        ':goldkey:': [],
        ':silverkey:': [],
        ':bronzekey:': [],
        'noKey': []
    };

    // Mapping of key types to new box IDs
    const keyToBoxId = {
        ':chaoskey:': 'boxChaos',
        ':goldkey:': 'boxGold',
        ':silverkey:': 'boxSilver',
        ':bronzekey:': 'boxBronze',
        'noKey': 'boxNone'
    };

    lines.forEach(line => {
        const parts = line.split('·');
        if (parts.length > 1) {
            const name = parts[0].trim();
            const details = parts[1].trim().split(' ');
            const keyType = details[0];
            const kaValue = parseInt(details[details.length - 2]);

            if (sortedData.hasOwnProperty(keyType)) {
                sortedData[keyType].push({ name, ka: kaValue, full: line.trim() });
            }
        } else {
            const nameParts = line.trim().split(' ');
            const kaValue = parseInt(nameParts[nameParts.length - 2]);
            if (!isNaN(kaValue)) {
                sortedData['noKey'].push({ name: line.trim(), ka: kaValue, full: line.trim() });
            }
        }
    });

    Object.keys(sortedData).forEach(key => {
        sortedData[key].sort((a, b) => b.ka - a.ka);
        const boxId = keyToBoxId[key]; // Use the new mapping to get the correct box ID
        const box = document.getElementById(boxId);
        if (box !== null) {
            box.innerHTML = '';
            sortedData[key].forEach(item => {
                const p = document.createElement('p');
                p.textContent = item.full;
                box.appendChild(p);
            });
        } else {
            console.error('Element not found:', boxId);
        }
    });
}

function displayOverallTop() {
    // Ensure sortedData is initialized
    if (Object.keys(sortedData).length === 0) {
        console.error('sortedData is not initialized. Call sortData() first.');
        return;
    }

    const number = document.getElementById('inputOverall').value;
    const categories = ['Chaos', 'Gold', 'Silver', 'Bronze', 'None'];
    const selectedCategories = categories.filter(cat => document.getElementById(`check${cat}`).checked);
    const allEntries = [];

    selectedCategories.forEach(cat => {
        if (cat === 'None') {
            sortedData['noKey'].forEach(entry => {
                allEntries.push({
                    text: entry.full,
                    ka: entry.ka
                });
            });
        } else {
            const key = `:${cat.toLowerCase()}key:`; // This matches the key format in sortedData
            const entries = sortedData[key] || [];
            entries.slice(0, number).forEach(entry => {
                allEntries.push({
                    text: entry.full,
                    ka: entry.ka
                });
            });
        }
    });

    allEntries.sort((a, b) => b.ka - a.ka); // Sort all collected entries by ka value

    const topBox = document.getElementById('topOverallResults'); // Ensure this matches your HTML
    topBox.innerHTML = ''; // Clear previous content
    const list = document.createElement('ul');
    allEntries.slice(0, number).forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry.text;
        list.appendChild(listItem);
    });
    topBox.appendChild(list);
    topBox.style.display = 'block'; // Make the results box visible
}
// Function to copy the content of the top overall results to the clipboard
function copyTopResults() {
    const topResults = document.getElementById('topOverallResults');
    const entries = topResults.getElementsByTagName('li');
    let topResultsText = '';

    // Iterate over each list item and append its text content with a space character
    for (let i = 0; i < entries.length; i++) {
        topResultsText += entries[i].textContent + ' '; // Add a space after each list item
    }

    // Copy text to clipboard
    navigator.clipboard.writeText(topResultsText)
        .then(() => {
            // Success message
            alert('Top results copied to clipboard!');
        })
        .catch(err => {
            // Error message
            console.error('Could not copy text: ', err);
        });

    // Open pop-up window with the link
    window.open('https://mudae-tools.gustavbylund.se/split-list/', '_blank');
}
