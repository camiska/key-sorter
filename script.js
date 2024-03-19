function sortData() {
    // Basic test for function call
    console.log('sortData function has been called.');

    // Test if we can access the HTML elements
    const inputBox = document.getElementById('dataInput');
    console.log('Data Input Box:', inputBox); // This should not be null

    const testBoxes = ['chaoskeyBox', 'goldkeyBox', 'silverkeyBox', 'bronzekeyBox', 'noKeyBox'];
    testBoxes.forEach(boxId => {
        const box = document.getElementById(boxId);
        console.log(`${boxId}:`, box); // None of these should be null
        if (box) {
            box.innerHTML = `<p>Test content for ${boxId}</p>`; // Simple content to test each box
        }
    });
}
