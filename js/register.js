// API DEFINE
var API_DOMAIN ="";
const API_DOMAIN_COL = ['https://2-dot-backup-server-001.appspot.com,','https://2-dot-backup-server-002.appspot.com','https://2-dot-backup-server-003.appspot.com'];
API_DOMAIN = API_DOMAIN_COL[1];
const REGISTER_PATH = "/_api/v2/members";
// FORMS DEFINE
var registerForm = document.forms['register-form'];
var txtEmail = registerForm['email'];
var txtFname = registerForm['firstName'];
var txtLname = registerForm['lastName'];
var txtPass = registerForm['password'];
var txtPhone = registerForm['phone'];
var txtAddress = registerForm['address'];
var txtBday = registerForm['birthday'];
var cGender = document.getElementById('gender');
var txtLinkava = registerForm['linkAva'];
var btnSubmit = registerForm['btn-submit'];
// GÁN SỰ KIỆN CLICK CHO NÚT btnSubmit
btnSubmit.onclick = function (){
     var email = txtEmail.value;
     var firstName = txtFname.value;
     var lastName = txtLname.value;
     var passWord = txtPass.value;
     var phone = txtPhone.value;
     var address = txtAddress.value;
     var bDay = txtBday.value;
     var gender = cGender.value;
     var linkAva = txtLinkava.value;

     console.log(gender);
     var sendData = {
         firstName: firstName,
         lastName: lastName,
         password: passWord,
         address: address,
         phone: phone,
         avatar: linkAva,
         gender: gender,
         email: email,
         birthday:bDay
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
                 alertBox.innerHTML += ` <div>
                                            <p>Bạn đã đăng ký thành công</p>
                                        </div>`
             } else if (this.status === 400){
                 var status400 = JSON.parse(this.responseText);
                 alertBox.innerHTML += ` <div> 
                                    <div>${status400.status}</div>
                                    <div>${status400.message}</div>
                                    <div>${status400.error(firstName)}</div>
                                    <div>${status400.error(lastName)}</div>
                                    <div>${status400.error(email)}</div>
                                    </div>`
             }
         }
     }
     xhr.open("POST",API_DOMAIN + REGISTER_PATH);
     xhr.setRequestHeader("Content-Type","application/json");
     xhr.send(jsonData);
}