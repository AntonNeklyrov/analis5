let size = 0;
let maxCount = 0;
let array = [];


const $random = document.querySelector('#random');
const $inputsContainer = document.querySelector('.inputs-container');
const $inputsCount = document.querySelector('#inputs-count');
const $out = document.querySelector('#out');
const $showValues = document.querySelector('#show-values');
const $calculation = document.querySelector('#calculation');

const makeElement = (tag, className, childrens = []) => {
  const el = document.createElement(tag);
  el.className = className;
  el.append(...childrens);
  return el;
};

const makeInput = () => {
  const el = makeElement('input', 'input');
  el.type = 'text';
  return el;
};


const createElements = (count, constructor) => {
  return Array(count).fill().map(constructor);
};

const showInputsText = () => {
  const inputs = $inputsContainer.querySelectorAll('input');
  const values = [...inputs].reduce((acc, element) => {
    return `${acc} ${element.value}`;
  }, '');
  $out.textContent = values;
};

$showValues.addEventListener('click', showInputsText);

$random.addEventListener('click', () => {
  const count = parseInt($inputsCount.value);
  if (count > maxCount){
    maxCount = count;
  }
  const inputs = createElements(count, makeInput);
  let $label = document.createElement("label");
  if(count !== 0){
    $label.innerText = "G-(" + (size+1) + ") = ";
  }
  else{
    $label.innerText = "G-(" + (size+1) + ") = {нет вершин}";
  }
  size++;
  const $row = makeElement('div', 'mb-2', inputs);
  $inputsContainer.append($label,$row);
});


const getArray = () => {
  let arr1 = [];
  const $mb2 = document.querySelectorAll('.mb-2');
  for(let i = 0 ; i < $mb2.length; i++){
    const child = $mb2[i].childNodes;
    for(let j = 0; j < child.length; j++){
      arr1.push(parseInt(child[j].value));
    }
    array.push(arr1);
    arr1 = [];
  }

}

const calculat = () =>{
  getArray();
  let matrSmej = new Array(size);

  for(let i = 0; i < size;i++){
    matrSmej[i] = new Array(size);
  }

  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      matrSmej[i][j] = 0;
    }
  }

  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++) {
      matrSmej[array[i][j]-1][i] = 1;
    }
  }

  console.log(matrSmej);
  array = [];
}

$calculation.addEventListener('click', calculat);


