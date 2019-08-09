var curPage = 1;
window.onload =
  function () {
    //refreshPage(curPage);
    adminTemplate();
  }

function
adminTemplate() {
  var login = sessionStorage.isLogin;
 if (!login) {
    window.location.href = '/login';
  }
  var user = sessionStorage.getItem('user');
  document.getElementById('nickname').textContent = user;
  document.getElementById('nickname2').textContent = user;
  $('#avatar').attr('src', user.avatar)
}

function refreshPage(page) {
  ajaxPosts(page);
}

function ajaxPosts(page) {//直接一次性全部显示出来
  console.log('显示技术员列表:');
  $.ajax({
    url: 'http://127.0.0.1:8000/staff/list/',
    //这个得改！
    type: 'post',
    async: true,
    /*默认是true，即为异步方式，$.ajax执行后，会继续执行ajax后面的脚本，直到服务器端返回数据后，触发$.ajax里的success方法，这时候执行的是两个线程。若要将其设置为false
，则所有的请求均为同步请求，在没有返回值之前，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。*/
    data: 'json',
    success: function (result) {
      console.log(result);
      postTemplate(result);
    },
    error: function (xhr) {
      alert(xhr);
      console.log("没有数据！");
    }
  })
}

/**
 * 使用数据显示technician
 * @param  data
 */
function postTemplate(data) {
  var technicianlist = data;
  $('#technicians').html('')
  $.each(technicianlist, function (index, item) {

    $('#technicians').append($('<tr>')
      .attr('id',item.staff_id)
      .append(
      $('<td>').append(item.staff_id), 
      $('<td>').append(item.name),
      $('<td>').append(item.email), 
      $('<td>').append(item.phone),
      $('<td>').append(item.status), 
      $('<td>').append(item.last_time),
      $('<td>').append($('<button>')//<a class="am-btn am-btn-link">链接</a>
        .attr('class','am-btn am-btn-primary am-btn-xs')//
        .attr('id',item.staff_id)
        .attr('onclick','modifystaff('+JSON.stringify(item)+')')
        .append("修改")
      ),
      $('<td>').append($('<input>')
        //.attr('class','am-checkbox')
        .attr('type','checkbox')
        .attr('class','am-checkbox am-hide')
        .attr('id',item.staff_id+'check')
        .attr('data-am-ucheck','')
      )
      //$('<td>').append($('<input>')
       // .attr('type','radio')
        //.attr('class','am-radio')//
        //.attr('id',item.staff_id+'modify')
        //.attr('data-am-ucheck','')
      //)
      )
      )
  })
  $.each($('.status'), function (index, item) {
   // var id = '#' + item.id;

    var id=item.id;

    $(id).change(function () {
      console.log(item.id);
      console.log($(id).val());
      //changeStatus(item.id, $(id).val());
    })
  })
  // onchange函数
}


function
logout() {
  sessionStorage.isLogin = false;
  window.location.href = '/login';
}


//$()
//文件上传函数，传递了excel表格的内容（json格式）给后端
function
parsefile(){
 $('#file').change(function(e) {
            console.log("传递成功");
            var files = e.target.files;
            var fileReader = new FileReader();
            fileReader.onload = function(ev) {
                try {
                    var data = ev.target.result,
                        workbook = XLSX.read(data, {
                            type: 'binary'
                        }), // 以二进制流方式读取得到整份excel表格对象
                        technicians = []; // 存储获取到的数据
                } catch (e) {
                    console.log('文件类型不正确');
                    return;
                }
                // 表格的表格范围，可用于判断表头数量是否正确
                var fromTo = '';
                // 遍历每张表读取
                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                        console.log(fromTo);//打印表格范围
                technicians =technicians.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                /*使用XLSX.utils.sheet_to_json方法解析表格对象返回相应的JSON数据 */
                         break; // 如果只取第一张表，就取消注释这行
                    }
                }
                //现在已经是json数据了

                console.log(technicians);//打印获取的数据
                $.ajax({
                 url: 'http://127.0.0.1:8000/staff/addMultiple',//'http://localhost:8080/admin/post/page/' + page
                type: 'POST',
                ContentType:'application/x-www-form-urlencoded;charset=utf-8',
                async: true,
                dataType:'json',
                data: JSON.stringify(technicians),
              success: function (result) {
                console.log("数据传递成功！");
                alert(result);
                window.location.reload();
             },
             error: function (jqXHR, textStatus, errorThrown) {
                    /*弹出jqXHR对象的信息*/
                    console.log("jqXHR.responseText");
                    console.log(jqXHR.responseText);
                    console.log("jqXHR.status");
                    console.log(jqXHR.status);
                    console.log("jqXHR.readyState");
                    console.log(jqXHR.readyState);
                    console.log("jqXHR.statusText");
                    console.log(jqXHR.statusText);
                    /*弹出其他两个参数的信息*/
                    console.log("textStatus");
                    console.log(textStatus);
                    console.log("errorThrown");
                    console.log(errorThrown);
            }

              })
            };
            // 以二进制方式打开文件
            fileReader.readAsBinaryString(files[0]);
        });
}


