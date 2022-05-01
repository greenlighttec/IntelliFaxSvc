const pageTableDiv = document.querySelector(".DivFaxNumberTable");

let tableHeaders = [
	{ headerName: 'Client Name',
	  field: "Client.clientname",
	  sortable: true,
	  filter: true
	},
	{ headerName: 'Phone Number',
	  field: "phonenumber",
	  sortable: true,
	  filter: true
	},
	{ headerName: "Line #",
	  field: "line"
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

const refreshTableData = () => {
	fetch('/admin/api/getallphonenumbers') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
	.then(res => res.json())
	.then(accounts => {
		gridOptions.api.setRowData(accounts) // Clears scoreboard div if it has any children nodes, creates & appends the table
		//console.log(accounts)
		// Iterates through all the objects in the scores array and appends each one to the table body
	})
}

document.addEventListener('DOMContentLoaded', async function () {
  new agGrid.Grid(pageTableDiv, gridOptions);
 refreshTableData()
});

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
    document.getElementById('filter-text-box').value
  );
}


