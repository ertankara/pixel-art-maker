const $hiddenArea = document.getElementById('hidden-area');
const $expand = document.getElementById('expand');
const $table = document.getElementById('create-table');
const $submit = document.getElementById('submit-button');
const $width = document.getElementById('input-width');
const $height = document.getElementById('input-height');
const $displayWidth = document.getElementById('realtime-width');
const $displayHeight = document.getElementById('realtime-height');
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
$submit.addEventListener('click', e => {
  if (tableCleared) {
    $table.style.visibility = 'visible';

    // the part that creates table
    let width = $width.value;
    let height = $height.value;
    let row, cell;

    for (let i = 0; i < height; i++) {
      row = $table.insertRow(i);
      for (let j = 0; j < width; j++) {
        row.insertCell(j);
      }
    }
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