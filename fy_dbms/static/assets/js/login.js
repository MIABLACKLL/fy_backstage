function login() {
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
    url: 'http://127.0.0.1:8000/login/',
    dataType: 'json',
    // contentType: 'application/x-www-form-urlencoded',
    async: true,
    type: 'POST',
    data: {'username': username, 'password': password},
    success: function(result) {
      if (result.status) {
        sessionStorage.isLogin = true;
        sessionStorage.user = result.data;
        window.location.href = '/index';
      }
      else
        window.location.href = '/login';
    },
    error: function(xhr) {
      console.log(xhr);
    }
  })
}