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
        const [name, rest] = line.split('·');
        if (rest) {
            const [key, ka] = rest.split('ka').map(part => part.trim());
            const [keyType, kaValue] = [key.slice(0, -4), parseInt(ka)];
            if (sortedData[keyType]) {
                sortedData[keyType].push({ name, ka: kaValue, full: line });
            } else {
                sortedData['noKey'].push({ name, ka: kaValue, full: line });
            }
        } else {
            sortedData['noKey'].push({ name, ka: null, full: line });
        }
    });

    Object.keys(sortedData).forEach(key => {
        sortedData[key].sort((a, b) => b.ka - a.ka);
        const boxId = key + 'Box';
        const box = document.getElementById(boxId.replace(':', ''));
        box.innerHTML = '';
        sortedData[key].forEach(item => {
            const p = document.createElement('p');
            p.textContent = item.full;
            box.appendChild(p);
        });
    });
}
