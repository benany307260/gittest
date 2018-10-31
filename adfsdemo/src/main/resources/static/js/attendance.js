function fileChange(){
	var url = ("./") + "v1/importAttendance";
        $.ajax({
            url: url,　　　　　　　　　　// 上传地址
            type: 'POST',
            cache: false,　　
            data: new FormData($('#uploadForm')[0]),　　　　　　　　　　　　　// 表单数据
            processData: false,
            contentType: false,
            success:function(data){
            	alert('OK');
            }
        });
}

$('.btnExport').on('click', function() {
	submitExport();
});

function submitExport() {
	var name = $("#searchName").val();
	var coName = $("#searchCoName").val();
	var beginAttDate = $("#searchBegin").val();
	var endAttDate = $("#searchEnd").val();
	var data = {
		name : name,
		coName : coName,
		beginAttDate : beginAttDate,
		endAttDate : endAttDate
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/exportAttendance";
	var successFunc = function(data) {
		if (!data.meta.success) {
			alert('导入完成');
			return;
		}
	};
	loadData(port, null, true, dataJson, successFunc);
};

$('.searchAtt').on('click', function() {
	searchAtt();
});
function searchAtt() {
	var name = $("#searchName").val();
	var team = $("#searchTeam").val();
	var beginAttDate = $("#searchBegin").val();
	var endAttDate = $("#searchEnd").val();
	var data = {
		name : name,
		team : team,
		beginAttDate : beginAttDate,
		endAttDate : endAttDate,
		pageSize : 5,
		pageIndex : 1
	};
	var dataJson = JSON.stringify(data);
	var port = "v1/searchAttendance";
	var successFunc = function(data) {
		if (!data.meta.success) {
			return;
		}

		$("#tbody").empty();
		var dataList = data.dataList;
		for (var i = 0; i < dataList.length; i++) {
			var html = '<tr data-id="' + dataList[i].attId + '">' + '<td>'
					+ dataList[i].attId + '</td>' + '<td>'
					+ dataList[i].userId + '</td>' + '<td>'
					+ dataList[i].name + '</td>' + '<td>'
					+ dataList[i].coName + '</td>' + '<td>'
					+ dataList[i].team + '</td>' + '<td>'
					+ dataList[i].attDateStr + '</td>' + '<td>'
					+ dataList[i].attWeek + '</td>' + '<td>' 
					+ dataList[i].toWorkStr + '</td>' + '<td>' 
					+ dataList[i].offWorkStr + '</td>' + '<td>'
					+ dataList[i].attExplain + '</td>' + '<td>'
					+ dataList[i].overtimeStr + '</td>' + '<td>'
					+ dataList[i].dateType + '</td>' + '<td>'
					+ dataList[i].ondutyTimeStr + '</td>' + '<td>'
					+ dataList[i].attResult + '</td>'
					+ '</tr>'

			$("#tbody").append(html);
		}

	};
	loadData(port, null, true, dataJson, successFunc);
};

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
