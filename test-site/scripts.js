digitalData = {
    pageName: location.pathname.split("/").slice(-1)[0].replace(".html","") || "homepage",
    user: {
        name: localStorage.userName,
        level: localStorage.userLevel
    },
    products: (localStorage.order) ? JSON.parse(localStorage.order).products : [
        {name: "Bouquet of Flowers", price:15.00, image:"productA.jpg", sku: "abc123", color:"purple", category:"gift"},
        {name: "Bar Tab", price:60.00, image:"productB.jpg", sku: "def456", color: "n/a", category:"gift"},
        {name: "Skin-Tight Cycling Gear", price:99.00, image:"productC.jpg", sku: "ghi789", color:"purple", category:"clothes"},
    ]
}

// set document title
document.title = digitalData.pageName







