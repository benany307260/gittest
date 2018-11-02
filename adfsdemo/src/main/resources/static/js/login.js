



function submitUserLogin() {
	
	var newUrl = '/login';    //设置新提交地址
    $("#loginForm").attr('action',newUrl);    //通过jquery为action属性赋值
    $("#loginForm").submit();    //提交ID为myform的表单
};

/*$(document).ready(function(){
	showErrMsg();
});*/

/*function showErrMsg() {
	
	var error = $("#errMsg").val();
	console.log("3333");
	console.log("aaa:"+$("#errorText").html());
	$("#errorText").html(error);
};*/