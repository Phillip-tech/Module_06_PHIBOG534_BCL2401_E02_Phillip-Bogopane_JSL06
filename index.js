const menu = {
    Starters: [{name: "Garlic Bread", price: 8}, {name: "Bruschetta", price: 10}],
    MainCourses: [{name: "Margherita Pizza", price: 15}, {name: "Spaghetti Carbonara", price: 18}],
    Desserts: [{name: "Tiramisu", price: 12}, {name: "Cheesecake", price: 10}]
};

// Function to display menu items
function displayMenuItems(menu) {
    const menuContainer = document.getElementById("menu-container");

    // Loop through each category in the menu object
    
    for (const [category, items] of Object.entries(menu)) {
        const categoryHeading = document.createElement("h3");
        categoryHeading.textContent = category;
        menuContainer.appendChild(categoryHeading);

        const itemList = document.createElement("ul");
        menuContainer.appendChild(itemList);
   
        // Create list items for each menu item in the category

        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - R${item.price}`;
            listItem.addEventListener("click", () => addToOrder(item.name, item.price));
            listItem.style.cursor = "pointer"; // Set cursor to pointer
            itemList.appendChild(listItem);
        });
    }
}

// Function to add an item to the order
function addToOrder(itemName, itemPrice) {
    const orderItemsList = document.getElementById("order-items");
    const orderTotalElem = document.getElementById("order-total");

    const listItem = document.createElement("li");
    listItem.textContent = `${itemName} - R${itemPrice}`;

    // Create a button to remove the item
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Item";
    removeButton.className = "button remove-button"; // Add CSS classes for styling
    removeButton.addEventListener("click", () => removeItem(listItem, itemPrice));

    listItem.appendChild(removeButton);
    orderItemsList.appendChild(listItem);

    // Update the total price
    const currentTotal = parseFloat(orderTotalElem.textContent) || 0;
    const newTotal = currentTotal + itemPrice;
    orderTotalElem.textContent = newTotal.toFixed(2);
}

// Function to remove an item from the order
function removeItem(itemElement, itemPrice) {
    const orderItemsList = document.getElementById("order-items");
    const orderTotalElem = document.getElementById("order-total");

    orderItemsList.removeChild(itemElement);

    // Update the total price
    const currentTotal = parseFloat(orderTotalElem.textContent) || 0;
    const newTotal = currentTotal - itemPrice;
    orderTotalElem.textContent = newTotal.toFixed(2);
}

// Function to clear all items from the order
function clearItems() {
    document.getElementById('order-items').innerHTML = '';
    document.getElementById('order-total').innerText = '0.00';
}

// Function to submit the order
function submit() {
    const orderItemsList = document.getElementById("order-items");
    if (orderItemsList.children.length === 0) {
        alert('Please add items to your order before submitting.');
    } else {
        clearItems(); // Clear items when submitting
        alert('Your order has been submitted. Thank you!');
    }
}

// Initialize the menu system
function initMenuSystem(menu) {
    displayMenuItems(menu);
}

// Event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");
    const orderItemsList = document.getElementById("order-items");
    const orderTotalElem = document.getElementById("order-total");

    // Check if critical elements are present in the HTML
    
    if (!menuContainer || !orderItemsList || !orderTotalElem) {
        console.error("Critical elements not found in the HTML. Please check your HTML structure.");
        return;
    }

    initMenuSystem(menu); // Initialize the menu system
})