function
addconvention(){
  //$('#myuploadbutton').attr('class','am-btn am-btn-primary');
  window.location.href = '/staff/addconvention';
  //跳转到公约界面
}


 //搜索传递给后端名字的函数
 function
 search(){
 // var staff_name = $('#findstaff_name').val();
  var staffnamejson={"name":$('#findstaff_name').val()};
  staffnamejson.name = staffnamejson.name.toString();
  $.ajax({
    url: 'http://127.0.0.1:8000/staff/nickname',//url  http://127.0.0.1:8000/user/nickname
    type: 'post',
    async: true,
    dataType: 'json',
    data: staffnamejson,
    success: function (data) {
      console.log(data);
      console.log("传递名字成功");
      postTemplate(data);
    },
    error: function (xhr) {
      alert(xhr);
    }
  })  
 }
/*
//如果搜索框是空，传回的数据会是整个表嘛（所有技术员）？
 function
 searchshow(){
   $.ajax({
    url: '',
    //这个得改！
    type: 'GET',
    async: true,
    默认是true，即为异步方式，$.ajax执行后，会继续执行ajax后面的脚本，直到服务器端返回数据后，触发$.ajax里的success方法，这时候执行的是两个线程。若要将其设置为false
，则所有的请求均为同步请求，在没有返回值之前，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
    data: 'json',
    success: function (result) {
      console.log(result);
      postTemplate(result);
    },
    error: function (xhr) {
      alert(xhr);
      console.log("没有数据！");
    }
  })
 }
*/
 function
 deletestaff(){
  $('.am-hide').attr('class','am-checkbox');
  $('#delete_button').attr('class','am-btn am-btn-primary am-disabled');
  $('#confirm_delete').attr('class','am-btn am-btn-primary');
 }




 function
 confirmdelete(){
  $('.am-checkbox').attr('class','am-checkbox am-hide');
  $('#delete_button').attr('class','am-btn am-btn-primary');
  $('#confirm_delete').attr('class','am-btn am-btn-primary am-disabled');
  //点击确认删除后查看哪些复选框被选中，这时候的class是notam-hide 
  //如果被选中，那么checked=true  .attr('checked')
  //遍历整个表格，如果复选框被选中，那么将这一行的id也就是staff_id传回
  var mytable = document.getElementById("technicians");
  console.log(mytable)
  var data=[];
  var rows=0;
   for(var i=0,rows=mytable.rows.length; i<rows; i++){
         // data[i] ="";
          console.log($('#'+mytable.rows[i].cells[0].innerHTML+'check'))
          if($('#'+mytable.rows[i].cells[0].innerHTML+'check').is(':checked')){
            //如果这一行的复选框被选中，那么记录下这一行的id
            data[i] =mytable.rows[i].cells[0].innerHTML;
           
          }
          //console.log(data[i]);//如果没被赋值就是undefined
    }

    var deletedrows=[];var j=0;
    var jsonstring="{\"data\":[";//{"data":[
     for(var i=0,rows=mytable.rows.length; i<rows; i++){
         // data[i] ="";
          if(data[i]){
            //如果这一行的复选框被选中，那么记录下这一行的id
            jsonstring+="{\"staff_id\":\""+data[i]+"\"},";
            deletedrows[j]=i;
            j++;
          }
         // console.log(data[i]);//如果没被赋值就是undefined
    }
    jsonstring+="]}";
    jsonstring[jsonstring.length-3]='';
//    console.log(jsonstring);//这个就是传过去的json

        for(var i=0; i<deletedrows.length; i++){
         // data[i] ="";
            //如果这一行的复选框被选中，那么记录下这一行的id
            mytable.deleteRow(deletedrows[i]-i);//i也可以表示前面已经删除了几行
        }
         // console.log(data[i]);//如果没被赋值就是undefined


    //这个是为了后端删除，前端单独自己删除
    $.ajax({
    url: 'http://127.0.0.1:8000/staff/delete',
    type: 'POST',
    async: true,
    data: jsonstring,
    success: function (data) {
      alert(data);
      console.log("传递删除id成功");
    },
    error: function (xhr) {
      alert(xhr);
    }
  })  
}

//单个增加技术员
function
addstaff(){
//跳转到technician-add.html
//如果需要注释掉就注释掉
window.location.href = '/index/technician-list/technician-add';
}

//修改技术员信息
function
modifystaff(staff_id,name,email,phone,status){
  //item=JSON.stringify(item);
  console.log(name);
  window.location.href='/index/technician-list/technician-modify?staff_id='+staff_id+'&name='+name+'&email='+email+'&phone='+phone+'&status='+status;
  //"name":"石静","email":"123456@qq.com","phone":"123456","status":"0","last_time":"1234"
  //跳转界面过程中传递了参数
}
