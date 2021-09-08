// 配列のindexに使っている値は二分木の位置。二分木の位置は1から始まっているので配列のindexを指定する際、常に-1を指定
const _swap = (arr, index, index2) => {
  const tmp = arr[index - 1];

  arr[index - 1] = arr[index2 - 1];
  arr[index2 - 1] = tmp;

  return arr;
}

const maxHeap = (heapSize, arr, cur) => {
  const left = 2 * cur;
  const right = 2 * cur + 1;
  let lergest;

  if (left <= heapSize && arr[left - 1] > arr[cur - 1]) {
    lergest = left;
  } else {
    lergest = cur;
  }

  if (right <= heapSize && arr[right - 1] > arr[lergest - 1]) {
    lergest = right;
  }

  if (lergest != cur) {
    arr = _swap(arr, cur, lergest)

    maxHeap(heapSize, arr, lergest);
  }
}

const arr = [4,1,3,2,16,9,10,14,8,7];
const heapSize = arr.length;

for (cur = heapSize / 2; cur >= 1; cur--) {
  maxHeap(heapSize, arr, cur);
}
console.log(arr);
// [ 16, 14, 10, 8, 7, 9, 3, 2, 4, 1 ]
