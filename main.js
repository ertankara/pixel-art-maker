// hidden settings area
const $hiddenArea = document.getElementById('hidden-area');
// 'psst' to expand settings
const $expand = document.getElementById('expand');
// empty table element
const $table = document.getElementById('create-table');
// the create and clear button
const $submit = document.getElementById('submit-button');
// actual inputs for height and width
const $width = document.getElementById('input-width');
const $height = document.getElementById('input-height');
// realtime visual update of range input values
const $displayWidth = document.getElementById('realtime-width');
const $displayHeight = document.getElementById('realtime-height');
// plus and minus buttons for width
const $increaseWidth = document.getElementById('increase-width');
const $decreaseWidth = document.getElementById('decrease-width');
// plus and minus buttons for height
const $increaseHeight = document.getElementById('increase-height');
const $decreaseHeight = document.getElementById('decrease-height');
// color cell and table background
const $backgroundColor = document.getElementById('background-color');
const $foregroundColor = document.getElementById('foreground-color');
// will be assigned when generateTable is called
let $tableCells;

// to track if table is cleared or created
// start value is true because there is no table at the beginning
let tableCleared = true;

// show current values of table-create-values
window.addEventListener('load', () => {
  $displayWidth.innerHTML = $width.value;
  $displayHeight.innerHTML = $height.value;
});

// when table is generated assign event listeners to every cell
const addEventListenerToCells = () => {
  $tableCells = document.querySelectorAll('td');
  for (let i = 0; i < $tableCells.length; i++) {
    $tableCells[i].addEventListener('click', e => {
      // TODO: Add and Remove colors from cells
    });
  }
};

// set table and label colors
$backgroundColor.addEventListener('change', e => {
  $table.style.backgroundColor = e.target.value;
  document.querySelector('label[for="cell-color"]').style.color = e.target.value;
  document.querySelector('label[for="bg-color"]').style.color = e.target.value;
});

// table generator
const generateTable = () => {
  // remove previous table
  clearTable();
  let row;
  for (let i = 0; i < $height.value; i++) {
    row = $table.insertRow(i);
    for (let j = 0; j < $width.value; j++) {
      row.insertCell(j);
    }
  }
  // it means table is existing
  tableCleared = false;
  // assign new event listeners for newly created table
  addEventListenerToCells();
  // change the message of the button to avoid conflict
  $submit.value = 'Clear';
};

// clears table
const clearTable = () => {
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
  tableCleared = true;
  $submit.value = 'Create';
  
};

// show real time change of the width value
$width.addEventListener('change', e => {
  $displayWidth.innerHTML = e.target.value;
  clearTable();
});

// show real time change of the height value
$height.addEventListener('change', e => {
  $displayHeight.innerHTML = e.target.value;
  clearTable();
});

// when hovering on 'psst'
$hiddenArea.addEventListener('mouseover', () => {
  $hiddenArea.style.bottom = '0px';
  $expand.style.opacity = '0';
});

// when hovering stops
$hiddenArea.addEventListener('mouseleave', () => {
  $hiddenArea.style.bottom = '155px';
  setTimeout(() => {
    $expand.style.opacity = '1';
  }, 200);
});

// when 'create' button is clicked
$submit.addEventListener('click', () => {
  if (tableCleared) {
    generateTable();
  }
  else {
    clearTable();
  }
});

/* PLUS AND MINUS ICONS EVENT CLICK EVENTS BEGIN */

$increaseWidth.addEventListener('click', () => {
  $width.value = Number($width.value) + 1;
  $displayWidth.innerHTML = $width.value;

  if ($width.value < 50) {
    generateTable();
  }
});

$decreaseWidth.addEventListener('click', () => {
  $width.value = Number($width.value) - 1;
  $displayWidth.innerHTML = $width.value;

  if ($width.value >= 5) {
    generateTable();
  }
});

$increaseHeight.addEventListener('click', () => {
  $height.value = Number($height.value) + 1;
  $displayHeight.innerHTML = $height.value;
  
  if ($height.value < 50) {
    generateTable();
  }
});

$decreaseHeight.addEventListener('click', () => {
  $height.value = Number($height.value) - 1;
  $displayHeight.innerHTML = $height.value;
  
  if ($height.value >= 5) {
    generateTable();
  }
});

/* PLUS AND MINUS ICONS EVENT CLICK EVENTS END */
