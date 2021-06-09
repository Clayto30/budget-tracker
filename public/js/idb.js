// create a variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budget_tracker" and and set it to version 1
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes (nonestistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called ?, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('deposit', { autoIncrement: true });
};

// upon a successful
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradeneeded event above) or simply established a connection, save reference to db in global variable 
    db = event.target.result;

    // check if app is online, if yes run function to send all local db data to api 
    if (navigator.onLine) {
        // we'll do the function here
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// this function will be exeucted if we attempt to submit a transacation and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['deposit'], 'readwrite');

    // access the object store for 'deposit'
    const depositObjectStore = transaction.objectStore('deposit');

    // add record to your store with add method
    depositObjectStore.add(record);
}