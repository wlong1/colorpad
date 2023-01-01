const gridBox = document.querySelector('.gridbox');
let number;


function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


function HexToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var l = (max + min) / 2;

  l = l*100;
  l = Math.round(l);

  return l;
}

function colorTune(target){
  let l = HexToHSL(rgb2hex(target));
  h = Math.floor(Math.random() * 360);
  l = l - 20;
  if (l < 0){
    l = 0;
  };
  return 'hsl('+h+',30%,'+l+'%)';
};

function loadGrid(num){
  gridBox.replaceChildren(); // Clear grid
  gridBox.style.gridTemplateColumns = 'repeat('+num+',' +960/num+'px)';
  gridBox.style.gridTemplateRows = 'repeat('+num+',' +960/num+'px)';
  for (i = 0; i < num*num; i++){
    let temp = document.createElement('div');
    temp.classList.add('gridElement');
    temp.addEventListener('mouseover', (e) => e.target.style.backgroundColor = colorTune(getComputedStyle(e.target).backgroundColor));
    gridBox.appendChild(temp);
  };
  number = num;
};

loadGrid(20);

const resizeBtn = document.querySelector('#resizeBtn');
resizeBtn.addEventListener('click', gridCount);

function gridCount(){
  number = parseInt(prompt("Enter grid width (Maximum of 100):"));
  if (number == null || number == "" || number >100){
    number = 100;
  } else if (number < 1){
    number = 1;
  };
  loadGrid(number);
};

const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', () => loadGrid(number));