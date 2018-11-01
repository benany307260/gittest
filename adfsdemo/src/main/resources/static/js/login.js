
/*$('.btnUserLogin').on('click', function(){
	submitUserLogin();
});*/



function submitUserLogin() {
	
	var newUrl = '/login';    //设置新提交地址
    $("#loginForm").attr('action',newUrl);    //通过jquery为action属性赋值
    $("#loginForm").submit();    //提交ID为myform的表单
};


