const accountsTableDiv = document.querySelector(".customerAccounts");
let tableHeaders = ["CustomerID", "Customer Name", "Created", "Last Updated"]

const createaccountsTable = () => {
	while (accountsTableDiv.firstChild) accountsTableDiv.removeChild(accountsTableDiv.firstChild) // Remove all children from scoreboard div (if any)

	let accountsTable = document.createElement('table') // Create the table itself

	accountsTable.className = 'accountsTable table table-hover text-nowrap'

	let accountsTableHead = document.createElement('thead') // Creates the table header group element

	accountsTableHead.className = 'accountsTableHead'
	let accountsTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
	accountsTableHeaderRow.className = 'accountsTableHeaderRow'

	// Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
	tableHeaders.forEach(header => {
		let accountsHeader = document.createElement('th') // Creates the current header cell during a specific iteration
		accountsHeader.innerText = header
		accountsTableHeaderRow.append(accountsHeader) // Appends the current header cell to the header row
	})

	accountsTableHead.append(accountsTableHeaderRow) // Appends the header row to the table header group element
	accountsTable.append(accountsTableHead)
	let accountsTableBody = document.createElement('tbody') // Creates the table body group element
	accountsTableBody.className = "accountsTable-Body"
	accountsTable.append(accountsTableBody) // Appends the table body group element to the table
	accountsTableDiv.append(accountsTable) // Appends the table to the scoreboard div
}

// The function below will accept a single score and its index to create the global ranking
const appendAccount = (customerId, customerName, createdDate, modifiedDate) => {

	const accountsTable = document.querySelector('.accountsTable-Body') // Find the table we created
	let accountsTableBodyRow = document.createElement('tr') // Create the current table row
	accountsTableBodyRow.className = 'accountsTableBodyRow clickable-row'

	// Lines 72-85 create the 5 column cells that will be appended to the current table row
	let customerIdData = document.createElement('td')
	customerIdData.innerText = customerId

	let customerNameData = document.createElement('td')
	customerNameData.innerText = customerName

	let createdDateData = document.createElement('td')
	createdDateData.innerText = createdDate

	let modifiedDateData = document.createElement('td')
	modifiedDateData.innerText = modifiedDate

	accountsTableBodyRow.append(customerIdData, customerNameData, createdDateData, modifiedDateData) // Append all 5 cells to the table row
	accountsTable.append(accountsTableBodyRow) // Append the current row to the scoreboard table body

}


const getAccounts = () => {
	fetch('/admin/api/getallaccounts') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
	.then(res => res.json())
	.then(accounts => {
		createaccountsTable() // Clears scoreboard div if it has any children nodes, creates & appends the table
		//console.log(accounts)
		// Iterates through all the objects in the scores array and appends each one to the table body
		for (const account of accounts) {
			appendAccount(account.id,account.clientname,account.createdAt,account.updatedAt) // Creates and appends each row to the table body
		}
	})
}

getAccounts()

//$(document).ready(function() {

document.body.addEventListener("click", function (event) {
	if (event.path[2].className == 'accountsTable-Body') {
		var clientId = event.path[1].getElementsByTagName('td')[0].innerHTML;
		var clientName = event.path[1].getElementsByTagName('td')[1].innerHTML;
		document.getElementById('accountId').value = clientId
		document.getElementById('accountName').className = "form-control active"
		document.getElementById('accountName').value = clientName
	 }
})
//})

