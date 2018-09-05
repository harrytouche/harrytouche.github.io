function scriptsOCReady(){

    // clear basket localstorage
    localStorage.basket = ""
    digitalData.products = (localStorage.order) ? JSON.parse(localStorage.order).products : undefined

    // add product information to page
    try{
        for (var i=0; i<digitalData.products.length; i++){
            var mydiv = document.createElement("div")
            mydiv.classList.add("product-card")

            // image
            var productImage = document.createElement("img")
            productImage.src = digitalData.products[i].image
            mydiv.appendChild(productImage)

            // name
            var productName = document.createElement("h4")
            productName.innerText = digitalData.products[i].name
            mydiv.appendChild(productName)

            // price
            var productPrice = document.createElement("h4")
            productPrice.innerText = "Total Price: " + "$" + digitalData.products[i].price + " x" + digitalData.products[i].quantity + " = $" + (digitalData.products[i].quantity * digitalData.products[i].price)
            mydiv.appendChild(productPrice)

            document.getElementById("order-details").appendChild(mydiv)
    }
    } catch(err){
        console.log("Can't add product information")
    }


    // add order summary
    var totalUnits = 0
    var totalCost = 0.0

    for(var i=0; i<digitalData.products.length; i++){
        totalUnits += digitalData.products[i].quantity
        totalCost += digitalData.products[i].quantity * digitalData.products[i].price
    }

    // create order data layer
    digitalData.order = {
        orderTotal: totalCost,
        orderID: (localStorage.order) ? JSON.parse(localStorage.order).orderID : undefined
    }


    // add text to page
    document.getElementById("order-summary").innerText = "You purchased " + totalUnits + " units, at a total cost of $" + totalCost.toFixed(0) + ". Your order number is: " + digitalData.order.orderID

}