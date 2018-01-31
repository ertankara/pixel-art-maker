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
// eraser button
const $eraser = document.getElementById('eraser');
// will be assigned when generateTable is called
let $tableCells;

// to track if table is cleared or created
// start value is true because there is no table at the beginning
let tableCleared = true;

// makes hidden area visible for some time to grab attention
const expandArea = () => {
  let intervalTime = 0;
  let interval = setInterval(() => {
    if (intervalTime % 2 === 0)
      $hiddenArea.style.bottom = '0px';
    else
      $hiddenArea.style.bottom = '30px';

    if (intervalTime === 2) {
      clearInterval(interval);
      $hiddenArea.style.bottom = '148px';
    }
    intervalTime++;
  }, 500);
  
};

// show current values of table-create-values
window.addEventListener('load', () => {
  $displayWidth.innerHTML = $width.value;
  $displayHeight.innerHTML = $height.value;
  expandArea();
});

// when table is generated assign event listeners to every cell
let isHolding;
const addEventListenerToCells = () => {
  const $tableCells = document.querySelectorAll('td');
  for (let i = 0; i < $tableCells.length; i++) {
    // mousedown
    $tableCells[i].addEventListener('mousedown', e => {
      // to cancel drag of default behaviour
      e.preventDefault();
      if (!$eraser.checked)
        e.target.style.backgroundColor = $foregroundColor.value;
      else
        e.target.style.backgroundColor = $backgroundColor.value;

      isHolding = true;
    });
    
    // mouseup
    $tableCells[i].addEventListener('mouseup', e => {
      isHolding = false;
    });
    
    // hovering on cells with mousedown
    $tableCells[i].addEventListener('mouseover', e => {
      if (isHolding) {
        if ($eraser.checked)
          e.target.style.backgroundColor = $backgroundColor.value;
        else
          e.target.style.backgroundColor = $foregroundColor.value;
      }
    });
    
  }
};

// if mouse leaves table with a mousedown event it will deactivate coloring
$table.addEventListener('mouseleave', () => {
  isHolding = false;
})

// set table and label colors
$backgroundColor.addEventListener('change', e => {
  if (!tableCleared)
    generateTable();
    
  $table.style.backgroundColor = e.target.value;
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
  if (!tableCleared) {
    generateTable();
  }
});

// show real time change of the height value
$height.addEventListener('change', e => {
  $displayHeight.innerHTML = e.target.value;
  if (!tableCleared)
    generateTable();
});

// when hovering on 'psst'
$hiddenArea.addEventListener('mouseover', () => {
  $hiddenArea.style.bottom = '0px';
  $expand.style.opacity = '0';
});

// when hovering stops
$hiddenArea.addEventListener('mouseleave', () => {
  $hiddenArea.style.bottom = '148px';
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

  if (!tableCleared) {
    if ($width.value >= 5)
      generateTable();
  }
});

$decreaseWidth.addEventListener('click', () => {
  $width.value = Number($width.value) - 1;
  $displayWidth.innerHTML = $width.value;

  if (!tableCleared) {
    if ($width.value >= 5)
      generateTable();
  }
});

$increaseHeight.addEventListener('click', () => {
  $height.value = Number($height.value) + 1;
  $displayHeight.innerHTML = $height.value;
  
  if (!tableCleared) {
    if ($height.value < 50)
      generateTable();

  }
});

$decreaseHeight.addEventListener('click', () => {
  $height.value = Number($height.value) - 1;
  $displayHeight.innerHTML = $height.value;
  
  if (!tableCleared) {
    if ($height.value >= 5)
      generateTable();
  }
});

/* PLUS AND MINUS ICONS EVENT CLICK EVENTS END */
