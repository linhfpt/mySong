document.addEventListener('DOMContentLoaded', function(){
    // ĐỊNH NGHĨA API
    const API_DOMAIN = "https://2-dot-backup-server-001.appspot.com";
    const API_DOMAIN2 = "https://2-dot-backup-server-002.appspot.com";
    const API_DOMAIN3 = "https://2-dot-backup-server-003.appspot.com";
    const MY_SONG_PATH = "/_api/v2/songs/get-mine";
    const CREATE_PATH = "/_api/v2/songs";
    const SID = sessionStorage.getItem('AID');
//REQUEST
    var mySong = document.querySelector("#mySong");
    var xhr = new XMLHttpRequest();
    mySong.onclick = function () {
        var results = document.getElementById('result');
        var skeletonHtml= "";
        skeletonHtml = `<h1> All songs </h1>
                        <div id="songs" class="container"></div>`
        results.innerHTML= skeletonHtml;
        console.log(results);
        console.log(songs);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    //console.log(this.responseText);
                    var respondObject = JSON.parse(this.responseText);
                    console.log(respondObject);
                    console.log(respondObject.length);
                    alert("Lấy thông tin thành công");
                    var songs = document.getElementById('songs');
                    var htmlResult = "";
                    for (var i = 0; i < respondObject.length; i++) {
                        htmlResult += `<div class="row">
                                        <img class="col-sm-2" src="${respondObject[i].thumbnail}">
                                        <div class="col">${respondObject[i].name}</div>
                                        <div class="col">${respondObject[i].author}</div>
                                        <figure class="col">
                                            <audio
                                                controls
                                                src="${respondObject[i].link}">
                                            </audio>
                                        </figure>
                                    </div>`
                    }
                    songs.innerHTML = htmlResult;
                } else  if(this.status === 500 ){

                } else {
                    alert("Lấy thông tin không thành công");
                }
            }
        }
        xhr.open("GET", API_DOMAIN + MY_SONG_PATH);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", `Basic ${SID}`);
        xhr.send();
    }
// THÊM BÀI HÁT
    var addSong = document.querySelector('#addSong');
    addSong.onclick = function () {
        var results = document.getElementById('result');
        var htmlResult = " ";
        htmlResult = `<h1> Thêm bài hát </h1>                             
                                <div class="container">
                                     <form id="addSongform" class="row">
                                           <div class="col"><!-- Tên bài hát -->
                                               <label for="songsName">Tên bài hát:</label>
                                               <input type="text" name="songsName" placeholder="Leave the door open">
                                               <!-- Mô tả -->
                                               <label for="songsName">Mô tả:</label>
                                               <input type="text" name="description" placeholder="Nhập mô tả">
                                           </div>
                                           <div class="col">
                                               <!-- Ca sĩ -->
                                               <label for="songsName">Ca sĩ:</label>
                                               <input type="text" name="singer" placeholder="Nhập ca sĩ">
                                               <!-- Tác giả -->
                                               <label for="songsName">Tác giả:</label>
                                               <input type="text" name="author" placeholder="Nhập tác giả">
                                            </div>
                                           <div class="col">
                                               <!-- Ảnh bìa -->
                                               <label for="songsName">Ảnh bìa:</label>
                                               <input type="text" name="thumbnail" placeholder="Yêu cầu link ảnh">
                                               <!-- Link bài hát -->
                                               <label for="songsName">Link bài hát:</label>
                                               <input type="text" name="link" placeholder="Yêu cầu link bài hát .mp3">  
                                               <button type="button" name="submit-btn">Tạo bài hát</button> 
                                            </div>                                                            
                                     </form>                
                                </div>`;
        results.innerHTML = htmlResult;
    if(htmlResult !== " "){
        var addForm = document.forms['addSongform'];
        var txtName = addForm['songsName'];
        var txtSinger = addForm['singer'];
        var txtDes = addForm['description'];
        var txtAuthor = addForm['author'];
        var txtThumb = addForm['thumbnail'];
        var txtLink = addForm['link'];
        var btnSubmit = addForm['submit-btn'];

        //Gán hàm vô danh cho sự kiện onclick button btnSubmit
        btnSubmit.onclick = function (){
            var songData = {};
            var name = txtName.value;
            var description = txtDes.value;
            var singer = txtSinger.value;
            var author = txtAuthor.value;
            var thumbnail = txtThumb.value;
            var link = txtLink.value;

            var sendData = {
                name: name,
                description: description,
                singer: singer,
                author: author,
                thumbnail: thumbnail,
                link: link,
            }
            songData = JSON.stringify(sendData);
            xhr.onreadystatechange = function (){
                if(this.readyState === 4){
                    if(this.status === 201){
                        alert('Thêm bài hát thành công');
                    }else{
                        alert('HTTP 400: Kết nối thất bại');
                        console.log('Kết nối thất bại');
                    }
                }
            }
            xhr.open("POST", API_DOMAIN + CREATE_PATH);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", `Basic ${SID}`);
            xhr.send(songData);
        }
    }
    }
});
$(document).ready(function(event) {
    // copy code here
});