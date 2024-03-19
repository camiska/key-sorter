// Declare sortedData outside of the functions to give it global scope
const sortedData = {
    ':chaoskey:': [],
    ':goldkey:': [],
    ':silverkey:': [],
    ':bronzekey:': [],
    'noKey': []
};

function sortData() {
    const rawData = document.getElementById('dataInput').value;
    const lines = rawData.split('\n');

    // Reset sortedData each time sortData is called to clear old entries
    Object.keys(sortedData).forEach(key => {
        sortedData[key] = [];
    });

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
        const boxId = `box${key.replace(':', '').charAt(0).toUpperCase() + key.slice(1).replace(':', '')}`; // Adjusted to correct box ID assignment
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
    const number = document.getElementById('inputOverall').value;
    const categories = ['Chaos', 'Gold', 'Silver', 'Bronze', 'None'];
    const selectedCategories = categories.filter(cat => document.getElementById(`check${cat}`).checked);
    const allEntries = [];

    selectedCategories.forEach(cat => {
        const key = `:${cat.toLowerCase()}key:`; // This matches the key format in sortedData
        const entries = sortedData[key] || [];
        entries.slice(0, number).forEach(entry => {
            allEntries.push({
                text: entry.full,
                ka: entry.ka
            });
        });
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
