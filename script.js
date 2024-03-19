function sortData() {
    const rawData = document.getElementById('dataInput').value;
    const lines = rawData.split('\n');

    const sortedData = {
        chaoskey: [],
        goldkey: [],
        silverkey: [],
        bronzekey: [],
        noKey: []
    };

    lines.forEach(line => {
        const parts = line.split('·');
        let key, kaValue, entry;
        if (parts.length > 1) {
            let [name, details] = parts;
            [key, kaValue] = details.split(' ').filter(part => part.includes('ka') || part.includes(':'));
            key = key.replace(/[:()]/g, ''); // Remove : and () from key for ID matching
            kaValue = parseInt(kaValue);
            entry = { name: name.trim(), ka: kaValue, full: line.trim() };
        } else {
            kaValue = parseInt(line.match(/(\d+)\ska/)[1]);
            key = 'noKey';
            entry = { name: line.trim(), ka: kaValue, full: line.trim() };
        }
        if (sortedData[key] !== undefined) {
            sortedData[key].push(entry);
        }
    });

    Object.entries(sortedData).forEach(([key, entries]) => {
        entries.sort((a, b) => b.ka - a.ka);
        const boxId = key + 'Box';
        const box = document.getElementById(boxId);
        if (box) {
            box.innerHTML = '<h3>' + key.charAt(0).toUpperCase() + key.slice(1) + ' Key</h3>'; // Reset box content and add title
            entries.forEach(entry => {
                const p = document.createElement('p');
                p.textContent = entry.full;
                box.appendChild(p);
            });
        } else {
            console.warn('Element not found for key:', key);
        }
    });
}
