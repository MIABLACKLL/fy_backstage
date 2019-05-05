
window.onload =
    function() {
    userTemplate();
ajaxUsers();
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

function ajaxUsers() {
  console.log('查询用户表');
  $.ajax({
    url: 'http://127.0.0.1:8000/user/page/',
    type: 'post',
    async: true,
    dataType: 'json',
    success: function(result) {
      console.log(result);
      usersTemplate(result);
    },
    error: function(xhr) {
      alert(xhr);
    }
  })
}


/**
 * 使用数据显示user
 * @param  data
 */
function usersTemplate(data) {
  var userlist = data;
  $('#users').html('')
//  var c = '';
//  var f = '';
//  var t = '恢复';
  $.each(userlist, function(index, item) {
//    if (item.status == 0) {
//      c = '';
//      f = 'rec(' + item.id + ')';
//      t = '恢复';
//    } else {
//      c = 'tpl-table-black-operation-del';
//      f = 'del(' + item.id + ')';
//      t = '拉黑';
//    }
    $('#users').append($('<tr>').append(
        $('<td>').append(item.user_id), $('<td>').append(item.name),
        $('<td>').append(item.phone), $('<td>').append(item.vip=="\u0001"?"是":"否"),

//        $('<td>').append($('<div>').attr('class', 'am-btn-group am-btn-group-xs')
//                             .append($('<button>')
//                                         .attr('class','am-btn am-btn-default am-btn-success')
//                                         .attr('type','button')
//
//                             .append($('<span>')
//                                         .attr('class','am-icon-file-text-o')
//                                         )
//                                          .append($('<button>')
//                                                   .attr('class','am-btn am-btn-default am-btn-success')
//                                                   .attr('type','button')
//
//                                          .append($('<span>')
//                                                   .attr('class','am-icon-trash'))
//
//
//                                         )))
 ));
})

}
function
search() {
  var nickname =encodeURI($('#input_nickname').val()) ;
  $.ajax({
    url: 'http://127.0.0.1:8000/user/nickname?nickname=' + nickname,
    type: 'get',
    async: true,
    dataType: 'json',
    success: function(result) {
      usersTemplate(result);

    },
    error: function(xhr) {
      alert(xhr);
    }
  })
}

