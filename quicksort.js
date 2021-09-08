const quickSort = (arr) => {
  if (arr < 2) {
    return arr;
  }
  const pivot = arr[0];

  const minArr = arr.filter(arr => arr < pivot);
  const maxArr = arr.filter(arr => arr > pivot);

  return [...quickSort(minArr), pivot, ...quickSort(maxArr)];
}

const arr = quickSort([8,41,6,4,2,19]);

console.log(arr);
// [ 2, 4, 6, 8, 19, 41 ]
