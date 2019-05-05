window.onload =
    function() {
  userTemplate();
  //ajaxStatus();
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
ajaxStatus() {
  console.log('查询主页信息');
  $.ajax({
    url: 'http://localhost:8000/admin/status',
    type: 'GET',
    async: true,
    data: 'json',
    success: function(result) {
      console.log(result.data);
      document.getElementById('weekly_user').textContent =
          result.data.weeklyUser;
      document.getElementById('today_user').textContent = result.data.todayUser;
      document.getElementById('user_sum').textContent = result.data.userSum;
      document.getElementById('user_inc').textContent = result.data.userInc;
      document.getElementById('post_sum').textContent = result.data.postSum;
      document.getElementById('post_inc').textContent = result.data.postInc;
    },
    error: function(xhr) {
      alert(xhr);
    }
  })
}
*/
function
logout() {
  sessionStorage.isLogin = false;
  window.location.href = '/login';
}