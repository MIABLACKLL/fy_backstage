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

/*
function
addTechnician() {
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var status=$('select').find('option').eq(1).attr('selected', true);

  $.ajax({
    url: '',//http://localhost:8080/category
    dataType: 'json',
    async: true,
    type: 'POST',
    data: JSON.stringify({'name': name, 'email': email, 'phone': phone,'status':status});
    success: function(data) {
      console.log(data);
      alert('添加技术员成功');
      window.location.href = './technician-list.html';//跳转
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
}
*/
function
logout() {
  sessionStorage.isLogin = false;
  window.location.href = '/login';
}