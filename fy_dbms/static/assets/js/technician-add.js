window.onload =
    function() {
  userTemplate();
}

function
userTemplate() {
  var login = sessionStorage.isLogin;
 if (!login) {
    window.location.href = '/login';
  }
  var user = sessionStorage.getItem('user');
  document.getElementById('nickname').textContent = user;
  document.getElementById('nickname2').textContent = user;
  $('#avatar').attr('src', user.avatar)
}


function
addTechnician() {
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var status=$('select').val();

  $.ajax({
    url: 'http://127.0.0.1:8000/staff/addSingle',
    dataType: 'json',
    async: true,
    type: 'POST',
    data: {'name': name, 'email': email, 'phone': phone,'status':status},
    success: function(result) {
      console.log(result);
      alert(result)
      window.location.href = '/index/technician-list/technician-add';//跳转
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })

  //window.location.href = '/index/technician-list/technician-add';
}
/*
function
showalert(){
    $.ajax({
    url: 'http://127.0.0.1:8000/staff/addSingle/result',//http://127.0.0.1:8000/staff/list/
    type: 'post',
    async: true,
    data: 'json',
    success: function (result) {
      console.log(result);
      alert(result);
    },
    error: function (xhr) {
      alert(xhr);
      console.log("没有数据！");
    }
  })
}
*/
function
logout() {
  sessionStorage.isLogin = false;
  window.location.href = '/login';
}