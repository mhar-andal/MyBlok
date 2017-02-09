$(document).ready(function(){
  if (window.location.pathname == '/keys') {
    var username = $("#username").attr('value')
    $("#passphrase").on("submit", function(e){
      e.preventDefault();
      console.log("yo dis shit goin'")
      var oForm = this;
      var password = oForm.elements["password"].value;
      var confirm = oForm.elements["confirm"].value;
      if (password === confirm) {
        $("#passphrase").replaceWith("<div id='passphrase'> <div class='errors'><center><h3>Generating Keys...</h3></center></div></div>");
        var keys = genkey(username, password)
        setTimeout(function() {
          $(".errors").replaceWith("<div class='errors'><span></span></div>");
          $("#passphrase").replaceWith("<h1>Private Key: </h1>" +
          "<h2>" + keys.privkey + "<h2>"
        );
        }, 6000)
      } else {
        $(".errors").replaceWith("<div class='errors'><center><span style='color: red;'><h2>error</h2></span></center></div>")
      }
    })
  }

})
