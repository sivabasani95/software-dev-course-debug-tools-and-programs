// Shopping Cart Data
const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

// -------------------------------
// Problem 1: calculateTotal
// Original issue: Loop used i <= cartItems.length
//Last iteration accesses undefined → Uncaught TypeError
// Fix: Use for...of loop or i < cartItems.length
// -------------------------------
function calculateTotal(cartItems) {
  let total = 0;
  for (const item of cartItems) { // Fixed loop
    total += item.price;          // Safely add item price
  }
  return total;
}

// -------------------------------
// Problem 2: applyDiscount
// Original issue: No validation for discountRate
// Negative, >1, or non-number values produce NaN
// Fix: Validate discountRate is a number between 0 and 1
// -------------------------------
function applyDiscount(total, discountRate) {
  if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
    throw new Error("Invalid discount rate. Must be a number between 0 and 1.");
  }
  return total - total * discountRate;
}

// -------------------------------
// Problem 3: generateReceipt
// Original issue: total.toFixed() fails if total is undefined/NaN
// Fix: Check that total is a valid number
// -------------------------------
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

// -------------------------------
// Debugging & Output
// -------------------------------
console.log("Starting shopping cart calculation...");

try {
  const total = calculateTotal(cart);
  const discountedTotal = applyDiscount(total, 0.2); // 20% discount
  const receipt = generateReceipt(cart, discountedTotal);

  // Display in HTML
  document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
  document.getElementById("receipt").textContent = receipt;

} catch (error) {
  console.error("An error occurred:", error.message);
}

// -------------------------------
// Edge Cases Tested:
// - Empty cart → $0.00
// - One item → correct subtotal
// - discountRate = 0 → full price
// - discountRate = 1 → free
// - discountRate = -1 or "abc" it's throws error
// -------------------------------

// -------------------------------
// Debugging Tools Used:
// - Console → runtime errors
// - Sources → breakpoints in functions
// - debugger statement → inspect variables in loops
// -------------------------------

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
// debugger statement used to inspect loop variables.//
