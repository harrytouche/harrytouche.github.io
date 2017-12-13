// get rid of old order information
localStorage.order = ""

// set user information
try{
    document.getElementById("user_info").innerText = "Your username is " + dataLayer.user.name + " and your level is " + dataLayer.user.level
} catch(err){
    console.log("Can't display user info")
}

// create product cards below
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
        productPrice.innerText = "$" + dataLayer.products[i].price
        mydiv.appendChild(productPrice)

        // purchase button
        var productForm = document.createElement("form")
        productForm.setAttribute("onsubmit", "addToBasket(this); return false")
        
        var productSKU = document.createElement("input")
        productSKU.setAttribute("name", "productSKU")
        productSKU.setAttribute("type", "text")
        productSKU.classList.add("product-sku")
        productSKU.value = dataLayer.products[i].sku
        productForm.appendChild(productSKU)

        var productBuyButton = document.createElement("input")
        productBuyButton.setAttribute("type", "submit")
        productForm.appendChild(productBuyButton)
        mydiv.appendChild(productForm)

        document.getElementById("product-card-holder").appendChild(mydiv)
}
} catch(err){
    console.log("Can't add product information")
}


cycleColor = function(thisObject){
    var colors = ["gold", "lightseagreen", "beige", "green", "blue", "yellow", "cyan", "pink", "magenta", "fuschia", "cadetblue"]
    var newColor = colors[Math.floor(Math.random()*10)]
    dataLayer.carouselColor = newColor
    try{
        _satellite.track("CarouselClick")
    } catch(err){
        console.log("Not able to fire direct call rule")
    }
    thisObject.style.backgroundColor = newColor
}


submitForm = function(thisForm){
    try{
        var userName = thisForm.elements.inputname.value
        var userLevel = thisForm.elements.inputlevel.value
        localStorage.userName = userName.toUpperCase()
        localStorage.userLevel = userLevel.toUpperCase()
    } catch(err){console.log("Error submitting the form!")}
    thisForm.submit()
}


addToBasket = function(thisForm){
    var productSKU = thisForm.productSKU.value
    console.log(productSKU)
    dataLayer.productEvent = productSKU

    // add product to dataLayer basket
    dataLayer.basket = dataLayer.basket || {}
    if(dataLayer.basket[productSKU]){
        dataLayer.basket[productSKU] += 1
    } else {
        dataLayer.basket[productSKU] = 1
    }

    try{_satellite.track("AddToBasket")}catch(err){console.log("Not able to fire direct call rule")}
    document.getElementById("add-to-basket-notification").innerHTML = "<h4>Thanks for adding " + productSKU + " to the basket</h4>"
    return false
}


checkout = function(thisForm){

    if(!dataLayer.basket){
        alert("You can't check out with an empty basket!")
    } else {

        // construct order data layer
        dataLayer.order = {
            orderID: Math.floor(Math.random() * 1e8),
            products: [],
        }

        var basketKeys = Object.keys(dataLayer.basket)
        for(var i=0; i<basketKeys.length; i++){
            for(var j=0; j<dataLayer.products.length; j++){
                if(dataLayer.products[j].sku == basketKeys[i]){
                    var newProduct = dataLayer.products[j]
                    newProduct.quantity = dataLayer.basket[basketKeys[i]]
                    dataLayer.order.products.push(newProduct)
                }
            }
        }
        localStorage.order = JSON.stringify(dataLayer.order)
        window.location.href = location.href.replace(/\/test-site\/.*/,"/test-site/order-confirmation.html")

        // navigate to the order confirmation page

    }
}