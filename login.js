var objUser = [
    {
       username:"jushang",
        password:"784038"
   }]

    function getInfo() {
        var username = document.getElementById("username").value
        var password = document.getElementById("password").value
        console.log("your username is " + username + ", your password is " + password)

        for(i = 0; i < objUser.length; i++ ){
            if(username == objUser[i].username && password == objUser[i].password){
                console.log(username + "is logged in!")
                return
            }
        }
        console.log("incorrect username or password")
    }
