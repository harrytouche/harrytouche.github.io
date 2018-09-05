// get head from file, append to existing head
$.get('/resources/head.html', function(result) {
    $('head').append(result);
});


// get body from file, append then slot content in
$.get("/resources/body.html", function(result){
    $("body").append(result)
    $("main").html($("#content"))
})