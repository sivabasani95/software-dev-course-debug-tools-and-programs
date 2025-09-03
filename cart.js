const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i <= cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

// Step-by-Step Debugging Breakdown

// Bug 1: calculateTotal - Loop Out of Bounds

for (let i = 0; i <= cartItems.length; i++) {

// Problem: The loop uses i <= cartItems.length, which causes cartItems[cartItems.length] to be undefined on the last iteration.Then, undefined.price throws: 
// Uncaught TypeError: Cannot read properties of undefined.

//Fix

for (let i = 0; i < cartItems.length; i++) {

// Or use a cleaner loop:
for (const item of cartItems) {
    total += item.price;
}

// Bug 2: applyDiscount - No Validation for discountRate

function applyDiscount(total, discountRate) {
  return total - total * discountRate;
}

// Problem: If discountRate is invalid (e.g., -0.5, 2, "abc"), you’ll get a wrong or NaN result. 
// It should be between 0 and 1.

// Fix

function applyDiscount(total, discountRate) {
    if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
        throw new Error("Invalid discount rate. Must be a number between 0 and 1.");
    }
    return total - total * discountRate;
}

// Bug 3: generateReceipt - total may be NaN

receipt += `Total: $${total.toFixed(2)}`;

// Problem: Problem:

// If total is undefined or NaN, this line throws:
// Uncaught TypeError: total.toFixed is not a function.

if (typeof total !== "number" || isNaN(total)) {
    throw new Error("Invalid total amount");
}


// Cleaned and Fixed Version of cart.js

const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (const item of cartItems) {
      total += item.price;
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
      throw new Error("Invalid discount rate. Must be a number between 0 and 1.");
  }
  return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  if (typeof total !== "number" || isNaN(total)) {
      throw new Error("Invalid total amount");
  }

  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`;
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");

try {
    const total = calculateTotal(cart);
    const discountedTotal = applyDiscount(total, 0.2); // 20% discount
    const receipt = generateReceipt(cart, discountedTotal);

    document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
    document.getElementById("receipt").textContent = receipt;

} catch (error) {
    console.error("An error occurred:", error.message);
}

// Test Cases to Validate Fixes
// Empty cart - Total = `$0.00`, receipt shows only the total
// One item in cart  - Correct subtotal and discounted total       
// `discountRate = 0` - Full price (no discount)                      
// `discountRate = 1` - Free (total = `$0.00`)                        
// `discountRate = -1` - Error: "Invalid discount rate"                
// `discountRate = "abc"` - Error: "Invalid discount rate"   

// Developer Tools Walkthrough
// Console Tab - 
// Shows Uncaught TypeError: Cannot read properties of undefined.
// Helped identify loop issue in calculateTotal.    

// Sources Tab
// Set breakpoints inside calculateTotal, applyDiscount, and generateReceipt.
// Step through to inspect item, total, and discountRate.    

// Insert during loop inspection:
for (const item of cartItems) {
    debugger; // Inspect item
    total += item.price;
}

// GitHub Repo comments

// Debug Summary:
// Bug 1: calculateTotal loop used `<=`, causing undefined access.
// Fixed by changing to `<` or using `for...of`.
// Bug 2: applyDiscount had no validation for discountRate.
// Fixed by validating it's a number between 0 and 1.
// Bug 3: generateReceipt could fail if total was NaN.
// Fixed by checking if total is a valid number.
// Edge Cases Tested:
// Empty cart
// One item in cart
// Discount rate: 0, 1, invalid values
// Developer Tools:
// Console used to locate runtime errors.
// Sources tab used for breakpoints inside core functions.
// debugger statement used to inspect loop variables.


     


