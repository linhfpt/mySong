document.addEventListener('DOMContentLoaded', function () {
// ĐỊNH NGHĨA API
    var API_DOMAIN = "";
    const API_DOMAIN_COL = ['https://2-dot-backup-server-001.appspot.com,', 'https://2-dot-backup-server-002.appspot.com', 'https://2-dot-backup-server-003.appspot.com'];
    const MY_SONG_PATH = "/_api/v2/songs/get-mine";
    const CREATE_PATH = "/_api/v2/songs";
    const MEMBER_PATH = "/_api/v2/members/information";
    API_DOMAIN = API_DOMAIN_COL[1];
    const SID = sessionStorage.getItem('AID');
        // REQUEST
        // REQUEST THÊM BÀI HÁT
        function addSongRES(songData) {
            var addReq = new XMLHttpRequest();
            addReq.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        alert('Thêm bài hát thành công');
                    } else {
                        alert('HTTP 400: Kết nối thất bại');
                        console.log('Kết nối thất bại');
                    }
                }
            }
            addReq.open("POST", API_DOMAIN + CREATE_PATH);
            addReq.setRequestHeader("Content-Type", "application/json");
            addReq.setRequestHeader("Authorization", `Basic ${SID}`);
            addReq.send(songData);
        }
        function createSkeleton(a) {
            var results = document.getElementById('result');
            var skeletonHtml= " ";
                skeletonHtml = `<div class="wrap-cnt side-body">
                                    <div class="txt2"><h1> ${a} </h1></div>
                                    <div id="songs" class="songs-container"></div>
                                </div>`;
            results.innerHTML = skeletonHtml;
        }
        // GÁN SỰ KIỆN CLICK CHO THẺ MY SONG REQUEST THÔNG TIN BÀI HÁT CỦA TÔI
        mySong.onclick = function () {
            var myName = "Bài hát của tôi";
            createSkeleton(myName);
            //GỬI REQUEST ĐỂ LẤY BÀI HÁT CỦA TÔI
            var xhr = new XMLHttpRequest();
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
                            htmlResult += `<div id="audio" class="song-contain card m-t-5 m-b-5">
                                            <img class="thumb" src="${respondObject[i].thumbnail}" alt="...">
                                            <div class="text-container">
                                                <div class="col"><h3>${respondObject[i].name}</h3></div>
                                                <div class="col">${respondObject[i].singer}</div>
                                                <div class="fig-contain">
                                                    <figure>
                                                        <audio id="fig"
                                                                controls
                                                                src="${respondObject[i].link}">
                                                        </audio>
                                                    </figure> 
                                                </div>  
                                            </div> 
                                        </div>`;
                        }
                        songs.innerHTML = htmlResult;
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
            var addSongname = "Thêm bài hát";
            createSkeleton(addSongname);
            var songs = document.getElementById('songs');
            var htmlResult = " ";
                htmlResult = `<div class="container container-form">
                                     <form id="addSongform">
                                           <div class="m-t-10 m-b-10"><!-- Tên bài hát -->
                                               <div class="song-info">
                                               <label class="label" for="songsName">Tên bài hát:</label>
                                               <input class="float-r" type="text" name="songsName" placeholder="Leave the door open">
                                               </div>
                                               <!-- Mô tả -->
                                               <div class="song-info">
                                               <label class="label" for="songsName">Mô tả:</label>
                                               <input class="float-r" type="text" name="description" placeholder="Nhập mô tả">
                                                </div>
                                           </div>
                                           <div class="m-t-10 m-b-10">
                                               <!-- Ca sĩ -->
                                               <div class="song-info">
                                                <label class="label" for="songsName">Ca sĩ:</label>
                                                <input class="float-r" type="text" name="singer" placeholder="Nhập ca sĩ">
                                                </div>
                                               <!-- Tác giả -->
                                               <div class="song-info">
                                               <label class="label" for="songsName">Tác giả:</label>
                                               <input class="float-r" type="text" name="author" placeholder="Nhập tác giả">
                                                </div>
                                            </div>
                                           <div class="m-t-10 m-b-10">
                                               <!-- Ảnh bìa -->
                                               <div class="song-info">
                                               <label class="label" for="songsName">Ảnh bìa:</label>
                                               <input class="float-r" type="text" name="thumbnail" placeholder="Yêu cầu link ảnh">
                                                </div>
                                               <!-- Link bài hát -->
                                               <div class="song-info">
                                               <label class="label" for="songsName">Link bài hát:</label>
                                               <input class="float-r" type="text" name="link" placeholder="Yêu cầu link bài hát .mp3">  
                                                </div>
                                            </div>     
                                            <button id="btnAdd" class="btn blue" type="button" name="submit-btn">Tạo bài hát</button>                                                        
                                     </form>                
                                </div>`;
            songs.innerHTML = htmlResult;
            if (htmlResult !== " ") {
                var addForm = document.forms['addSongform'];
                var txtName = addForm['songsName'];
                var txtSinger = addForm['singer'];
                var txtDes = addForm['description'];
                var txtAuthor = addForm['author'];
                var txtThumb = addForm['thumbnail'];
                var txtLink = addForm['link'];
                var btnSubmit = addForm['submit-btn'];

                //Gán hàm vô danh cho sự kiện onclick button btnSubmit
                var songData = {};
                btnSubmit.onclick = function () {
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
                    addSongRES(songData);
                }
            }
        }
