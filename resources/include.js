// load custom head
//$("head").load("/resources/head.html")
$.get('/resources/head.html', function(result) {
    $('head').append(result);
});



// save current content
var pageContent = $("#content").html()

// add body in
$("body").load("/resources/body.html", function(){
    $("main").html(pageContent)
})
