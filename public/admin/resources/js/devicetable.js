const pageTableDiv = document.querySelector(".DivDevicesTable");

let tableHeaders = [
	{
		headerName: 'Client Name',
		field: "Client.clientname",
		sortable: true,
		filter: true
	},
	{
		headerName: 'Device Name',
		field: "name",
		sortable: true,
		filter: true
	},
	{
		headerName: 'MAC Address',
		field: "macaddr",
		sortable: true,
		filter: true
	},
	{
		headerName: 'Device Username',
		field: "username",
		sortable: true,
		filter: true
	},
	{
		headerName: "Line 1",
		field: "line1",
		filter: true
	},
	{
		headerName: 'Line 2',
		field: "line2",
		filter: true
	},
	{
		headerName: 'Created (UTC)',
		field: "createdAt",
		sortable: true
	},
	{
		headerName: 'Updated (UTC)',
		field: "updatedAt",
		sortable: true
	}];


const gridOptions = {
	columnDefs: tableHeaders,
	rowSelection: 'single',
	getRowId: params => params.data.id,
	getRowClass: params => {
		if (params.node.rowIndex % 2 === 0) {
			return 'my-shaded-effect';
		}
	},
	onRowSelected: (event) => {populateForm(event)}
};

function populateForm(event) {
	if (event.node.selected) {
		console.log(event)
		let selectedData = event.data
		var clientName = selectedData.Client.clientname
		var deviceId = selectedData.id
		var deviceLine1 =  selectedData.line1
		var deviceLine2 = selectedData.line2
		var deviceMacaddr = selectedData.macaddr
		var deviceName = selectedData.name
		var deviceUsername = selectedData.username
		document.getElementById('deviceId').value = deviceId
		document.getElementById('deviceName').innerText = deviceName
		document.getElementById('deviceAuthName').innerText = deviceUsername
		document.getElementById('deviceLine1').innerText = deviceLine1
		document.getElementById('deviceLine2').innerText = deviceLine2
		document.getElementById('deviceMacaddr').innerText = deviceMacaddr
		//document.getElementById('accountName').className = "form-control active"
		//document.getElementById('accountName').value = clientName

		jQuery("#clientDropdownSelect option").filter(function(){
		    return $.trim($(this).text()) == clientName
		}).prop('selected', true);
		$('#clientDropdownSelect').selectpicker('refresh');

		document.getElementById('customerAccountButton').innerText = "Update Account"
		document.getElementById('resetForm').disabled = false;
		document.getElementById('deleteAccount').disabled = false;

	}
	
}
function loadSelector(data) {
	data.forEach(client => {
		$("#clientDropdownSelect").append('<option value="' + client.id + '">' + client.clientname + '</option>').selectpicker("refresh");;
	})
}

async function refreshTableData() {
	fetch('/admin/api/getalldevices') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
		.then(res => res.json())
		.then(tableData => {
			gridOptions.api.setRowData(tableData)
		})
}

const refreshSelectorData = () => {
	fetch('/admin/api/getallaccounts')
		.then(res => res.json())
		.then(data => {
			loadSelector(data)
		})
}


document.addEventListener('DOMContentLoaded', async function () {
	new agGrid.Grid(pageTableDiv, gridOptions);
	refreshTableData()
	refreshSelectorData()
});

/* pageTableDiv.addEventListener("click", function (event) {
	if (event.path[0].className == 'ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-focus') {
		var clientId = event.path[1].childNodes[0].innerText;
		var clientName = event.path[1].childNodes[1].innerText;
		document.getElementById('accountId').value = clientId
		document.getElementById('accountIdLabel').innerText = clientId
		document.getElementById('accountName').className = "form-control active"
		document.getElementById('accountName').value = clientName
		document.getElementById('customerAccountButton').innerText = "Update Account"
		document.getElementById('resetForm').disabled = false;
		document.getElementById('deleteAccount').disabled = false;
	}

}); */

function activateForm() {

	document.getElementById('resetForm').disabled = false;

}

function resetFormData() {

	var formControls = document.querySelectorAll('.card-body .form-control')

	/*document.getElementById('accountId').value = null
	document.getElementById('accountIdLabel').innerText = "@"
	document.getElementById('accountName').className = "form-control"
	document.getElementById('accountName').value = null */
	
	formControls.forEach( (control) => {control.value = null})
   $("#clientDropdownSelect").val('default').selectpicker("refresh");
	
	document.getElementById('customerAccountButton').innerText = "Create Account"
	document.getElementById('resetForm').disabled = true;
	document.getElementById('deleteAccount').disabled = true;


}

function target_popup(form) {
	window.open('', 'formpopup', 'width=400,height=400,resizeable,scrollbars');
	form.target = 'formpopup';
	location.reload()

}

function onFilterTextBoxChanged() {
	gridOptions.api.setQuickFilter(
		document.getElementById('filter-text-box').value
	);
}

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
  })