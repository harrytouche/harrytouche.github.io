// set user information
try{
    document.getElementById("user_info").innerText = "Your username is " + digitalData.user.name + " and your level is " + digitalData.user.level
} catch(err){
    console.log("Can't display user info")
}

// create product cards below
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
        productPrice.innerText = "$" + digitalData.products[i].price
        mydiv.appendChild(productPrice)

        // purchase button
        var productForm = document.createElement("form")
        productForm.setAttribute("onsubmit", "addToBasket(this); return false")
        
        var productSKU = document.createElement("input")
        productSKU.setAttribute("name", "productSKU")
        productSKU.setAttribute("type", "text")
        productSKU.classList.add("product-sku")
        productSKU.value = digitalData.products[i].sku
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


// load basket from data layer and save on page exit
digitalData.basket = (localStorage.basket) ? JSON.parse(localStorage.basket) : undefined
window.addEventListener("beforeunload",function(){
    localStorage.basket = JSON.stringify(digitalData.basket) || ""
})
// clear order details
localStorage.order = ""



cycleColor = function(thisObject){
    var colors = ["gold", "lightseagreen", "beige", "green", "blue", "yellow", "cyan", "pink", "magenta", "fuschia", "cadetblue"]
    var newColor = colors[Math.floor(Math.random()*10)]
    digitalData.carouselColor = newColor

    // push to Adobe
    try{_satellite.track("CarouselClick")} catch(err){console.log("Not able to fire direct call rule")}

    // push to GA
    try{dataLayer.push({"event": "CarouselClick", "carouselColor":newColor})}catch(err){console.log("Unable to push to GTM data layer")}

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
    //console.log(productSKU)
    digitalData.productEvent = productSKU

    // add product to digitalData basket
    digitalData.basket = digitalData.basket || {}
    if(digitalData.basket[productSKU]){
        digitalData.basket[productSKU] += 1
    } else {
        digitalData.basket[productSKU] = 1
    }

    try{_satellite.track("AddToBasket")}catch(err){console.log("Not able to fire direct call rule")}
    document.getElementById("add-to-basket-notification").innerHTML = "<h4>Thanks for adding " + productSKU + " to the basket</h4>"
    return false
}


checkout = function(thisForm){

    if(!digitalData.basket){
        alert("You can't check out with an empty basket!")
    } else {

        // construct order data layer
        digitalData.order = {
            orderID: Math.floor(Math.random() * 1e8),
            products: [],
        }

        var basketKeys = Object.keys(digitalData.basket)
        for(var i=0; i<basketKeys.length; i++){
            for(var j=0; j<digitalData.products.length; j++){
                if(digitalData.products[j].sku == basketKeys[i]){
                    var newProduct = digitalData.products[j]
                    newProduct.quantity = digitalData.basket[basketKeys[i]]
                    digitalData.order.products.push(newProduct)
                }
            }
        }
        localStorage.order = JSON.stringify(digitalData.order)
        window.location.href = location.href.replace(/\/test-site\/.*/,"/test-site/order-confirmation.html")

        // navigate to the order confirmation page

    }
}