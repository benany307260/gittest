/* 加载数据
loadData = function(port, port_method, isAsync, data, successFunc) {
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

$('.btnAddCostSub').on('click', function() {
	btnAddCostSub();
});

function btnAddCostSub() {
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var subCode = '3001IT03';
	var subName = '营运及数码支持-IT治理基础协同-信息安全';
	var subjectCode = '2000002112';
	var subjectName = 'WS系统专项保护';
	var assetsCode = 'PA-J002000002112-18001-3030';
	var assetsName = '数据库加密设备1台';
	var data = {
		subCode : subCode,
		subName : subName,
		subjectCode : subjectCode,
		subjectName : subjectName,
		assetsCode : assetsCode,
		assetsName : assetsName
	};

	var dataJson = JSON.stringify(data);
	var port = "v1/createCostSub";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btnmodityCostSub').on('click', function() {
	btnmodityCostSub();
});

function btnmodityCostSub() {
	var subCode = '3001IT03';
	var subName = '营运及数码支持-IT治理基础协同-信息安全';
	var subjectCode = '2000002112';
	var subjectName = 'WS系统专项保护';
	var assetsCode = 'PA-J002000002112-18001-3030';
	var assetsName = '数据库加密设备1台';
	var data = {
		subCode : subCode,
		subName : subName,
		subjectCode : subjectCode,
		subjectName : subjectName,
		assetsCode : assetsCode,
		assetsName : assetsName
	};
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var dataJson = JSON.stringify(data);
	var port = "v1/modityCostSub";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.btndeleteCostSub').on('click', function() {
	btndeleteCostSub();
});

function btndeleteCostSub() {
	var costsubId = '';
	var data = {
		costsubId : costsubId
	};
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var dataJson = JSON.stringify(data);
	var port = "v1/deleteCostSub";
	var successFunc = function(data) {
		alert(data.meta.message);
	};
	loadData(port, true, dataJson, headers, successFunc);
};

$('.searchCostSub').on('click', function() {
	searchCostSub();
});
function searchCostSub() {
	var subCode = '';
	var subName = '';
	var subjectCode = '';
	var subjectName = '';
	var assetsCode = '';
	var assetsName = '';
	var data = {
		subCode : subCode,
		subName : subName,
		subjectCode : subjectCode,
		subjectName : subjectName,
		assetsCode : assetsCode,
		assetsName : assetsName,
		pageSize : 2,
		pageIndex : 1
	};
	var storage=window.localStorage;
	var token = storage.token;
	
	// 除登录接口，或特殊要求，所有接口都需要传token，以及client_name设置为jwt
    var headers= {
        token: token,
        client_name: 'jwt'
    };
	var dataJson = JSON.stringify(data);
	var port = "v1/searchcostsub";
	var successFunc = function(data) {
		if (!data.meta.success) {
			return;
		}

		$("#costSubbody").empty();
		var dataList = data.dataList;
		for (var i = 0; i < dataList.length; i++) {
			var html = '<tr data-id="' + dataList[i].costsubId + '">' + '<td>'
					+ dataList[i].costsubId + '</td>' + '<td>'
					+ dataList[i].subCode + '</td>' + '<td>'
					+ dataList[i].subName + '</td>' + '<td>'
					+ dataList[i].subjectCode + '</td>' + '<td>'
					+ dataList[i].subjectName + '</td>' + '<td>'
					+ dataList[i].assetsCode + '</td>' + '<td>' 
					+ dataList[i].assetsName+ '</td>' + '<td>' 
					+ dataList[i].dateYear + '</td>' + '<td>'
					+ dataList[i].costsubState + '</td>' + '<td>'
					+ dataList[i].createUserid + '</td>' + '<td>'
					+ dataList[i].updateUserid + '</td>' + '<td>'
					+ dataList[i].createTimeStr + '</td>' + '<td>'
					+ dataList[i].updateTimeStr + '</td>' + '</tr>'

			$("#costSubbody").append(html);
		}

	};
	loadData(port, true, dataJson, headers, successFunc);
};
$(document).ready(function() {
	// searchSupplier();
});
