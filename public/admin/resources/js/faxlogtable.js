const pageTableDiv = document.querySelector(".DivFaxLogTable");

let tableHeaders = [
	{ headerName: 'Client Name',
	  field: "Client.clientname",
	  sortable: true,
	  filter: true
	},
	{ headerName: 'Device Name',
	  field: "Device.name",
	  sortable: true,
	  filter: true
	},
	{ headerName: "Direction",
	  field: "direction",
	  sortable: true,
	  filter: true
	},
	{ headerName: "Fax From",
	  field: "numberfrom",
	  sortable: true,
	  filter: true
	},
  { headerName: "Fax To",
    field: "numberto",
    sortable: true,
    filter: true
  },
  { headerName: "Status",
    field: "result",
    sortable: true,
    filter: true
  },
  { headerName: "Telnyx FaxID",
    field: "telnyxfaxid",
    filter: true
  },
  { headerName: "ATA FaxID",
    field: "atafaxid",
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
  getRowId: params => params.data.id,
  getRowClass: params => {
    if (params.node.rowIndex % 2 === 0) {
        return 'my-shaded-effect';
    }}
};


const refreshTableData = () => {
	fetch('/admin/api/getfaxlog')
	.then(res => res.json())
	.then(accounts => {
		gridOptions.api.setRowData(accounts)
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

