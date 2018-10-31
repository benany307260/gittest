


   /* 加载数据*/
	loadData = function(port, port_method, isAsync, data, successFunc) {
		var url =("./") + port; 
		$.ajax({
			url: url,
			type: 'POST',
			timeout: 60000,
			async: isAsync,
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: data,
			success: function(data){
				//var resdata = data.data, rescode = data.meta.success , message = data.meta.message;
				//alert(message+"----"+resdata);
				successFunc(data);
			},
			error:function(data){
				alert(data.responseJSON.meta.message);
			},
			beforeSend: function(){
		      
		   },
		   complete: function(){
			  
		   }
		});
	};
	
	loadDataPost = function(port, isAsync, data, headers, successFunc) {
		var url =("./") + port; 
		$.ajax({
			url: url,
			type: 'POST',
			timeout: 60000,
			headers: headers,
			async: isAsync,
			dataType: 'json',
			data: data,
			success: function(data){
				//var resdata = data.data, rescode = data.meta.success , message = data.meta.message;
				//alert(message+"----"+resdata);
				successFunc(data);
			},
			error:function(data){
				alert(data.responseJSON.meta.message);
			},
			beforeSend: function(){
		      
		   },
		   complete: function(){
			  
		   }
		});
	};

	/* 限制点击的特殊加载数据*/
	sploadData = function(port, port_method, isAsync,data, successFunc) {
		var localToken=modToken,
			url =("../") + ( port.match(/\?/g) ? (port + localToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method); 
		$.ajax({
			url: url,
			type: 'POST',
			timeout: 60000,
			async: isAsync,
			dataType: 'json',
			data: data,
			success: function(data){
				successFunc(data);
			},
			error:function(){
				clearTimeout(handler);
				var handler = setTimeout(function(){$('.js-loading').hide();},0);
			},
			beforeSend: function(){
		      $('.js-loading').show();
		   },
		   complete: function(){
			   clearTimeout(handler);
			   var handler = setTimeout(function(){$('.js-loading').hide();},0);
		   }
		});
	};
	/*发送数据*/
	sendData = function(url,data, successFunc) {
		$.ajax({
			url:("../") + url,
			type: 'POST',
			timeout: 60000,
			async: true,
			dataType: 'json',
			data: data,
			success: successFunc,
			error:function(){
				window.location.assign("domainURL");
			}
		});
	};
			



/*支付跳转新窗口，返回html*/
function loadData_charge(port, port_method, isAsync,data, successFunc) {
	var url =("../") + ( port.match(/\?/g) ? (port + modToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method); 
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		async: isAsync,
		dataType: 'html',
		data: data,
		success: successFunc,
		error:function(){
			clearTimeout(handler);
			var handler = setTimeout(function(){$('.js-loading').hide();},0);
		},
		beforeSend: function(){
		  $('.js-loading').show();
		},
		complete: function(){
		   clearTimeout(handler);
		   var handler = setTimeout(function(){$('.js-loading').hide();},0);
		}
	});
};


function loadData_charge_json(port, port_method, isAsync,data, successFunc) {
	var url =("../") + ( port.match(/\?/g) ? (port + modToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method); 
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		async: isAsync,
		dataType: 'json',
		data: data,
		success: successFunc,
		error:function(){
			clearTimeout(handler);
			var handler = setTimeout(function(){$('.js-loading').hide();},0);
		},
		beforeSend: function(){
		  $('.js-loading').show();
		},
		complete: function(){
		   clearTimeout(handler);
		   var handler = setTimeout(function(){$('.js-loading').hide();},0);
		}
	});
};


function submitData() {
	
	var advertiserName = $("#txtName").val();
	var description = $("#txtdesc").val();
    var data = {
    		advertiserName: advertiserName,
    		description: description
	};
    
    var dataJson = JSON.stringify(data);
    
    var port = "advertiser";
    var successFunc = function(data) {
            alert("成功");
    };
    loadData(port, null, true, dataJson, successFunc);
};

$('.btnAdd').on('click', function(){
	submitData();
});


$('.btnAddUser').on('click', function(){
	submitUser();
});

function submitUser() {
	
	var name = $("#txtUserName").val();
	var account = $("#txtUserAccount").val();
    var data = {
    		name: name,
    		account: account
	};
    
    var dataJson = JSON.stringify(data);
    
    var port = "user";
    var successFunc = function(data) {
    	var resdata = data.data, rescode = data.meta.success , message = data.meta.message;
    	if(data.meta.success)
    	{
    		loadUser();
    		alert("保存成功");
    	}
    };
    loadData(port, null, true, dataJson, successFunc);
};

function loadUser() {
	
	//var name = $("#txtUserName").val();
	//var account = $("#txtUserAccount").val();
    var data = {
    		name: "",
    		account: ""
	};
    
    var dataJson = JSON.stringify(data);
    
    var port = "searchUser";
    
    var successFunc = function(data) {
    	if(!data.meta.success)
    	{
    		return;
    	}
		
		$("#tbody").empty();
		var dataList = data.data;
		for (var i = 0; i < dataList.length; i++) 
		{
			var html = '<tr data-id="' + dataList[i].id + '">'
					+ '<td>' + dataList[i].id + '</td>'
					+ '<td>' + dataList[i].name + '</td>'
					+ '<td>' + dataList[i].account + '</td>'
					+ '</tr>'
				
			$("#tbody").append(html);
		}
		
	};
    
   /* var successFunc = function(data) {
    	var resdata = data.data, rescode = data.meta.success , message = data.meta.message;
    	if(data.meta.success)
    	{
    		alert("保存成功");
    	}
    };*/
    loadData(port, null, true, dataJson, successFunc);
};


$(document).ready(function(){
	//loadUser();
});

