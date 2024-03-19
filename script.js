// Declare sortedData outside of any function to make it globally accessible
const sortedData = {
    ':chaoskey:': [],
    ':goldkey:': [],
    ':silverkey:': [],
    ':bronzekey:': [],
    'noKey': []
};

function sortData() {
    // Rest of the sortData function remains unchanged
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