// LẤY BÀI HÁT MỚI NHẤT
        var latestSong = document.querySelector('#latestSong');
        latestSong.onclick = function () {
            var myName = "Bài hát mới";
            createSkeleton(myName);
            // GỬI REQUEST ĐỂ LẤY BÀI HÁT MỚI NHẤT
            var latestAPI = new XMLHttpRequest();
            latestAPI.onreadystatechange = function () {
                if (latestAPI.readyState === 4) {
                    if (this.status === 200) {
                        var respondObject = JSON.parse(this.responseText);
                        console.log(respondObject);
                        console.log(respondObject.length);
                        alert("Lấy thông tin thành công");
                        var songs = document.getElementById('songs');
                        var htmlResult = "";
                        for (var i = 0; i < respondObject.length; i++) {
                            htmlResult += `<div id="audio" class="song-contain card m-t-5 m-b-5">
                                            <img class="thumb" src="${respondObject[i].thumbnail}" alt="...">
                                            <div class="text-container">
                                                <div class="col"><h3>${respondObject[i].name}</h3></div>
                                                <div class="col">${respondObject[i].singer}</div>
                                                <div class="fig-contain">
                                                    <figure>
                                                        <audio id="fig"
                                                                controls
                                                                src="${respondObject[i].link}">
                                                        </audio>
                                                    </figure> 
                                                </div>  
                                            </div> 
                                        </div>`;
                        }
                        songs.innerHTML = htmlResult;
                    } else {
                        alert("Kết nối không thành công")
                    }
                }
            }
            latestAPI.open("GET", API_DOMAIN + CREATE_PATH);
            latestAPI.setRequestHeader("Content-Type", "application/json");
            latestAPI.setRequestHeader("Authorization", `Basic ${SID}`);
            latestAPI.send();
        }
// LẤY THÔNG TIN THÀNH VIÊN
        var memberInfo = document.querySelector('#memberInfo');
        memberInfo.onclick = function () {
            var myName = "Thông tin của bạn";
            createSkeleton(myName);
            var infoAPI = new XMLHttpRequest();
            infoAPI.onreadystatechange = function () {
                if (infoAPI.readyState === 4) {
                    if (this.status === 201) {
                        var respondObject = JSON.parse(this.responseText);
                        console.log(respondObject);
                        console.log(respondObject.length);
                        alert("Lấy thông tin thành công");
                        var songs = document.getElementById('songs');
                        var htmlResult = `<div class="info-wrap">
                                            <img src="${respondObject.avatar}" alt="...">
                                            <div>
                                                <div><h1>ID: </h1>${respondObject.id}</div>
                                                <div><h1>NAME:</h1>${respondObject.firstName} ${respondObject.lastName}</div>  
                                                <div><h1>PHONE:</h1>${respondObject.phone}</div>
                                                <div><h1>BIRTHDAY:</h1>${respondObject.birthday}</div>    
                                                <div><h1>GENDER:</h1>${respondObject.gender}</div>    
                                            </div>   
                                          </div>`;
                        songs.innerHTML = htmlResult;
                    } else {
                        alert("Kết nối không thành công")
                    }
                }
            }
            infoAPI.open("GET", API_DOMAIN + MEMBER_PATH);
            infoAPI.setRequestHeader("Content-Type", "application/json");
            infoAPI.setRequestHeader("Authorization", `Basic ${SID}`);
            infoAPI.send();
        }
});
