window.onload=function () {
    var result;
    if ($.cookie('name')){
        $('#submitForm').hide();
        $('#welcome').html("Welcome "+ $.cookie('name'))
        $('#logOut').show();
    }
    else{
        $('#submitForm').show()
    }
    $('#loginBtn').click(function() {
        $("#loginForm").ajaxForm(function(data){
            // var cookie= chrome.cookies;
            // $("#text").html(data["name"])
            result = data["result"];
            // $("#text").html(result[0])
            if (!result){
                $("#warning").html("no user found")
            }
            else{
                $('#submitForm').hide();
                $('#welcome').show();
                $('#welcome').html("Welcome "+ result[0])
                $.cookie('name', result[0], { expires: 1, path: '/' });
                $('#logOut').show();
                // $("#text").html("cookie saved name: "+ $.cookie('name'))
            }
        });
    });
    $('#logOut').click(function () {
        $.removeCookie('name');
        $('#logOut').hide();
        $('#welcome').hide();
        $('#submitForm').show();
    })
};

