function sortData() {
    console.log('sortData function has been called.');

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
            const rest = parts[1].trim().split(' ');
            const keyType = rest[0]; // like ':chaoskey:'
            const kaValue = parseInt(rest[rest.length - 2]);

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
        const cleanKey = key.replace(/:/g, ''); // Remove colons
        const boxId = `${cleanKey}Box`; // Form the ID
        const box = document.getElementById(boxId);

        if (box) {
            box.innerHTML = ''; // Clear previous entries
            sortedData[key].sort((a, b) => b.ka - a.ka); // Sort the data
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
