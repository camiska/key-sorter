function sortData() {
    console.log('sortData function has been called.');

    const boxIds = ['chaoskeyBox', 'goldkeyBox', 'silverkeyBox', 'bronzekeyBox', 'noKeyBox'];
    boxIds.forEach(boxId => {
        const box = document.getElementById(boxId);
        console.log(`${boxId}:`, box);
        if (box) {
            box.innerHTML = `<p>Test content for ${boxId}</p>`;
        } else {
            console.error('Element not found:', boxId);
        }
    });
}
