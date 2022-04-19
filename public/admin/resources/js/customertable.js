const accountsTableDiv = document.querySelector(".DivCustomerTable");
const accountsFormElement = document.getElementById('formUpdateAccountCreation')

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

function appendForm() {

// create form elements
 let formPartA = document.createElement('div')
 let formPartB = document.createElement('div')
 let formPartC = document.createElement('div')
 let formPartD = document.createElement('div')

 let divCol = document.createElement('div')
 let formButton = document.createElement('button');

// setup part A
 let formInputLabel = document.createElement('div')
 formInputLabel.id = 'accountIdLabel'
 formInputLabel.classList = 'input-group-text'
 formInputLabel.innerText = '@'

 let formHiddenInput = document.createElement('input')
 formHiddenInput.type = 'hidden'
 formHiddenInput.id = 'accountId'
 formHiddenInput.name = 'accountId'

 let formTextInput = document.createElement('input')
 formTextInput.classList = 'form-control'
 formTextInput.type = 'text'
 formTextInput.id = 'accountName'
 formTextInput.name = 'accountName'
 formTextInput.placeholder = 'Account Name'
 formTextInput.setAttribute('onclick','activateForm()')

 let divInputGroup = document.createElement('div')
 divInputGroup.classList = 'input-group'
 divInputGroup.append(formInputLabel, formHiddenInput, formTextInput)

 formPartA.classList = 'col-12'
 formPartA.append(divInputGroup)

// setup part B

  let formDeleteAccountButton = document.createElement('button');
  formDeleteAccountButton.type = 'submit'
  formDeleteAccountButton.formAction = '/admin/api/deleteAccount'
  formDeleteAccountButton.id = 'deleteAccount'
  formDeleteAccountButton.classList = 'btn btn-danger'
  formDeleteAccountButton.disabled = true;
  formDeleteAccountButton.innerText = 'Delete Account'

  formPartB.classList = 'col-12'
  formPartB.append(formDeleteAccountButton)

// setup part C

  let formResetButton = document.createElement('button');
  formResetButton.type = 'button'
  formResetButton.setAttribute('onclick','resetFormData()')
  formResetButton.id = 'resetForm'
  formResetButton.classList = 'btn btn-warning'
  formResetButton.disabled = true;
  formResetButton.innerText = 'Reset Form'

  formPartC.classList = 'col-12'
  formPartC.append(formResetButton)

// setup part D

  let formUpdateAccountButton = document.createElement('button');
  formUpdateAccountButton.type = 'submit'
  formUpdateAccountButton.id = 'customerAccountButton'
  formUpdateAccountButton.classList = 'btn btn-primary'
  formUpdateAccountButton.innerText = 'Create Account'

  formPartD.classList = 'col-12'
  formPartD.append(formUpdateAccountButton)


// append completed Form
 accountsFormElement.append(formPartA, formPartB, formPartC, formPartD)
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
appendForm()

document.body.addEventListener("click", function (event) {
	if (event.path[2].className == 'accountsTable-Body') {
		var clientId = event.path[1].getElementsByTagName('td')[0].innerHTML;
		var clientName = event.path[1].getElementsByTagName('td')[1].innerHTML;
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
}

/*$(document).ready(function() {

	$('#myTable').DataTable();
'
})*/
