/* 加载数据*/
/*loadData = function(port, port_method, isAsync, data, successFunc) {
	var url = ("./") + port;
	$.ajax({
		url : url,
		type : 'POST',
		timeout : 60000,
		async : isAsync,
		contentType : "application/json; charset=utf-8",
		dataType : 'json',
		data : data,
		success : function(data) {
			successFunc(data);
		},
		error : function(data) {
			alert(data.responseJSON.meta.message);
		},
		beforeSend : function() {

		},
		complete : function() {

		}
	});
};*/

loadData = function(port, isAsync, data, headers, successFunc) {
	var url =("./") + port; 
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		headers: headers,
		async: isAsync,
		contentType : "application/json; charset=utf-8",
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


$('.btnAddSupplier').on('click', function() {
	submitSupplier();
});

function submitSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var coName = $("#coName").val();
	var coAbbName = $("#coAbbName").val();
	var coProfile = $("#coProfile").val();
	var name = $("#name").val();
	var mobile = $("#mobile").val();
	var email = $("#email").val();
	var data = {
		coName : coName,
		coAbbName : coAbbName,
		coProfile : coProfile,
		name : name,
		mobile : mobile,
		email : email
	};

	var dataJson = JSON.stringify(data);
	var port = "v1/createSupplier";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btnModitySupplier').on('click', function() {
	moditySupplier();
});

function moditySupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var coProfile = $("#mcoProfile").val();
	var mobile = $("#mmobile").val();
	var data = {
		supplierId : 1,
		coProfile : coProfile,
		mobile : mobile
	};

	var dataJson = JSON.stringify(data);
	var port = "v1/moditySupplier";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btnDeleteSupplier').on('click', function() {
	deleteSupplier();
});

function deleteSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var supplierId = $("#dId").val();
	var mobile = $("#mmobile").val();
	var data = {
		supplierId : supplierId
	};

	var dataJson = JSON.stringify(data);
	var port = "v1/deleteSupplier";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btnExportSupplier').on('click', function() {
	btnExportSupplier();
});
function btnExportSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var data = {
			pageSize : 2
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/exportSupplier";
	var successFunc = function(data) {
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
	};
	loadData(port, true, dataJson, headers, successFunc);
};


$('.searchSupplier').on('click', function() {
	searchSupplier();
});
function searchSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var coName = $("#searchCoName").val();
	var mobile = $("#searchMobile").val();
	var data = {
		coName : coName,
		mobile : mobile,
		pageSize : 2,
		pageIndex : 1
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/searchSupplier";
	var successFunc = function(data) {
		if (!data.meta.success) {
			return;
		}

		$("#tbody").empty();
		var dataList = data.dataList;
		for (var i = 0; i < dataList.length; i++) {
			var html = '<tr data-id="' + dataList[i].supplierId + '">' + '<td>'
					+ dataList[i].supplierId + '</td>' + '<td>'
					+ dataList[i].coName + '</td>' + '<td>'
					+ dataList[i].coAbbName + '</td>' + '<td>'
					+ dataList[i].coProfile + '</td>' + '<td>'
					+ dataList[i].supplierState + '</td>' + '<td>'
					+ dataList[i].name + '</td>' + '<td>' + dataList[i].mobile
					+ '</td>' + '<td>' + dataList[i].email + '</td>' + '<td>'
					+ dataList[i].createTimeStr + '</td>' + '<td>'
					+ dataList[i].updateTimeStr + '</td>' + '<td>'
					+ dataList[i].createName + '</td>' + '<td>'
					+ dataList[i].updateName + '</td>'
					+ '</tr>'

			$("#tbody").append(html);
		}

	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btnAddUserSupplier').on('click', function() {
	addUserSupplier();
});

function addUserSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var userId = "1";
	var supplierIds = "3,5,6";
	var data = {
		userId : userId,	
		supplierIds : supplierIds
	};

	var dataJson = JSON.stringify(data);
	var port = "v1/createUserSupplier";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btndeleteUserSupplier').on('click', function() {
	btndeleteUserSupplier();
});

function btndeleteUserSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var userId = "1";
	var data = {
			userId : userId
	};

	var dataJson = JSON.stringify(data);
	var port = "v1/deleteUserSupplier";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.searchUserSupplier').on('click', function() {
	searchUserSupplier();
});
function searchUserSupplier() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var data = {
		userId : 1
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/searchUserSupplier";
	var successFunc = function(data) {
		if (!data.meta.success) {
			return;
		}

		$("#tusersupplierbody").empty();
		var dataList = data.dataList;
		for (var i = 0; i < dataList.length; i++) {
			var html = '<tr data-id="' + dataList[i].id + '">' + '<td>'
					+ dataList[i].userId + '</td>' + '<td>'
					+ dataList[i].supplierId + '</td>' + '<td>'
					+ dataList[i].coName + '</td>'
					+ '</tr>'

			$("#tusersupplierbody").append(html);
		}

	};
	loadData(port, true, dataJson, headers, successFunc);
};

$(document).ready(function() {
	searchSupplier();
});
