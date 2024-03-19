function sortData() {
    const rawData = document.getElementById('dataInput').value;
    const lines = rawData.split('\n');

    const sortedData = {
        ':chaoskey:': [],
        ':goldkey:': [],
        ':silverkey:': [],
        ':bronzekey:': [],
        'noKey': []
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
        const boxId = `box${key.replace(/:/g, '').charAt(0).toUpperCase() + key.slice(1).replace(/:/g, '')}`; // e.g., boxChaos
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
        const boxId = `box${cat}`;
        const entries = document.getElementById(boxId).getElementsByTagName('p');
        for (let i = 0; i < entries.length; i++) {
            allEntries.push({
                text: entries[i].textContent,
                ka: parseInt(entries[i].textContent.match(/(\d+) ka$/)[1]),
                html: entries[i].outerHTML
            });
        }
    });

    const topOverall = document.getElementById('topOverall');
    topOverall.innerHTML = '';
    allEntries.sort((a, b) => b.ka - a.ka).slice(0, number).forEach(entry => {
        topOverall.innerHTML += entry.html;
    });
}
