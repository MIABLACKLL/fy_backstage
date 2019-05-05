window.onload = function () {
    var user = JSON.parse(sessionStorage.getItem('user'));
    userTemplate();
    ajaxBlock();
}


function userTemplate() {
    var login = sessionStorage.isLogin;
//    if (!login) {
//        window.location.href = './login.html';
//    }
    var user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('nickname').textContent = user.nickname;
    document.getElementById('nickname2').textContent = user.nickname;
    $('#avatar').attr('src', user.avatar);
}

function
ajaxBlock() {
    $.ajax({
        url: 'http://localhost:8080/admin/block',
        dataType: 'json',
        async: true,
        type: 'GET',
        success: function (result) {
            console.log(result.data);
            blockTemplate(result.data);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function blockTemplate(data) {
    $('#datas').html('');
    $.each(data, function (index, item) {
        $('#datas').append(
            $('<tr>')
            .attr('class', 'gradeX')
            .append(
                $('<td>').append($('<img>')
                    .attr('src', item.icon)
                    .attr('class', 'tpl-table-line-img')),
                $('<td>').attr('class', 'am-text-middle').append(item.name),
                $('<td>')
                .attr('class', 'am-text-middle')
                .append(item.description),
                $('<td>')
                .attr('class', 'am-text-middle')
                .append(
                    $('<div>')
                    .attr('class', 'tpl-table-black-operation')
                    .append(
                        $('<a>')
                        .attr('onclick', 'edit(' + item.id + ')')
                        .append($('<i>')
                            .attr('class', 'am-icon-pencil')
                            .append('编辑')),
                        $('<a>')
                        .attr('href', '')
                        .attr('class', 'tpl-table-black-operation-del')
                        .attr('onclick', 'del(' + item.id + ')')
                        .append($('<i>')
                            .attr('class', 'am-icon-trash')
                            .append('删除')
                        )
                    )
                )
            )
        )
    });
}

function addPage() {
    sessionStorage.editId = -1;
    window.location.href = './block-add.html';
}

function del(id) {
    console.log(id);
    $.ajax({
        url: 'http://localhost:8080/admin/block/id/' + id,
        type: 'DELETE',
        async: true,
        data: 'json',
        success: function (result) {
            console.log(result);
            ajaxBlock();
        },
        error: function (xhr) {
            alert(xhr);
        }
    })
}

function edit(id) {
    sessionStorage.editId = id;
    window.location.href = './block-add.html';
}

function logout() {
    sessionStorage.isLogin = false;
    window.location.href = './login.html';
}