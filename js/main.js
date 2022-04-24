let size = 0;

let maxCount = 0;

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

  if (count > maxCount) {

    maxCount = count;

  }

  const inputs = createElements(count, makeInput);

  let $label = document.createElement("label");

  if (count !== 0) {

    $label.innerText = "G+(" + (size + 1) + ") = ";

  } else {

    $label.innerText = "G+(" + (size + 1) + ") = {нет вершин}";

  }

  size++;

  const $row = makeElement('div', 'mb-2', inputs);

  $inputsContainer.append($label, $row);

});


const getArray = () => {

  let arr1 = [];
  let array = [];

  const $mb2 = document.querySelectorAll('.mb-2');

  for (let i = 0; i < $mb2.length; i++) {

    const child = $mb2[i].childNodes;

    for (let j = 0; j < child.length; j++) {

      arr1.push(parseInt(child[j].value));

    }

    array.push(arr1);

    arr1 = [];

  }

  return array;
}

const calculat = () => {
  let array = getArray();
  let matrSmej = new Array(array.length);

  for(let i = 0; i < array.length; i++){
    matrSmej[i] = new Array(array.length);
    for(let j = 0; j < array.length; j++){
      matrSmej[i][j] = 0;
    }
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      matrSmej[i][array[i][j] - 1] = 1;
    }
  }

  let R = getR(matrSmej);

  let E = getUnevenness(matrSmej);


  let str = "Структурная избыточность R: " + R
  + "</br>"
  + "Неравномерность распределения связей: " + E
  + "</br>";
  if(R < 0) str += "Система избыточна.";
  if(R === 0) str +="Система не содержит избыточности.";
  if(R > 0) str += "Система несвязанна.";


  document.writeln(str);


  console.log(R);
  console.log(E);

}


$calculation.addEventListener('click', calculat);

//проверка на ориентирвоанность графа
function checkForOriented(matrix){

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if(matrix[i][j] === matrix[j][i] && matrix[i][j] === 1){
        return true;
      }
    }
  }

  return false;
}

function getR(matrix){
  let R = 0;
  for(let i=0; i < matrix.length; i++) {
    for(let j = 0; j < matrix.length; j++){
      R += matrix[i][j];
    }
  }
  R = R * 0.5 / (matrix.length - 1) - 1
  return R;
}

function getUnevenness(matrix){
  let e2 = 0;
  let countE = getEdge(matrix);
  for(let i = 0; i < matrix.length; i++){
    let degreeV = 0;
    for (let j = 0; j < matrix.length; j++)
    degreeV += matrix[i][j];
    e2 += degreeV * degreeV;
  }
  e2 -= 4 * countE * countE / matrix.length;
  return e2;
}


function getEdge(matrix){

  let length = matrix.length;
  let edge = 0;
  for(let i = 0; i < length; i++){
    for(let j = 0; j < length; j++){
      if(matrix[i][j] === 1){
        edge++;
      }
    }
  }
  if(checkForOriented(matrix))
    return edge/2;
  else return edge
}





