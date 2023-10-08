import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const bodyWrapper = document.querySelector('body');

function createForm () {

  const containerForm = document.createElement('div');

  containerForm.className = 'container';
  containerForm.style.padding = '25px';

  bodyWrapper.appendChild( containerForm );

  const form = document.createElement('form');

  containerForm.appendChild( form );

  const rowLines = createRow( form, 'row mb-3' );
  const rowColumns = createRow( form, 'row mb-3' );
  const rowInitialString = createRow( form, 'row mb-3' );
  const rowSubmit = createRow( form, 'row mb-3' );

  const colLines = createColumn( rowLines, "col-md-3" );

  createLabelAndInput( colLines, "Number of lines", "Enter the number of lines", "lines" );

  const colColumns = createColumn( rowColumns, "col-md-3" );

  createLabelAndInput( colColumns, "Number of columns", "Enter the number of columns", "columns" );

  const colInitialString = createColumn( rowInitialString, "col-md-3" );

  createLabelAndInput( colInitialString, "Initial string", "Init string", "string" );

  const colSubmit = createColumn( rowSubmit, "col-12" );

  createSubmitInput( colSubmit );

  form.addEventListener( 'submit', checkInputsValues );

}

function createRow ( parent, className ) {

  const newRow = document.createElement('div');
  newRow.className = className;

  parent.appendChild(newRow);

  return newRow;

}

function createColumn ( parent, className ) {

  const newCol = document.createElement('div');

  newCol.className = className;

  parent.appendChild( newCol );

  return newCol;

}

function createLabelAndInput ( parent, labelText, inputText, inputId ) {

  const label = document.createElement('label');

  label.className = 'form-label';
  label.innerText = labelText;

  const input = document.createElement('input');

  input.className = 'form-control';
  input.id = inputId;
  input.type = 'text';
  input.placeholder = inputText;

  parent.appendChild( label );
  parent.appendChild( input );

  return { label, input };
  
}

function createSubmitInput ( parent ) {

  const submitInput = document.createElement('input');

  submitInput.type = 'submit';
  submitInput.className = 'btn btn-primary';
  submitInput.value = 'Create table';

  parent.appendChild( submitInput );

}

createForm();

function createArray ( lines, columns, string ) {

  const array = [];

  for ( let i = 0; i < lines; i+=1 ) {

    const newLine = [];

    for ( let j=0 ; j < columns; j+=1) {

      newLine[j] = `${string}[${i}][${j}]`;

    }

    array.push( newLine );

  }

  return array;

}

function checkInputsValues ( e ) {

  e.preventDefault();

  const linesInput = document.getElementById('lines');

  let error = 0;
  let errorString = "";

  if ( !Number.isNaN( Number(linesInput) ) || Number( linesInput ) <= 0 ) {

    console.log( "line input error " );

    error = 1;

    if ( !Number.isNaN( Number(linesInput) ) ) {

      errorString += "linesInput is not a number.\n";

    }

    if ( Number( linesInput ) <= 0 ) {

      errorString += "linesInput is negative or equals to 0.\n";

    }

  };

  const columnsInput = document.getElementById('columns');

  if ( !Number.isNaN( Number(columnsInput) ) || Number( columnsInput ) <= 0 ) {

    console.log( "column input error " );

    error = 1;

    if ( !Number.isNaN( Number(columnsInput) ) ) {

      errorString += "columnsInput is not a number.\n";

    }

    if ( Number( columnsInput ) <= 0 ) {

      errorString += "columnsInput is negative or equals to 0.\n";

    }
  
  };

  if ( error === 1 ) {

    console.log( "error" );

    const errorContainer = document.createElement('div');

    errorContainer.className = 'container';
    errorContainer.style.padding = '25px';

    const errorRow = createRow( errorContainer, 'row mb-3' );
    const errorColumn = createColumn( errorRow, 'col-md-2' );

    let errorDiv = document.getElementById('error');

    if ( errorDiv ) {

      console.log( "errorDiv exists" );
      errorDiv.innerText = '';
      
    } else {

      console.log( "errorDiv created" );

      errorDiv = document.createElement('div');
      errorDiv.style.backgroundColor = 'black';
      errorDiv.style.width = '100%';
      errorDiv.id = 'error';
      errorDiv.style.color = 'red';
      errorColumn.appendChild( errorDiv );

    }

    errorDiv.innerText = errorString;

    bodyWrapper.appendChild( errorContainer );

  } else {

    console.log( "no error" );

    const stringInput = document.getElementById('string');
    
    generateTable( linesInput.value, columnsInput.value, stringInput.value );

  }

}

function createHtmlTableAsString ( array ) {

  let HTMLTable = "<table>";

  array.forEach( line => {

    HTMLTable += "<tr>";

    line.forEach( cell => {

      HTMLTable += `<td style="border:1px solid black;padding:8px;">${cell}</td>`

    });

    HTMLTable += "</tr>"

  });

  HTMLTable += "</table>";

  return HTMLTable;

}

function generateTable ( lines, columns, string ) {

  const tableContainer = document.createElement('div');

  tableContainer.className = 'container';
  tableContainer.style.padding = '25px';

  const tableRow = createRow( tableContainer, 'row mb-3' );
  const tableColumn = createColumn( tableRow, 'col-md-2' );

  const array = createArray( lines, columns, string );

  tableColumn.innerHTML = createHtmlTableAsString( array );

  bodyWrapper.appendChild( tableContainer );

}