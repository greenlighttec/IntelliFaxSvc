const pageTableDiv = document.querySelector(".DivDevicesTable");

let tableHeaders = [
	{ headerName: 'Client Name',
	  field: "Client.clientname",
	  sortable: true,
	  filter: true
	},
	{ headerName: 'Device Name',
	  field: "name",
	  sortable: true,
	  filter: true
	},
	{ headerName: 'MAC Address',
	  field: "macaddr",
	  sortable: true,
	  filter: true
	},
	{ headerName: 'Device Username',
	  field: "username",
	  sortable: true,
	  filter: true
	},
	{ headerName: "Line 1",
	  field: "line1",
	  filter: true
	},
	{ headerName: 'Line 2',
	  field: "line2",
	  filter: true
	},
	{ headerName: 'Created (UTC)',
	  field: "createdAt",
	  sortable: true
	},
	{ headerName: 'Updated (UTC)',
	  field: "updatedAt",
	  sortable: true
	}];

const createTable = (dataObject) => {

    const rowData = dataObject

    // let the grid know which columns and what data to use
    const gridOptions = {
      columnDefs: tableHeaders,
      getRowId: params => params.data.id,
      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
            return 'my-shaded-effect';
        }},
      rowData: rowData
    };

  new agGrid.Grid(pageTableDiv, gridOptions);


}

const getTableData = () => {
	fetch('/admin/api/getalldevices') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
	.then(res => res.json())
	.then(tableData => {
		createTable(tableData)
	})
}

getTableData()

pageTableDiv.addEventListener("click", function (event) {
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

});

function activateForm() {

	document.getElementById('resetForm').disabled = false;

}

function resetFormData() {
   document.getElementById('accountId').value = null
   document.getElementById('accountIdLabel').innerText = "@"
   document.getElementById('accountName').className = "form-control"
   document.getElementById('accountName').value = null
   document.getElementById('customerAccountButton').innerText = "Create Account"
   document.getElementById('resetForm').disabled = true;
   document.getElementById('deleteAccount').disabled = true;


}

function target_popup(form) {
    window.open('', 'formpopup', 'width=400,height=400,resizeable,scrollbars');
    form.target = 'formpopup';
    location.reload()

}

/*$(document).ready(function() {

	$('#myTable').DataTable();
'
})*/

