const pageTableDiv = document.querySelector(".DivCustomerTable");

let tableHeaders = [
        { headerName: 'Client ID',
          field: "id",
          sortable: true,
          filter: true
        },
        { headerName: 'Customer Name',
          field: "clientname",
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

// let the grid know which columns and what data to use
 const gridOptions = {
      columnDefs: tableHeaders,
      getRowId: params => params.data.id,
      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
            return 'my-shaded-effect';
        }}
    };

async function refreshTableData()  {
 let response = await fetch('/admin/api/getallaccounts');
 let accounts = await response.json();
 //accounts.map(i => console.log(i));
 gridOptions.api.setRowData(accounts)
}


document.addEventListener('DOMContentLoaded', async function () {
  new agGrid.Grid(pageTableDiv, gridOptions);
 refreshTableData()
});


pageTableDiv.addEventListener("click", function (event) {
	if (event.srcElement.className == 'ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-focus') {
		var agRow = event.__agComponent.eRow
		var clientId = agRow.children[0].innerText;
		var clientName = agRow.children[1].innerText;
		document.getElementById('accountId').value = clientId
		document.getElementById('accountIdLabel').innerText = clientId
		document.getElementById('accountName').className = "form-control active"
		document.getElementById('accountName').value = clientName
		document.getElementById('customerAccountButton').innerText = "Update Account"
		document.getElementById('resetForm').disabled = false;
		document.getElementById('deleteAccount').disabled = false;
	 }

});

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
    document.getElementById('filter-text-box').value
  );
}

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

