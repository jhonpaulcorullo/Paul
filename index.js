// DOM elements
const products = [
    { id: 1, name: "IPhone 11 ProMax", qtyId: "qty1", priceId: "price1" },
    { id: 2, name: "IPhone XR", qtyId: "qty2", priceId: "price2" },
    { id: 3, name: "IPhone 13 ProMax", qtyId: "qty3", priceId: "price3" },
    { id: 4, name: "IPhone 14 ProMax", qtyId: "qty4", priceId: "price4" },
    { id: 5, name: "IPhone 15 ProMax", qtyId: "qty5", priceId: "price5" }
];

const carts = document.getElementById("carts");
const totalInput = document.getElementById("total");
const cashInput = document.getElementById("cash");
const changeInput = document.getElementById("change");

// Utility function to get price from price label
function getPrice(priceLabel) {
    return parseFloat(priceLabel.textContent.trim());
}

// Function to add orders to the cart
function addOrder(product, qtyInput, priceLabel) {
    const qty = parseFloat(qtyInput.value);
    if (!isNaN(qty) && qty > 0) {
        const order = `${qty} pcs x ${product.name} - Php ${(qty * getPrice(priceLabel)).toFixed(2)}\n`;
        carts.textContent += order;
    }
}

// Function to update total based on selected quantities
function updateTotal() {
    let total = 0;
    products.forEach(product => {
        const qtyInput = document.getElementById(product.qtyId);
        const qty = parseFloat(qtyInput.value);
        if (!isNaN(qty) && qty > 0) {
            total += qty * getPrice(document.getElementById(product.priceId));
        }
    });
    totalInput.value = total.toFixed(2);
    calculateChange();
}

// Function to calculate change based on cash input
function calculateChange() {
    const total = parseFloat(totalInput.value);
    const cash = parseFloat(cashInput.value);

    if (!isNaN(total) && !isNaN(cash)) {
        const change = cash - total;
        changeInput.value = change.toFixed(2);
    } else {
        changeInput.value = "";
    }
}

// Function to handle buying products
function buyProducts() {
    carts.textContent = ""; // Clear cart before adding new orders
    products.forEach(product => {
        const qtyInput = document.getElementById(product.qtyId);
        addOrder(product, qtyInput, document.getElementById(product.priceId));
    });
    updateTotal();

    const total = parseFloat(totalInput.value);
    const cash = parseFloat(cashInput.value);

    if (!isNaN(total) && !isNaN(cash)) {
        if (cash >= total) {
            const change = cash - total;
            changeInput.value = change.toFixed(2);
            alert(`Purchase successful!\nChange: Php ${change.toFixed(2)}`);
        } else {
            alert("Insufficient cash!");
        }
    } else {
        alert("Please enter valid amounts for cash and quantities.");
    }
}

// Event listeners
products.forEach(product => {
    const qtyInput = document.getElementById(product.qtyId);
    qtyInput.addEventListener("keyup", updateTotal);
});
cashInput.addEventListener("input", calculateChange);
