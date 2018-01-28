const $hiddenArea = document.getElementById('hidden-area');
const $expand = document.getElementById('expand');
const $table = document.getElementById('create-table');
const $submit = document.getElementById('submit-button');
const $width = document.getElementById('input-width');
const $height = document.getElementById('input-height');
const $displayWidth = document.getElementById('realtime-width');
const $displayHeight = document.getElementById('realtime-height');
let $tableCells;

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
  tableIsReady();
});

const tableIsReady = () => {
  $tableCells = document.querySelectorAll('td');
  for (let i = 0; i < $tableCells.length; i++) {
    $tableCells[i].addEventListener('click', e => {
      e.target.style.backgroundColor = 'red';
    });
  }
};