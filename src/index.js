module.exports = function solveSudoku(matrix) {
  let count = 0;
      
      for(let i = 0, length = matrix[i].length; i < length; i++){
          for(let j = 0; j < matrix.length; j++){
              if (matrix[i][j] == 0){
              let num = intermediateMatrix(matrix, i, j);
                  if(num.length == 1){
                  matrix[i][j] = num[0];
                  count++;
              }else {
                  let findeElseNum = intermediateMatrix2(matrix, i, j, num);
                  if (findeElseNum.length == 1){
                      matrix[i][j] = findeElseNum[0];
                      count++;
                  }
              } 
            }
          }
        }
      if(count != 0) solveSudoku(matrix);	
  
    for(let i = 0, length = matrix[i].length; i < length; i++){
          for(let j = 0; j < matrix.length; j++){
        if (matrix[i][j] == 0){
          matrix[i][j] = intermediateMatrix(matrix, i, j)[0];
          solveSudoku(matrix);
        }
      }
    } 
      return matrix;
}    
      // функция проходит по строке, столбцу и маленькому квадрату и собирает значения в массив
         function intermediateMatrix(matrix, a, b){
        let arr = [];
        for(let i = 0; i < matrix[a].length; i++){
          if (matrix[a][i] != 0){
            arr.push(matrix[a][i]);
          }
        }
         for(let j= 0; j < matrix.length; j++){
          if (matrix[j][b] != 0){
            arr.push(matrix[j][b]);
          }
        }
         let beginN = null, beginM = null, finishN = null, finishM = null;
      
        if(a <= 2){ 
            beginN = 0; finishN = beginN + 3;
        } else if(2 < a && a < 6){
            beginN = 3; finishN = beginN + 3;
        } else{
            beginN = 6; finishN = beginN + 3;
        }
        if(b <= 2){
            beginM = 0; finishM = beginM + 3;
        } else if(2 < b && b < 6){
            beginM = 3; finishM = beginM + 3;
        } else{
            beginM = 6; finishM = beginM + 3;
        }
        
      
        for(let i = beginN; i < finishN; i++){
          for(let j = beginM; j < finishM; j++){
            if(matrix[i][j] !== 0){
              arr.push(matrix[i][j]);
            }
          }
        }
      
        let res = [];
        let count = 1;
        while(count <= 9){
          let bool = arr.includes(count) ? count++ : res.push(count) && count++;
        }
      return res;
  }
  
  
   function intermediateMatrix2(matrix, k, l, num){
    
    let arrRow = [];
    let strRow = '', strCol = '', strSquare = '';
    
    for(let i = 0, length = matrix[k].length; i < length; i++){
      if(matrix[k][i] == 0 && i != l){
        arrRow.push(intermediateMatrix(matrix, k, i));
        strRow = arrRow.join(',');
      }
    }
    
    
      
    let resRow = [];
  
    
    for (let i = 0, length1 = num.length; i < length1;){
      let ind = num[i];
      let bool = strRow.includes(ind) ? i++ : resRow.push(ind) && i++; 
    }
    
    
    if (resRow.length == 1) return resRow;
    
    let arrCol = [];
    
    for(let i = 0, length = matrix.length; i < length; i++){
      if(matrix[i][l] == 0 && i != k){
        arrCol.push(intermediateMatrix(matrix, i, l));
        strCol = arrCol.join(',');
      }
    }
  
      
      let resCol = [];
      
    for (let i = 0, length1 = num.length; i < length1;){
      let ind = num[i];
      let bool = strCol.includes(ind) ? i++ : resCol.push(ind) && i++; 
    }
      
    
    if (resCol.length == 1) return resCol;
    
    
    let startK = null, startL = null, endK = null, endL = null;
    
    if(k <= 2){
      startK = 0;  endK = startK + 3;
    } else if (k > 2 && k < 6){
      startK = 3;  endK = startK + 3;
    } else {
      startK = 6;  endK = startK + 3;
    }
  
    if(l <= 2){
      startL = 0; endL = startL + 3;
    } else if (l > 2 && l < 6){
      startL = 3;  endL= startL + 3;
    } else {
      startL = 6;  endL= startL + 3;
    }
    
    let arrSquare = [];
    
    for (let i = startK; i < endK; i++){
      for (let j = startL; j < endL; j++){
        if(matrix[i][j] == 0){
          if (i == k && j == l) continue;
          else {
            arrSquare.push(intermediateMatrix(matrix, i, j));
            strSquare = arrSquare.join(',');
          }
        }
      }
    }
    
  
      
      let resSquare = [];
    
    for (let i = 0, length1 = num.length; i < length1;){
      let ind = num[i];
      let bool = strSquare.includes(ind) ? i++ : resSquare.push(ind) && i++; 
    }
    
    if (resSquare.length == 1) return resSquare;
    
    let strAll = strRow + ','  + strCol + ','  + strSquare;
    let resAll = [];
    
    for (let i = 0, length1 = num.length; i < length1;){
      let ind = num[i];
      let bool = strAll.includes(ind) ? i++ : resAll.push(ind) && i++; 
    }
    
    return resAll;
  }   
  