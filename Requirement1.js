var i = [] , t = [], c = [], f = {}; // i array of items // c array of categories // t array of trans 
//a action //  b array of args
function doStuff(a, b) {
    if (["add", "edit", "rmI"].includes(a)) {
        if (a === "add") {
            var itm = { n: b[0], cat: b[1], qty: b[2], prc: b[3], unt: b[4], added: new Date(), custF: b[5] || {} };
            i.push(itm);
            if (!c.includes(b[1])) c.push(b[1]);
            t.push({ type: "add", itm });
        } else if (a === "edit" && i[b[0]]) {
            t.push({ type: "edit", old: i[b[0]], new: b.slice(1) });
            i[b[0]] = { ...i[b[0]], n: b[1], cat: b[2], qty: b[3], prc: b[4], unt: b[5], custF: b[6] || {} };
            item = i[b[0]]
            stockAlert(item)
        } else if (a === "rmI") {
            let index = i.findIndex(itm => itm.n === b[0]);
            if (index !== -1) {
                let item = i[index];
                stockAlert(item)
                i.splice(index, 1);
                t.push({ type: "delete", item });
            }
        }
        console.log("=== Dashboard ===\nItems: " + i.length + "\nTotal: $" + i.reduce((tot, x) => tot + x.qty * x.prc, 0).toFixed(2) + "\nCats: " + c.join(', '));
    }
    if (["Sale", "rstck"].includes(a)) {
        for (let k of i) {
            if (k.n === b[0]) {
                if (a === "Sale" && k.qty >= b[1]) {
                    k.qty -= b[1];
                    t.push({ type: "sale", itm: k, qtyS: b[1], d: new Date() });
                    console.log(`Sold ${b[1]} ${k.unt} of ${k.n}`);
                    stockAlert(k)
                } else if (a === "rstck") {
                    k.qty += b[1];
                    t.push({ type: "restock", itm: k, qtyR: b[1], d: new Date() });
                    console.log(`Restocked ${b[1]} ${k.unt} of ${k.n}`);
                    stockAlert(k)
                }
                break;
            }
        }
    }
    if (a === "srch") console.log(i.filter(x => [x.n, x.cat, x.prc].some(v => v.toString().toLowerCase().includes(b[0].toLowerCase()))));
    if (a === "vwI") console.log("=== Inv ===", i);
    if (a === "xprtAll") console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(i.map(x => Object.values(x).join(','))).join('\n'));
    if (a === "vwAllT") console.log("Transactions:\n", t);
    if (a === "vwIAg") console.log(i.map(x => `${x.n}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
    if (a === "Imprt") b[0].forEach(x => doStuff("add", [x.n, x.cat, x.quantity, x.price, x.unit]));
    if (a === "addFld" && !f[b[0]]) f[b[0]] = null;
    // if (a === "udCFld") { i.find(x => x.n === b[0]).custF[b[1]] = b[2];}
    }
function stockAlert(item)
{
    if (item.qty <10)
        {
            console.log(`**ALERT: Item ${item.n} is below 10 units! Current quantity: ${item.qty}**`)
        }
}
function runAlertTest() {
    // // Reset global variables
    // i = [];
    // t = [];
    // c = [];
    // f = {};

    // console.log("=== Test: Alert when Quantity is Less Than 10 ===");

    // // Add an item with a quantity of 15
    // doStuff("add", ["Item1", "Category1", 15, 10, "pcs"]);
    // console.log(i); // Should contain one item with qty 15

    // // Perform a sale that reduces the quantity to 5
    // doStuff("Sale", ["Item1", 10]);
    // console.log(" test delete item 1 ")
    // // Should trigger an alert because the quantity is now 5
    // doStuff("rmI", ["Item1"]);
    // console.log(i); // Should be empty
    console.log("Running inventory tests...");

    doStuff("add", ["Apple", "Fruit", 10, 1.5, "kg"]);
    doStuff("add", ["Banana", "Fruit", 5, 1, "kg"]);
    doStuff("add", ["Orange", "Fruit", 3, 2, "kg"]);
    doStuff("add", ["Milk", "Dairy", 5, 3, "litre"]);

    doStuff("Sale", ["Apple", 2]);
    doStuff("rstck", ["Milk", 2]);

    // doStuff("srch", ["mil"]);
    // doStuff("vwI");
    // doStuff("vwIAg");

    // doStuff("xprtAll");
    // doStuff("vwAllT");

    // doStuff("Imprt", [{ n: "Pineapple", cat: "Fruit", quantity: 5, price: 3, unit: "kg" }]);

    // doStuff("addFld", ["Origin"]);
    // doStuff("udCFld", ["Apple", "Origin", "India"]);

}

// Run the alert test
runAlertTest();