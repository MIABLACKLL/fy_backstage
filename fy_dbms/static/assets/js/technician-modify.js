window.onload =
    function() {
        userTemplate();
        initializeinfo();
}

function
userTemplate() {
  var login = sessionStorage.isLogin;
 /*if (!login) {
    window.location.href = './login.html';
  }*/
  var user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('nickname').textContent = user.nickname;
  document.getElementById('nickname2').textContent = user.nickname;
  $('#avatar').attr('src', user.avatar);
        var searchURL = window.location.search;
        console.log(searchURL);
        searchURL = searchURL.substring(1, searchURL.length);
        var targetId = searchURL.split("&")[0].split("=")[1];
        console.log(targetId);

  
}


function getParams(key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                //console.log(r[2]);
                return decodeURI(r[2]);//unescape()
            }
            return null;
}

function initializeinfo(){
  //console.log(getParams("name"));
  $('#name').attr("value",getParams("name"));
  $('#email').attr("value",getParams("email"));
  $('#phone').attr("value",getParams("phone"));
  $('#block').attr("value",getParams("status"));
  //console.log(getParams("email"));
}


function modifyTechnician() {
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var status=$('select').val();
  var staff_id=getParams("staff_id");


  $.ajax({
    url: '',//http://localhost:8080/category  //这里的url没写！！
    dataType: 'json',
    async: true,
    type: 'POST',
    data: JSON.stringify({'staff_id':staff_id,'name': name, 'email': email, 'phone': phone,'status':status}),//
    success: function(result) {
      console.log(result);
      alert(result);
      //window.location.href = './technician-list.html';//跳转
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
  window.location.href = './technician-list.html';
}

function
logout() {
  sessionStorage.isLogin = false;
  window.location.href = './login.html';
}
