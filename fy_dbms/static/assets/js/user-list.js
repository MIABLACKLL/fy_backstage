
window.onload =
    function() {
    userTemplate();
//ajaxUsers();
}

//初始化
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
logout() {
  sessionStorage.setItem('isLogin', false);
  window.location.href = '/login';
}
//
//function ajaxUsers() {
//  console.log('查询用户表');
//  $.ajax({
//    url: 'http://127.0.0.1:8000/user/page/',
//    type: 'post',
//    async: true,
//    dataType: 'json',
//    success: function(result) {
//      console.log(result);
//      usersTemplate(result);
//    },
//    error: function(xhr) {
//      alert(xhr);
//    }
//  })
//}


/**
 * 使用数据显示user
 * @param  data
 */
//function usersTemplate(data) {
//  var userlist = data;
//  $('#users').html('')
//
//  $.each(userlist, function(index, item) {
//
//    $('#users').append($('<tr>').append(
//        $('<td>').append(item.user_id), $('<td>').append(item.name),
//        $('<td>').append(item.phone), $('<td>').append(item.vip=="\u0001"?"是":"否"),
//
//
// ));
//})
//
//}
function
search() {
  var nickname =encodeURI($('#input_nickname').val()) ;
  return nickname
}

