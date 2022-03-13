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

  if (count > maxCount) {

    maxCount = count;

  }

  const inputs = createElements(count, makeInput);

  let $label = document.createElement("label");

  if (count !== 0) {

    $label.innerText = "G-(" + (size + 1) + ") = ";

  } else {

    $label.innerText = "G-(" + (size + 1) + ") = {нет вершин}";

  }

  size++;

  const $row = makeElement('div', 'mb-2', inputs);

  $inputsContainer.append($label, $row);

});

const getArray = () => {

  let arr1 = [];

  const $mb2 = document.querySelectorAll('.mb-2');

  for (let i = 0; i < $mb2.length; i++) {

    const child = $mb2[i].childNodes;

    for (let j = 0; j < child.length; j++) {

      arr1.push(parseInt(child[j].value));

    }

    array.push(arr1);

    arr1 = [];

  }

}

const calculat = () => {
  getArray();
  let matrSmej = new Array(size);
  for (let i = 0; i < size; i++) {
    matrSmej[i] = new Array(size);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      matrSmej[i][j] = 0;
    }
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      matrSmej[array[i][j] - 1][i] = 1;
    }
  }

  let ierarhLevelMatr = [];
  let ierarhMatr = new Array(matrSmej.length);
  let notUsedV = matrSmej.length;
  ierarhLevelMatr.push([]);

  for (let i = 0; i < matrSmej.length; i++) {
    ierarhMatr[i] = new Array(matrSmej.length);
  }

  for (let i = 0; i < matrSmej.length; i++) {
    for (let j = 0; j < matrSmej[i].length; j++) {
      ierarhMatr[i][j] = 0;
    }
  }

  for (let i = 0; i < matrSmej.length; i++) {//поиск нулевого иерархического уровня
    for (let j = 0; j < matrSmej[i].length; j++) {
      if (matrSmej[j][i] === 0) {
        if (j === (matrSmej.length - 1)) {
          ierarhLevelMatr[0].push(i);
          notUsedV--;
        }
      } else break;
    }
  }

  let flag = true;
  ierarhLevelMatr.push([]);

  for (let i = 0; i < ierarhLevelMatr[0].length; i++) {//поиск первого иерархического уровня
    for (let j = 0; j < matrSmej.length; j++) {

      flag = true;

      if (matrSmej[ierarhLevelMatr[0][i]][j] === 1) {
        for (let k = 0; k < matrSmej.length; k++) {
          if (matrSmej[k][j] === 1 && k !== ierarhLevelMatr[0][i]) {
            flag = false;
            break;
          }
        }

        if (flag === true) {
          ierarhLevelMatr[1].push(j);
          notUsedV--;
        }

      }
    }
  }

  console.log(ierarhLevelMatr[1]);
  let lastLevel = 0;

  while (notUsedV !== 0) {//пока не использованы все вершины

    ierarhLevelMatr.push([]);
    lastLevel++;

    for (let i = 0; i < ierarhLevelMatr[lastLevel].length; i++) { //проходим по вершинам последнего иерархического уровня
      for (let j = 0; j < matrSmej.length; j++) {//проходим по столбцам вершина матрицы последнего иерархического уровня     j  - столбец
        flag = false;
        if (matrSmej[ierarhLevelMatr[lastLevel][i]][j] === 1) {//если нашли вершину смежную с матрицей последнего иерархического уровня
          flag = true;
          for (let k = 0; k < matrSmej.length; k++) {//проходим по строкам  k - строка
            if (matrSmej[k][j] === 1 && k !== ierarhLevelMatr[lastLevel][i]) {//если нашли вершину из матрицы иерархических уровней
              flag = false;
              for (let n = 0; n < (ierarhLevelMatr.length - 1); n++) {//проходимся по строкам матрицы иерархических уровней не включая последний пустой уровень
                for (let m = 0; m < ierarhLevelMatr[n].length; m++) {//проходимся по столбцам матрицы иерархических уровеней
                  if (k === ierarhLevelMatr[n][m]) {//нашли в матрице иерархических уровней вершину
                    flag = true;
                    break;
                  }
                }
                if (flag === true) {
                  break;
                }
              }
            }
            if (flag === false) {
              break;
            }
          }
        }
        if (flag === true) {
          ierarhLevelMatr[lastLevel + 1].push(j);
          notUsedV--;
        }
      }
    }
  }

  let newIerarhLevelMatr = [];
  let pos = 0;

  for (let i = 0; i < ierarhLevelMatr.length; i++) {
    for (let j = 0; j < ierarhLevelMatr[i].length; j++) {
      newIerarhLevelMatr.push([pos++, ierarhLevelMatr[i][j]]);
    }
  }

  let newRow = 0;
  let newColumn = 0;

  for (let i = 0; i < matrSmej.length; i++) {
    for (let k = 0; k < matrSmej.length; k++) {
      if (newIerarhLevelMatr[k][1] === i) {
        newRow = newIerarhLevelMatr[k][0];
        break;
      }
    }
    for (let j = 0; j < matrSmej.length; j++) {
      if (matrSmej[i][j] === 1) {
        for (let m = 0; m < matrSmej.length; m++) {
          if (newIerarhLevelMatr[m][1] === j) {
            newColumn = newIerarhLevelMatr[m][0];
            break;
          }
        }
        ierarhMatr[newRow][newColumn] = 1;
      }
    }
  }

  let rightInc = new Array(ierarhMatr.length);

  for (let i = 0; i < ierarhMatr.length; i++) {
    let count = 0;
    for (let j = 0; j < ierarhMatr.length; j++) {
      if (ierarhMatr[i][j] === 1) {
        count++;
      }
    }
    rightInc[i] = new Array(count);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (ierarhMatr[i][j] === 1) {
        rightInc[i].push(j + 1);
      }
    }
  }

  let str1 = 'Иерархические уровни' + '<br>';

  let sizeMatr = 0;
  for (let i = 0; i < ierarhLevelMatr.length; i++) {

    str1 += 'Уровень ' + i + '={';

    if (ierarhLevelMatr[i].length === 0) {
      str1 += '';
    } else
      for (let j = 0; j < ierarhLevelMatr[i].length; j++) {
        if (ierarhLevelMatr[i][j] !== undefined) {
          if (j !== ierarhLevelMatr[i].length - 1) {
            str1 += (ierarhLevelMatr[i][j]+1) + '(' + (newIerarhLevelMatr[sizeMatr++][1] + 1) + ')' + ',';
          } else
            str1 += (ierarhLevelMatr[i][j]+1) + '(' + (newIerarhLevelMatr[sizeMatr++][1] + 1) + ')';
        }
      }
    str1 += '}' + '<br>';
  }

  str1 += '<br>';
  document.writeln(str1);

  let str2 = 'Множество правых инциденций' + '<br>';
  size = 0;
  for (let i = 0; i < rightInc.length; i++) {

    str2 += 'G+(' + (i + 1) + '(' + (newIerarhLevelMatr[i][1] + 1) + ')' + ')' + '={';

    if (rightInc[i].length === 0) {
      str2 += '';
    } else
      for (let j = 0; j < rightInc[i].length; j++) {
        if (rightInc[i][j] !== undefined) {
          if (j !== rightInc[i].length - 1) {
            str2 += (rightInc[i][j]+1) + '(' + (newIerarhLevelMatr[sizeMatr++][1] + 1) + ')' + ',';
          } else
            str2 += (rightInc[i][j]+1) + '(' + (newIerarhLevelMatr[sizeMatr++][1] + 1) + ')';
        }
      }
    str2 += '}' + '<br>';
  }

  document.writeln(str2);
  array = [];
}

