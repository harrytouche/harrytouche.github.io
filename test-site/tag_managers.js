if(localStorage.tm == "GTM"){
    // run GTM
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WRF7DF5');

}

if(localStorage.tm == "DTM"){
    // run DTM
    document.write('<script src="//assets.adobedtm.com/076c7ec58205a2a3fb3547bee9d6c063df9870c1/satelliteLib-81e9dc91078c034c494c0bca77f98d0cd845f98d.js"></script>')
}

if(localStorage.tm == "GA"){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-12345-01', 'auto');
    ga('send', 'pageview');
}





reloadClearingCache = function(){
    location.href += "b"
}

printResults = function(){
    for (var i=0; i<times.length; i++){
        for (var j=0; j<tms.length; j++){
            console.log("TMTESTING: "+tms[j] + " -> " + times[i])
            console.log("TMTESTING:\n"+localStorage[tms[j]+"_"+times[i]].split(",").join("\n"))
            localStorage[tms[j]+"_"+times[i]] = ""
        }
    }
    return "TMTESTING: FINISHED"
}





var tms = ["NoTM", "GTM", "DTM", "GA"]
var times = ["DOM", "LOAD"]
var totalIterations = 50
var tmUsed = localStorage.tm || "NoTM"


// print time
window.addEventListener("DOMContentLoaded", function(){

    var domTime = performance.now().toFixed(0)
    console.log("TMTESTING "+times[0]+": " + tmUsed + ":" + domTime)
    localStorage[tmUsed+"_"+times[0]] = (localStorage[tmUsed+"_"+times[0]]||"") + ((localStorage[tmUsed+"_"+times[0]])?",":"") + domTime
})



window.addEventListener("load", function(){

    // print to console
    var loadTime = performance.now().toFixed(0)
    console.log("TMTESTING "+times[1]+": " + tmUsed + ":" + loadTime)
    localStorage[tmUsed+"_"+times[1]] = (localStorage[tmUsed+"_"+times[1]]||"") + ((localStorage[tmUsed+"_"+times[1]])?",":"") + loadTime
    



    // next iteration
    if((localStorage.iterations||0) < totalIterations-1){
        localStorage.iterations = parseInt(localStorage.iterations || 0) + 1
        reloadClearingCache()

    // reached iterations for TMS
    } else {

        // find which TMS we're using and move on or finish
        for (var i=0; i<tms.length-1; i++){
            
            // next TMS
            if(tmUsed == tms[i]){
                localStorage.tm = tms[i+1]
                localStorage.iterations = 0
                reloadClearingCache()
                break
            
            // finished and refresh
            } else if (i == tms.length-2){
                console.log("TMTESTING: FINISHED")
                localStorage.iterations = ""
                localStorage.tm = ""

                printResults()
            }
        }
    }
})


