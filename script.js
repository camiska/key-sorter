function sortData() {
    console.log('sortData function has been called.'); // Confirm function is called

    // Test the connection to each box individually
    const boxIds = ['chaoskeyBox', 'goldkeyBox', 'silverkeyBox', 'bronzekeyBox', 'noKeyBox'];
    boxIds.forEach(boxId => {
        const box = document.getElementById(boxId);
        console.log(`${boxId}:`, box); // This should log the HTML element, not null
        if (box) {
            box.innerHTML = `<p>Test content for ${boxId}</p>`; // Should apply if the element is correctly found
        } else {
            console.error('Element not found:', boxId); // Helps identify which box is missing or misnamed
        }
    });
}