$calculation.addEventListener('click', calculat);


/*let testMatr = new Array(10);
  for(let i = 0; i < 10; i++){
    testMatr[i] = new Array(10);
  }


  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
      testMatr[i][j] = 0;
    }
  }

  testMatr[0][1] = 1;
  testMatr[0][6] = 1;
  testMatr[1][2] = 1;
  testMatr[1][3] = 1;
  testMatr[4][3] = 1;
  testMatr[5][2] = 1;
  testMatr[5][3] = 1;
  testMatr[6][1] = 1;
  testMatr[7][5] = 1;
  testMatr[7][6] = 1;
  testMatr[8][1] = 1;
  testMatr[9][4] = 1;
  testMatr[9][6] = 1;
  testMatr[9][7] = 1;
  testMatr[9][8] = 1;

  let matrSmej = testMatr;
*/



/* let str0 = 'Множество левых инциденций' + '<br>';
  for (let i = 0; i < size; i++) {
    str0 += 'G-(' + (i + 1) + ')' + '={';
    if (array[i].length === 0) {
      str0 += '';
    } else
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] !== undefined) {
          if (j !== array[i].length - 1) {
            str0 += array[i][j] + ',';
          } else
            str0 += array[i][j];
        }
      }
    str0 += '}' + '<br>';
  }

  str0 += '<br>';

  document.writeln(str0);

  let str = 'Матрица смежности' + '<br>';

  for (let i = 0; i < size; i++) {
    str += '{';
    for (let j = 0; j < size; j++) {
      if (j !== size - 1) {
        str += matrSmej[i][j] + ',';
      } else str += matrSmej[i][j];
    }
    str += '}' + '<br>';
  }

  str += '<br>';

  document.writeln(str);

  let str2 = 'Множество правых инциденций' + '<br>';

  for (let i = 0; i < size; i++) {

    str2 += 'G+(' + (i + 1) + ')' + '={';

    if (rightInc[i].length === 0) {
      str0 += '';
    } else
      for (let j = 0; j < rightInc[i].length; j++) {
        if (rightInc[i][j] !== undefined) {
          if (j !== rightInc[i].length - 1) {
            str2 += rightInc[i][j] + ',';
          } else
            str2 += rightInc[i][j];
        }
      }
    str2 += '}' + '<br>';
  }

  document.writeln(str2);*/
