digitalData = {
    pageName: location.pathname.split("/").slice(-1)[0].replace(".html","") || "homepage",
    user: {
        grade: localStorage.userGrade || "",
        level: localStorage.userLevel || "",
        crmID: localStorage.crmID || ""
    }
}

// set document title
document.title = digitalData.pageName



// send signal off to AAM and print out the response
sendSignal = function(dilObject, inputObject){
  dilObject.api
  .signals(inputObject, 'c_')
  .afterResult(function(responseBody){
    var outputStatement = []
    outputStatement.push("UUID: " + responseBody.uuid)
    outputStatement.push("---------Segments----------")
    for(var i=0; i<responseBody.stuff.length; i++){
      outputStatement.push(responseBody.stuff[i].cn + " ---> " + responseBody.stuff[i].cv)
    }
    outputStatement.push("-------End Segments--------")
    console.log(outputStatement.join("\n"))
  })
  .submit();
}