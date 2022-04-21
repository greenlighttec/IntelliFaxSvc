const pageTableDiv = document.querySelector(".DivUsersTable");

let tableHeaders = [
	{ headerName: 'Client Name',
	  field: "Client.clientname",
	  sortable: true,
	  filter: true
	},
	{ headerName: 'Client ID',
	  field: "Client.id",
	},
	{ headerName: 'First Name',
	  field: "firstname",
	  sortable: true,
	  filter: true
	},
	{ headerName: "Last Name",
	  field: "lastname",
	  sortable: true,
	  filter: true
	},
	{ headerName: "Username",
	  field: "username",
	  sortable: true,
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
	fetch('/admin/api/getallusers') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
	.then(res => res.json())
	.then(accounts => {
		createTable(accounts) // Clears scoreboard div if it has any children nodes, creates & appends the table
		//console.log(accounts)
		// Iterates through all the objects in the scores array and appends each one to the table body
	})
}

getTableData()

pageTableDiv.addEventListener("click", function (event) {
	if (event.path[0].className == 'ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-focus') {
		var userId = event.path[1].attributes['row-id'].value
		var clientName = event.path[1].childNodes[0].innerText;
		var clientId = event.path[1].childNodes[1].innerText
		var firstName = event.path[1].childNodes[2].innerText
                var lastName = event.path[1].childNodes[3].innerText;
                var userName = event.path[1].childNodes[4].innerText
;
		document.getElementById('userId').value = userId
		document.getElementById('accountIdLabel').innerText = userId
		document.getElementById('userName').value = userName
                document.getElementById('userClientId').value = clientId
                document.getElementById('firstName').value = firstName
                document.getElementById('lastName').value = lastName
		document.getElementById('customerAccountButton').innerText = "Update User"
		document.getElementById('resetForm').disabled = false;
		document.getElementById('deleteUser').disabled = false;
	 }

});

function activateForm() {

	document.getElementById('resetForm').disabled = false;

}

function resetFormData() {
   var formControls = document.querySelectorAll('.card-body .form-control')

   document.getElementById('userId').value = null
   document.getElementById('accountIdLabel').innerText = "@"

   formControls.forEach( (control) => {control.value = null})


   document.getElementById('customerAccountButton').innerText = "Create Account"
   document.getElementById('resetForm').disabled = true;
   document.getElementById('deleteUser').disabled = true;


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

