$(document).ready(function(){
  if (window.location.pathname == '/keys') {
    var username = $("#username").attr('value')
    $("#passphrase").on("submit", function(e){
      e.preventDefault();
      console.log("yo dis shit goin'")
      var oForm = this;
      var password = oForm.elements["password"].value;
      var confirm = oForm.elements["confirm"].value;
      if (password.split(" ").length < 4) {
        $(".errors").replaceWith("<div class='errors'><center><span style='color: red;'><h2>Your passphrase must contain more than 4 workds</h2></span></center></div>")
      } else if (password === confirm) {
        $("#passphrase").replaceWith("<div id='passphrase'> <div class='errors'><center><h3>Generating Keys...</h3></center></div></div>");
        var keys = genkey(username, password)
        setTimeout(function() {
          $(".errors").replaceWith("<div class='errors'><span></span></div>");
          $("#passphrase").replaceWith("<div id='passphrase'><center><h1>Private Key: </h1>" +
          "<textarea id='textarea'>" + keys.privkey + "</textarea></center></div>")
          var pgpkey = $("#textarea").val()
          $.ajax({
            method: 'post',
            url: '/keys',
            data: {key: pgpkey}
          })
          $("#passphrase").append("<center><button id='setupblock' type='submit' class='btn btn-default'>Setup Your Blok!</button></center>")
          $("#setupblock").on("click", function(e){
            e.preventDefault();
            window.location = "http://localhost:3000/setupblock";
          })
        }, 6000) } else {
        $(".errors").replaceWith("<div class='errors'><center><span style='color: red;'><h2>Passwords do not match</h2></span></center></div>")
      }
    })
  }

})
