document.addEventListener('DOMContentLoaded',()=>{
    // API DEFINE
    var API_DOMAIN ="";
    const API_DOMAIN_COL = ['https://2-dot-backup-server-001.appspot.com,','https://2-dot-backup-server-002.appspot.com','https://2-dot-backup-server-003.appspot.com'];
    const LOGIN_PATH = "/_api/v2/members/authentication";
    API_DOMAIN = API_DOMAIN_COL[1];
        // GÁN DEFAULT API
// FORMS DEFINE
    var loginForm = document.forms['login-form'];
    var txtEmail = loginForm['email'];
    var txtPass = loginForm['password'];
    var btnSubmit = loginForm['btn-submit'];
//Send Data
    btnSubmit.onclick = function (){
        var email = txtEmail.value;
        var password = txtPass.value;
        var sendData = {
            email: email,
            password: password
        }
        //console.log(sendData);
        //Convert Obj to Json
        var jsonData = JSON.stringify(sendData);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if (this.readyState === 4 ){
                var alertBox = document.getElementById('alert-box');
                if(this.status === 201){
                    console.log(this.responseText);
                    var respondObject = JSON.parse(this.responseText);
                    alert("Login thành công");
                    sessionStorage.setItem("AID",respondObject.token);
                    window.location.href = "main.html"
                } else if (this.status === 403){
                    alert("Login không thành công");
                }
            }
        }
        xhr.open("POST",API_DOMAIN + LOGIN_PATH);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(jsonData);
    }
});