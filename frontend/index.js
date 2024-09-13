import { backend } from 'declarations/backend';

document.getElementById('addTaxPayerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    alert('TaxPayer added successfully');
    document.getElementById('addTaxPayerForm').reset();
    loadAllTaxPayers();
});

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTid = document.getElementById('searchTid').value;
    const result = await backend.searchTaxPayer(searchTid);
    const searchResult = document.getElementById('searchResult');
    
    if (result) {
        searchResult.innerHTML = `
            <h3>Search Result:</h3>
            <p>TID: ${result.tid}</p>
            <p>Name: ${result.firstName} ${result.lastName}</p>
            <p>Address: ${result.address}</p>
        `;
    } else {
        searchResult.innerHTML = '<p>No TaxPayer found with this TID.</p>';
    }
});

async function loadAllTaxPayers() {
    const taxPayers = await backend.getAllTaxPayers();
    const taxPayerList = document.getElementById('taxPayerList');
    taxPayerList.innerHTML = '<h3>All TaxPayers:</h3>';
    
    taxPayers.forEach(tp => {
        taxPayerList.innerHTML += `
            <div>
                <p>TID: ${tp.tid}</p>
                <p>Name: ${tp.firstName} ${tp.lastName}</p>
                <p>Address: ${tp.address}</p>
                <hr>
            </div>
        `;
    });
}

// Load all TaxPayers when the page loads
loadAllTaxPayers();