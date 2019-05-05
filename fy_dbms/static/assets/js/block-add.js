var icon = '';
var adminId = '';
var id;
window.onload =
    function() {
  id = sessionStorage.editId;
  console.log(id);
  if (id != -1) {
    ajaxBlock(id);
    $('#commit').attr('onclick', 'putBlock()');
  }
}

    function ajaxBlock(id) {
      $.ajax({
        url: 'http://localhost:8080/block/id/' + id,
        dataType: 'json',
        async: true,
        type: 'GET',
        success: function(result) {
          console.log(result);
          if (result.status) {
            adminId = result.data.adminUserId;
            icon = result.data.icon;
            $('#name').val(result.data.name);
            $('#preview').attr('src', result.data.icon);
            $('#description').val(result.data.description);
            $('#tips').html('版主ID: ' + result.data.adminUserId);
          }
        },
        error: function(xhr) {
          alert(xhr.status);
        }
      })
    }

    $(document)
        .ready(function() {
          $('#input-icon').change(function() {
            var file = (document.getElementById('input-icon').files[0]);
            upload(file);
          })
        });


function addBlock() {
  var name = $('#name').val();
  var description = $('#description').val();
  $.ajax({
    url: 'http://localhost:8080/admin/block',
    dataType: 'json',
    async: true,
    type: 'POST',
    data: {
      'name': name,
      'icon': icon,
      'description': description,
      'adminId': adminId
    },
    success: function(result) {
      console.log(result.data);
      icon = result.data;
      window.location.href = './block-list.html';
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
}

function putBlock() {
  var name = $('#name').val();
  var description = $('#description').val();
  $.ajax({
    url: 'http://localhost:8080/admin/block',
    dataType: 'json',
    async: true,
    type: 'PUT',
    data: {
      'id': id,
      'name': name,
      'icon': icon,
      'description': description,
      'adminId': adminId
    },
    success: function(result) {
      console.log(result.data);
      window.location.href = './block-list.html';
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
}

function upload(file) {
  console.log(file);
  var objUrl = getObjectURL(file);
  $('#preview').attr('src', objUrl);
  var form = new FormData();
  form.append('file', $('#input-icon')[0].files[0]);
  $.ajax({
    url: 'http://localhost:8080/upload/block',
    dataType: 'json',
    async: true,
    processData: false,
    contentType: false,
    type: 'POST',
    data: form,
    success: function(result) {
      console.log(result.data);
      icon = result.data;
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
}

function getObjectURL(file) {
  var url = null;
  // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
  if (window.createObjectURL != undefined) {  // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {  // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {  // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

function check() {
  var admin = $('#admin-name').val();
  search(admin);
}

function search(nickname) {
  $.ajax({
    url: 'http://localhost:8080/admin/user/nickname?nickname=' + nickname,
    type: 'GET',
    async: true,
    data: 'json',
    success: function(result) {
      console.log(result);
      var data = result.data;
      if (!result.status) {
        $('#tips').html('没有找到用户');
      } else {
        $('#tips').html('用户ID:' + data[0].id);
        $('#admin-name').val(data[0].nickname);
        adminId = data[0].id;
      }
    },
    error: function(xhr) {
      alert(xhr);
    }
  })
}

function logout() {
  sessionStorage.isLogin = false;
  window.location.href = './login.html';
}