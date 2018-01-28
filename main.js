const $hiddenArea = document.getElementById('hidden-area');
const $expand = document.getElementById('expand');
const $table = document.getElementById('create-table');
const $submit = document.getElementById('submit-button');
const $width = document.getElementById('input-width');
const $height = document.getElementById('input-height');
const $displayWidth = document.getElementById('realtime-width');
const $displayHeight = document.getElementById('realtime-height');
const $increaseWidth = document.getElementById('increase-width');
const $decreaseWidth = document.getElementById('decrease-width');
const $increaseHeight = document.getElementById('increase-height');
const $decreaseHeight = document.getElementById('decrease-height');
// will be assigned when create button is clicked
let $tableCells;

// to track if table is cleared or created
// start value is true because there is no table at the beginning
let tableCleared = true;

// show current values of table-create-values
window.addEventListener('load', () => {
  $displayWidth.innerHTML = $width.value;
  $displayHeight.innerHTML = $height.value;
});

// show real time change of the width value
$width.addEventListener('change', e => {
  $displayWidth.innerHTML = e.target.value;
});

// show real time change of the height value
$height.addEventListener('change', e => {
  $displayHeight.innerHTML = e.target.value;
});

// when hovering on 'psst'
$hiddenArea.addEventListener('mouseover', e => {
  $hiddenArea.style.bottom = '0px';
    $expand.style.opacity = '0';
});

// when hovering stops
$hiddenArea.addEventListener('mouseleave', e => {
  $hiddenArea.style.bottom = '155px';
  setTimeout(() => {
    $expand.style.opacity = '1';
  }, 200);
});

// when 'create' button is clicked
$submit.addEventListener('click', () => {
  if (tableCleared) {
    $table.style.visibility = 'visible';
    generateTable();
    // change the text of the button
    $submit.value = 'Clear';
    tableCleared = false;
  }
  else {
    // if table is not cleared away create button calls a clearTable to clear it
    // changes name of the button to avoid conflict
    $submit.value = 'Create';
    clearTable();
  }
  // table is ready now event listener can be added
  tableIsReady();
});

/*
  if there is no table present then the selector becomes null
  to prevent it the tableIsReady function will be called inside
  create button click event
*/
const tableIsReady = () => {
  $tableCells = document.querySelectorAll('td');
  for (let i = 0; i < $tableCells.length; i++) {
    $tableCells[i].addEventListener('click', e => {
      e.target.style.backgroundColor = 'red';
    });
  }
};

const clearTable = () => {
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
  tableCleared = true;
  
};


/**
 * when minus and plus buttons are clicked it will update three things in real time
 * 
 * 1- width of the table
 * 2- height of the table
 * 3- realtime number shown to the user
 * 4- position of range input bar
 */

// when plus or minus icons are clicked

const generateTable = () => {
  clearTable();
  let row;
  for (let i = 0; i < $height.value; i++) {
    row = $table.insertRow(i);
    for (let j = 0; j < $width.value; j++) {
      row.insertCell(j);
    }
  }
  tableCleared = false;
};


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

  if ($width.value > 5) {
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
  
  if ($height.value > 5) {
    generateTable();
  }
});