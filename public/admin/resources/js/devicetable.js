const devicesTableDiv = document.querySelector(".devicesTableDiv");
let tableHeaders = ["DeviceID", "ClientID", "Device Name", "MACAddr", "Line1", "Line2", "Username", "Created", "Last Updated"]

const createDevicesTable = () => {
	while (devicesTableDiv.firstChild) devicesTableDiv.removeChild(devicesTableDiv.firstChild) // Remove all children from devices div (if any)

	let devicesTable = document.createElement('table') // Create the table itself

	devicesTable.className = 'devicesTable table table-hover text-nowrap'

	let devicesTableHead = document.createElement('thead') // Creates the table header group element

	devicesTableHead.className = 'devicesTableHead'
	let devicesTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
	devicesTableHeaderRow.className = 'devicesTableHeaderRow'

	// Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
	tableHeaders.forEach(header => {
		let devicesHeader = document.createElement('th') // Creates the current header cell during a specific iteration
		devicesHeader.innerText = header
		devicesTableHeaderRow.append(devicesHeader) // Appends the current header cell to the header row
	})

	devicesTableHead.append(devicesTableHeaderRow) // Appends the header row to the table header group element
	devicesTable.append(devicesTableHead)
	let devicesTableBody = document.createElement('tbody') // Creates the table body group element
	devicesTableBody.className = "devicesTable-Body"
	devicesTable.append(devicesTableBody) // Appends the table body group element to the table
	devicesTableDiv.append(devicesTable) // Appends the table to the scoreboard div
}

// The function below will accept a single score and its index to create the global ranking
const appendDevice = (deviceId, clientId, deviceName, macAddr, line1, line2, userName, createdDate, modifiedDate) => {

	const devicesTable = document.querySelector('.devicesTable-Body') // Find the table we created
	let devicesTableBodyRow = document.createElement('tr') // Create the current table row
	devicesTableBodyRow.className = 'devicesTableBodyRow clickable-row'

	// Lines 72-85 create the 5 column cells that will be appended to the current table row
	let deviceIdData = document.createElement('td')
	deviceIdData.innerText = deviceId

	let clientIdData = document.createElement('td')
	clientIdData.innerText = clientId

	let deviceNameData = document.createElement('td')
	deviceNameData.innerText = deviceName

	let macAddrData = document.createElement('td')
	macAddrData.innerText = macAddr

	let line1Data = document.createElement('td')
	line1Data.innerText = line1

        let line2Data = document.createElement('td')
        line2Data.innerText = line2

        let userNameData = document.createElement('td')
        userNameData.innerText = userName

	let createdDateData = document.createElement('td')
	createdDateData.innerText = createdDate

	let modifiedDateData = document.createElement('td')
	modifiedDateData.innerText = modifiedDate

	devicesTableBodyRow.append(deviceIdData, clientIdData, deviceNameData, macAddrData, line1Data, line2Data, userNameData, createdDateData, modifiedDateData) // Append all cells to the table row
	devicesTable.append(devicesTableBodyRow) // Append the current row to the table body

}


const getDevices = () => {
	fetch('/admin/api/getalldevices') // Fetch for all devices. The response is an array of objects that is sorted in decreasing order
	.then(res => res.json())
	.then(devices => {
		createDevicesTable() // Clears div if it has any children nodes, creates & appends the table
		// Iterates through all the objects in the array and appends each one to the table body
		for (const device of devices) {
			appendDevice(device.id,device.clientid,device.name,device.macaddr,device.line1,device.line2,device.username,device.createdAt,device.updatedAt) // Creates and appends each row to the table body
		}
	})
}

getDevices()

/* /$(document).ready(function() {

document.body.addEventListener("click", function (event) {
	if (event.path[2].className == 'accountsTable-Body') {
		var clientId = event.path[1].getElementsByTagName('td')[0].innerHTML;
		var clientName = event.path[1].getElementsByTagName('td')[1].innerHTML;
		document.getElementById('accountId').value = clientId
		document.getElementById('accountName').className = "form-control active"
		document.getElementById('accountName').value = clientName
	 }
})
//}) */

