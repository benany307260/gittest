
/* 加载数据*/
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
};


$('.btnAddPmt').on('click', function() {
	submitData();
});

function submitData() {

	var userId = $("#userId").val();
	var team = $("#team").val();
	var oldLvl = $("#oldLvl").val();
	var pmtLvl = $("#pmtLvl").val();
	var applyUserid = $("#applyUserid").val();
	var pmtDesc = $("#pmtDesc").val();
	var team = $("#team").val();
	var data = {
		userId : userId,
		team : team,
		oldLvl : oldLvl,
		pmtLvl : pmtLvl,
		applyUserid : applyUserid,
		pmtDesc : pmtDesc
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/createPmt";
	var successFunc = function(data) {
		alert("成功");
	};
	loadData(port, null, true, dataJson, successFunc);
};

$('.btnSearchPmt').on('click', function() {
	loadPmtRec();
});
function loadPmtRec() {
	var searchUserId = $("#searchUserId").val();
	var searchTeam = $("#searchTeam").val();
	var data = {
			userId : searchUserId,
			team : searchTeam,
			pageSize : 2,
			pageIndex : 1
	};

	var dataJson = JSON.stringify(data);

	var port = "v1/searchPmtRec";

	var successFunc = function(data) {
		if (!data.meta.success) {
			return;
		}
		$("#tbody").empty();
		var dataList = data.dataList;
		for (var i = 0; i < dataList.length; i++) {
			var html = '<tr data-id="' + dataList[i].pmtId + '">' 
			+ '<td>'+ dataList[i].pmtId + '</td>' 
			+ '<td>' + dataList[i].userId+ '</td>' 
			+ '<td>' + dataList[i].name+ '</td>'
			+ '<td>' + dataList[i].team + '</td>'
			+ '<td>'+ dataList[i].effTime + '</td>' 
			+ '<td>' + dataList[i].oldLvl+ '</td>' 
			+ '<td>' + dataList[i].pmtLvl + '</td>'
			+ '<td>'+ dataList[i].applyUserid + '</td>' 
			+ '<td>' + dataList[i].applyType+ '</td>' 
			+ '<td>' + dataList[i].auditState + '</td>'
			+ '<td>'+ dataList[i].pmtDesc + '</td>' 
			+ '<td>' + dataList[i].updateUserid+ '</td>' 
			+ '<td>' + dataList[i].createTime + '</td>'
			+ '<td>' + dataList[i].updateTime + '</td>'
			+ '</tr>'

			$("#tbody").append(html);
		}

	};

	loadData(port, null, true, dataJson, successFunc);
};

$('.btnmodityPmt').on('click', function() {
	submitModityData();
});

function submitModityData() {

	var pmtId = $("#pmtId").val();
	var pmtDesc = $("#modiPmtDesc").val();
	var data = {
		pmtId : pmtId,
		pmtDesc : pmtDesc
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/modityPmtRec";
	var successFunc = function(data) {
		alert("成功");
	};
	loadData(port, null, true, dataJson, successFunc);
};

$(document).ready(function() {
	//loadUser();
});
