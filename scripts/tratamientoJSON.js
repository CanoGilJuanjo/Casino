// Script to store a JSON in localStorage
function saveJSONToLocalStorage(key, jsonData) {
    localStorage.setItem(key, JSON.stringify(jsonData));
}

// Script to retrieve a JSON from localStorage
function getJSONFromLocalStorage(key) {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
}
