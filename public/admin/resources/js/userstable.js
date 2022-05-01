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

    const gridOptions = {
      columnDefs: tableHeaders,
      rowSelection: 'single',
      getRowId: params => params.data.id,
      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
            return 'my-shaded-effect';
        }}
    };

function loadSelector(data) {
    data.forEach(client => { 
    $("#clientDropdownSelect").append('<option value="'+client.id+'">'+client.clientname+'</option>').selectpicker("refresh");;
    })
}

const refreshTableData = () => {
	fetch('/admin/api/getallusers')
	.then(res => res.json())
	.then(accounts => {
		gridOptions.api.setRowData(accounts)
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

pageTableDiv.addEventListener("click", function (event) {
	if (event.path[0].className == 'ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-focus') {
		var userId = event.path[1].attributes['row-id'].value
		var clientName = event.path[1].childNodes[0].innerText;
		var clientId = event.path[1].childNodes[1].innerText
		var firstName = event.path[1].childNodes[2].innerText
		var lastName = event.path[1].childNodes[3].innerText;
	 	var userName = event.path[1].childNodes[4].innerText;

		document.getElementById('userId').value = userId
		//document.getElementById('accountIdLabel').innerText = userId
		document.getElementById('userName').value = userName
 		//document.getElementById('userClientId').value = clientId
		document.getElementById('firstName').value = firstName
		document.getElementById('lastName').value = lastName

		jQuery("#clientDropdownSelect option").filter(function(){
		    return $.trim($(this).text()) == clientName
		}).prop('selected', true);
		$('#clientDropdownSelect').selectpicker('refresh');


		document.getElementById('customerAccountButton').innerText = "Update User"
		document.getElementById('resetForm').disabled = false;
		document.getElementById('deleteUser').disabled = false;
	 }

});

function activateForm() {

	document.getElementById('resetForm').disabled = false;

}

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
    document.getElementById('filter-text-box').value
  );
}

function resetFormData() {
   var formControls = document.querySelectorAll('.card-body .form-control')

   document.getElementById('userId').value = null
   document.getElementById('accountIdLabel').innerText = "account_circle"
   document.querySelectorAll('.ag-row-selected').forEach( (control) => {control.classList.remove('ag-row-selected')})

   formControls.forEach( (control) => {control.value = null})
   $("#clientDropdownSelect").val('default').selectpicker("refresh");



   document.getElementById('customerAccountButton').innerText = "Create Account"
   document.getElementById('resetForm').disabled = true;
   document.getElementById('deleteUser').disabled = true;


}

function target_popup(form) {
    if (document.querySelector('#userPassword').value != '') {document.querySelector('#userPasswordData').value = document.querySelector('#userPassword').value}
    window.open('', 'formpopup', 'width=400,height=400,resizeable,scrollbars');
    form.target = 'formpopup';
    location.reload()

}

