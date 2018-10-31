
$('.btnUserLogin').on('click', function(){
	submitUserLogin();
});



function submitUserLogin() {
	
	var newUrl = '/news/';    //设置新提交地址
    $("#loginForm").attr('action',newUrl);    //通过jquery为action属性赋值
    $("#loginForm").submit();    //提交ID为myform的表单
};


$('.btnGetUser').on('click', function(){
	getUser();
});

function getUser() {
	
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
    
    var port = "user/detail";
    var successFunc = function(respData) {
    	if(respData == null)
    	{
    		$("#spanCurUserInfo").text("失败");
    		return;
    	}
    	
    	if(!respData.meta.success)
    	{
    		$("#spanCurUserInfo").text("失败。"+respData.meta.message);
    		return;
    	}
    	
    	// 处理登录成功
    	
    	$("#spanCurUserInfo").text("登录名："+respData.data.username+"，uid："+respData.data.uid);
    	
    };
    loadDataPost(port, true, null, headers, successFunc);
};

function download2() {

	var url =("./") + "v1/exportStaffFee"; 

		var storage=window.localStorage;
		var token = storage.token;
		
		var data = {
	    		feeDate: "201809"
		};
	   
	   var xhr = new XMLHttpRequest();

	   xhr.open('POST', url, true);        // 也可以使用POST方式，根据接口
	   
	   xhr.setRequestHeader( 'token', token );
	   xhr.setRequestHeader( 'client_name', 'jwt' );
	   xhr.setRequestHeader( 'content-type', 'application/json; charset=utf-8' );

	   xhr.responseType = "blob";    // 返回类型blob

	   // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑

	   xhr.onload = function () {

	       // 请求完成

	       if (this.status === 200) {

	           // 返回200

	           var blob = this.response;

	           var reader = new FileReader();

	           reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a表情href

	           reader.onload = function (e) {

	               // 转换完成，创建一个a标签用于下载

	               var a = document.createElement('a');

	               a.download = 'data.xlsx';

	               a.href = e.target.result;

	               $("body").append(a);    // 修复firefox中无法触发click

	               a.click();

	               $(a).remove();

	           }

	       }

	   };

	   // 发送ajax请求

	   xhr.send(JSON.stringify(data))

}

function download()
{
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
    
    var data = {
    		feeDate: ""
	};
    
    var url =("./") + "v1/exportStaffFee"; 
    
    var filename = 'test.xlsx';
    
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        headers:headers,
        data:JSON.stringify(data) ,
        success: function(data){
          var blob = new Blob(['\uFEFF'+data],{type:'application/vnd.ms-excel'})
          if (window.navigator.msSaveOrOpenBlob) {
                      navigator.msSaveBlob(blob, filename);
                  } else {

                  var a = document.createElement('a');
                   var url = createObjectURL(blob);
                   a.href = url;
                   a.download = filename;
                   a.click();
                   window.URL.revokeObjectURL(url);
                  }
        }
      });	

}

function createObjectURL(object) { return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object); }

function download3()
{
	 var url =("./") + "v1/exportStaffFee";
	 
		var storage=window.localStorage;
		var token = storage.token;
		
		// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
	    var headers= {
	        token: token,
	        client_name: 'jwt'
	    };
	    var data = {
	    		feeDate: ""
		};
	 
	    $.ajax({
	        type: "POST",
	        contentType: "application/json; charset=utf-8",
	        url: url,
	        headers:headers,
	        data: JSON.stringify(data),
	        success: function(response, status, request) {
	            var disp = request.getResponseHeader('Content-Disposition');
	            if (disp && disp.search('attachment') != -1) {  //判断是否为文件
	                var form = $('<form method="POST" action="' + url + '">');
	                $.each(data, function(k, v) {
	                    form.append($('<input type="hidden" name="' + k +
	                            '" value="' + v + '">'));
	                });
	                $('body').append(form);
	                form.submit(); //自动提交
	            }
	        }
	    });
}

$('.btnGetSplit').on('click', function(){
	getSplit();
});

function getSplit() {
	
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
    
    var data = {
    		userFeeId: 179
	};
    
    var port = "v1/getStaffFeeSplit";
    var successFunc = function(respData) {
    	if(respData == null)
    	{
    		$("#spanCurUserInfo").text("失败");
    		return;
    	}
    	
    	if(!respData.meta.success)
    	{
    		$("#spanCurUserInfo").text("失败。"+respData.meta.message);
    		return;
    	}
    	
    	// 处理登录成功
    	
    	$("#spanCurUserInfo").text("登录名："+respData.data.username+"，uid："+respData.data.uid);
    	
    };
    loadDataPost(port, true, data, headers, successFunc);
};

