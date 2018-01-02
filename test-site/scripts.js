digitalData = {
    pageName: location.pathname.split("/").slice(-1)[0].replace(".html","") || "homepage",
    user: {
        name: localStorage.userName,
        level: localStorage.userLevel
    }
}

// set document title
document.title = digitalData.pageName







