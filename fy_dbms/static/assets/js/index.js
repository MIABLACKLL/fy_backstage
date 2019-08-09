window.onload =
    function() {
  initializeinfo();
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

function getStatus(status) {
  if(status===0)
    return "全局关闭";
  else if(status===1)
    return "仅会员报修";
  else if(status===2)
    return "全局开启";
  else
    return "未知状态，请重试或联系管理员";
}

function initializeinfo(){
    $.ajax({
    url: 'http://127.0.0.1:8000/system/init',//http://localhost:8080/category  //这里的url没写！！
    dataType: 'json',
    async: true,
    type: 'POST',
    data: JSON.stringify({'status':status}),
    success: function(result) {
      console.log(result.status)
      $('#status').attr("value",getStatus(result.status));
    },
    error: function(xhr) {
      // document.getElementById("block")[1].selected=true;
      console.log(xhr.status)
    }

  })
}


function
modifyststem(){
  var status=$('select').val();
  console.log(status);
  //status.attr('selected');
  $.ajax({
    url: 'http://127.0.0.1:8000/system/update',//http://localhost:8080/category  //这里的url没写！！
    dataType: 'json',
    async: true,
    type: 'POST',
    data: JSON.stringify({'status':status}),//
    success: function(result) {
      alert(result);
      window.location.href = '/index';
    },
    error: function(xhr) {
      console.log(xhr.status);
    }
  })
  window.location.href = '/index';
}