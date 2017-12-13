dataLayer.orderID = (localStorage.order) ? JSON.parse(localStorage.order).orderID : undefined


// add product information to page
try{
    for (var i=0; i<dataLayer.products.length; i++){
        var mydiv = document.createElement("div")
        mydiv.classList.add("product-card")

        // image
        var productImage = document.createElement("img")
        productImage.src = dataLayer.products[i].image
        mydiv.appendChild(productImage)

        // name
        var productName = document.createElement("h4")
        productName.innerText = dataLayer.products[i].name
        mydiv.appendChild(productName)

        // price
        var productPrice = document.createElement("h4")
        productPrice.innerText = "Total Price: " + "$" + dataLayer.products[i].price + " x" + dataLayer.products[i].quantity + " = $" + (dataLayer.products[i].quantity * dataLayer.products[i].price)
        mydiv.appendChild(productPrice)

        document.getElementById("order-details").appendChild(mydiv)
}
} catch(err){
    console.log("Can't add product information")
}


// add order summary
var totalUnits = 0
var totalCost = 0.0

for(var i=0; i<dataLayer.products.length; i++){
    totalUnits += dataLayer.products[i].quantity
    totalCost += dataLayer.products[i].quantity * dataLayer.products[i].price
}

document.getElementById("order-summary").innerText = "You purchased " + totalUnits + " units, at a total cost of $" + totalCost.toFixed(0) + ". Your order number is: " + dataLayer.orderID