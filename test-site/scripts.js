dataLayer = {
    pageName: "homepage",
    user: {
        name: localStorage.userName || "NEMO",
        level: localStorage.userLevel || "UNKNOWN"
    },
    products: [
        {name: "Bouquet of Flowers", price:15.00, image:"productA.jpg", sku: "abc123", color:"purple", category:"gift"},
        {name: "Bar Tab", price:60.00, image:"productB.jpg", sku: "def456", color: "n/a", category:"gift"},
        {name: "Skin-Tight Cycling Gear", price:99.00, image:"productC.jpg", sku: "ghi789", color:"purple", category:"clothes"},
    ]
}

document.title = dataLayer.pageName
document.getElementById("user_info").innerText = "Your username is " + dataLayer.user.name + " and your level is " + dataLayer.user.level

// create product cards below
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
    var productBuy = document.createElement("input")
    productBuy.setAttribute("type", "submit")
    productBuy.setAttribute("onclick", "addToBasket('" + dataLayer.products[i].sku + "')")
    mydiv.appendChild(productBuy)

    document.getElementById("product-card-holder").append(mydiv)
}







cycleColor = function(thisObject){
    var colors = ["gold", "lightseagreen", "red", "green", "blue", "yellow", "cyan", "pink", "magenta", "fuschia", "cadetblue"]
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


addToBasket = function(productSKU){

    console.log(productSKU)
    dataLayer.productEvent = productSKU
    try{_satellite.track("AddToBasket")}catch(err){console.log("Not able to fire direct call rule")}

    document.getElementById("add-to-basket-notification").innerHTML = "<h4>Thanks for adding " + productSKU + " to the basket</h4>"

    return false
}