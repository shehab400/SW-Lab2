/**
 * Inventory Management System
 * 
 * Objective:
 * - Implement a low-stock alert feature that triggers an alert when an item's quantity falls below 10.
 * - Work with an initially messy codebase and refactor it for better maintainability.
 *
 * Clean Code Improvements:
 * - Use meaningful variable names.
 * - Break code into reusable functions.
 * - Improve readability and maintainability.
 */

// Global Variables
var items = [], transactions = [], categories = [], customFields = {}; 

/**
 * Logs a low-stock alert if the item's quantity is below 10.
 */
function checkLowStock(item) {
    if (item.qty < 10) {
        console.log(`**ALERT: Item ${item.n} is below 10 units! Current quantity: ${item.qty}**`);
    }
}

/**
 * Adds a new item to the inventory.
 */
function addItem(args) {
    let item = { n: args[0], cat: args[1], qty: args[2], prc: args[3], unt: args[4], added: new Date(), custF: args[5] || {} };
    items.push(item);
    if (!categories.includes(args[1])) categories.push(args[1]);
    transactions.push({ type: "add", item });
    checkLowStock(item);
    displayDashboard();
}

/**
 * Edits an existing item in the inventory.
 */
function editItem(args) {
    if (items[args[0]]) {
        transactions.push({ type: "edit", old: items[args[0]], new: args.slice(1) });
        items[args[0]] = { ...items[args[0]], n: args[1], cat: args[2], qty: args[3], prc: args[4], unt: args[5], custF: args[6] || {} };
        checkLowStock(items[args[0]]);
        displayDashboard();
    }
}

/**
 * Removes an item from the inventory.
 */
function removeItem(args) {
    let index = items.findIndex(itm => itm.n === args[0]);
    if (index !== -1) {
        checkLowStock(items[index]);
        transactions.push({ type: "delete", item: items[index] });
        items.splice(index, 1);
        displayDashboard();
    }
}

/**
 * Handles sales and restocking transactions.
 */
function processTransaction(action, args) {
    for (let item of items) {
        if (item.n === args[0]) {
            if (action === "Sale" && item.qty >= args[1]) {
                item.qty -= args[1];
                transactions.push({ type: "sale", item, qtyS: args[1], d: new Date() });
                console.log(`Sold ${args[1]} ${item.unt} of ${item.n}`);
                checkLowStock(item);
            } else if (action === "rstck") {
                item.qty += args[1];
                transactions.push({ type: "restock", item, qtyR: args[1], d: new Date() });
                console.log(`Restocked ${args[1]} ${item.unt} of ${item.n}`);
                checkLowStock(item);
            }
            displayDashboard();
            break;
        }
    }
}

/**
 * Searches for items based on name, category, or price.
 */
function searchItem(query) {
    console.log(items.filter(item => [item.n, item.cat, item.prc].some(value => value.toString().toLowerCase().includes(query.toLowerCase()))));
}

/**
 * Displays all inventory items.
 */
function viewInventory() {
    console.log("=== Inventory ===", items);
}

/**
 * Exports all inventory data as CSV.
 */
function exportInventory() {
    console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(items.map(item => Object.values(item).join(','))).join('\n'));
}

/**
 * Displays all transactions.
 */
function viewAllTransactions() {
    console.log("Transactions:\n", transactions);
}

/**
 * Displays item age in days.
 */
function viewItemAges() {
    console.log(items.map(item => `${item.n}: ${Math.floor((new Date() - new Date(item.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
}

/**
 * Imports multiple items.
 */
function importItems(data) {
    data.forEach(item => addItem([item.n, item.cat, item.quantity, item.price, item.unit]));
}

/**
 * Adds a new custom field.
 */
function addCustomField(field) {
    if (!customFields[field]) customFields[field] = null;
}

/**
 * Updates a custom field for a specific item.
 */
function updateCustomField(args) {
    let item = items.find(x => x.n === args[0]);
    if (item) {
        item.custF = item.custF || {};
        item.custF[args[1]] = args[2];
    }
}
function displayDashboard()
{
    console.log("=== Dashboard ===\nItems: " + items.length + "\nTotal: $" + items.reduce((tot, x) => tot + x.qty * x.prc, 0).toFixed(2) + "\nCats: " + categories.join(', '));
}
/**
 * Determines the appropriate action to take.
 */
function doStuff(action, args) {
    if (action === "add") addItem(args);
    else if (action === "edit") editItem(args);
    else if (action === "rmI") removeItem(args);
    else if (["Sale", "rstck"].includes(action)) processTransaction(action, args);
    else if (action === "srch") searchItem(args[0]);
    else if (action === "vwI") viewInventory();
    else if (action === "xprtAll") exportInventory();
    else if (action === "vwAllT") viewAllTransactions();
    else if (action === "vwIAg") viewItemAges();
    else if (action === "Imprt") importItems(args[0]);
    else if (action === "addFld") addCustomField(args[0]);
    else if (action === "udCFld") updateCustomField(args);
}

function main() {
    console.log("Running inventory tests...");

    doStuff("add", ["Apple", "Fruit", 10, 1.5, "kg"]);
    doStuff("add", ["Banana", "Fruit", 5, 1, "kg"]);
    doStuff("add", ["Orange", "Fruit", 3, 2, "kg"]);
    doStuff("add", ["Milk", "Dairy", 5, 3, "litre"]);

    doStuff("Sale", ["Apple", 2]);
    doStuff("rstck", ["Milk", 2]);

    doStuff("srch", ["mil"]);
    doStuff("vwI");
    doStuff("vwIAg");

    doStuff("xprtAll");
    doStuff("vwAllT");


    doStuff("addFld", ["Origin"]);
    doStuff("udCFld", ["Apple", "Origin", "India"]);
}
// Run the alert test
main();
