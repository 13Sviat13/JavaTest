let values = []; //array to store objects with name and val properties
let valuesList = document.getElementById('valuesList'); // HTML element to display the list of values

// updateValuesList Function
function updateValuesList() {
    // Clear the contents of the valuesList element
    valuesList.innerHTML = '';
    // Iterate over the values array and create a new list item for each value
    values.forEach((value, index) => {
        const listItem = document.createElement('div'); //create a new div element for the list item
        
        // Create a checkbox for selection
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; // set the type of the input element to checkbox
        checkbox.dataset.index = index.toString(); // Store the index as a data attribute

        // Set the text content of the list item
        listItem.textContent = `${value.name} = ${value.val}`; // set the text content to the name and val properties
        listItem.prepend(checkbox); // Add checkbox before the text

        valuesList.appendChild(listItem); // add the list item to the valuesList element
    }, 0); // Add the initial value for the index parameter
}

function addNameV() {
    console.log("Button clicked!"); // log a message to the console

    const nameInput = document.getElementById("input-textbox"); // get the input element
    const value = nameInput.value; // get the value of the input element

    // Regular expression to match the expected format (e.g. "name = value")
    const regex = /^([a-zA-Z0-9]+)\s*([a-zA-Z0-9]+)$/;
    const match = value.match(regex); // match the input value against the regular expression

    if (match) {
        const name = match[1]; // extract the name from the match
        const val = match[2]; // extract the value from the match

        values.push({ name, val }); // add the new object to the values array
        updateValuesList();
        nameInput.value = ''; // clear the input field
    } else {
        alert('Invalid Name/Value pair syntax. Please use the format: <name> = <value>')
    }
  }


  function deleteSelectedValues() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // get all checkbox input elements
    const selectedValues = []; // array to store the selected values

    checkboxes.forEach((checkbox) => { // iterate over the checkboxes
        if (checkbox.checked) {
            const index = checkbox.dataset.index; // get the index of the corresponding value
            selectedValues.push(values[index]); // add the value to the selectedValues array
        }
    });

    if (selectedValues.length > 0) { // if there are selected values
        if (confirm(`Are you sure you want to delete the following items: ${selectedValues.map((value) => value.name).join(', ')}?`)) { // display a confirmation dialog
            values = values.filter((value) => !selectedValues.includes(value)); // filter the values array to remove the selected values

            updateValuesList();
        }
    } else {
        alert('No items selected for deletion.');
    }
}

function sortByNames() {
    values.sort((a, b) => {
        if (!a.name) return 1;
        if (!b.name) return -1;
        return a.name.localeCompare(b.name); // compare the names using localeCompare
    });
    updateValuesList();
}

function sortByValues() {
    values.sort((a, b) => {
        if (!a.val) return 1; // If a.val is undefined, sort it to the end
        if (!b.val) return -1; // If b.val is undefined, sort it to the end
        return a.val.localeCompare(b.val); // compare the values using localeCompare
    });
    updateValuesList();

}

function showAsXml() {
    let xmlString = '<values>\n'; // initialize the XML string

    values.forEach((value) => {
        xmlString += `  <value name="${value.name}" val="${value.val}"/>\n`;
    });

    xmlString += '</values>';

     // Display the XML string
    const xmlDisplay = document.getElementById("xml-display");
    if (xmlDisplay) {
        xmlDisplay.textContent = xmlString;
    } else {
        console.error("Could not find element with id 'xml-display'");
    }
    
    
}


        
        
