window.onload =
    function() {
  ajaxBlock();
  userTemplate();
}

function
userTemplate() {
  var login = sessionStorage.isLogin;
  if (!login) {
    window.location.href = './login.html';
  }
  var user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('nickname').textContent = user.nickname;
  document.getElementById('nickname2').textContent = user.nickname;
  $('#avatar').attr('src', user.avatar)
}

function
ajaxBlock() {
  $.ajax({
    url: 'http://localhost:8080/block',
    dataType: 'json',
    async: true,
    type: 'get',
    success: function(result) {
      console.log(result.data);
      blockTemplate(result.data);
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
}

function blockTemplate(data) {
  $('#block').html('');
  $.each(data, function(index, item) {
    $('#block').append($('<option>').attr('value', item.id).append(item.name))
  });
}

function
addCategory() {
  var block_id = $('#block').val();
  var name = $('#name').val();
  var description = $('#description').val();

  $.ajax({
    url: 'http://localhost:8080/category',
    dataType: 'json',
    async: true,
    type: 'POST',
    data: {'name': name, 'blockId': block_id, 'description': description},
    success: function(result) {
      console.log(result.data);
      if (result.status) alert('添加分类成功');
    },
    error: function(xhr) {
      alert(xhr.status);
    }
  })
}

function
logout() {
  sessionStorage.isLogin = false;
  window.location.href = './login.html';
}