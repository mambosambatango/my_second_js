const bitonicSort = (asc, arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const midPoint = arr.length / 2;
  const first = bitonicSort(true, arr.slice(0, midPoint));
  const second = bitonicSort(false, arr.slice(midPoint, arr.length));

  return _subSort(asc, [...first, ...second]);
};

const _subSort = (asc, arr) => {
  if (arr.length === 1) {
    return arr;
  }
  _compareAndSwap(asc, arr);
  const midPoint = arr.length / 2;
  const first = _subSort(asc, arr.slice(0, midPoint));
  const second = _subSort(asc, arr.slice(midPoint, arr.length));

  return [...first, ...second];
};

const _compareAndSwap = (asc, arr) => {
  const dist = arr.length / 2;

  for (let i = 0; i < dist; i++) {
    // 左側が右側より大きいかつ、昇順に並び変えたいならswapする
    if (arr[i] > arr[i + dist] === asc) {
      [arr[i], arr[i + dist]] = [arr[i + dist], arr[i]];
    }
  }
};

bitonicSort(false, [
  89,
  28,
  7,
  3,
  65,
  99,
  57,
  18,
  56,
  63,
  32,
  69,
  73,
  93,
  71,
  30,
]); // [ 99, 93, 89, 73, 71, 69, 65, 63, 57, 56, 32, 30, 28, 18, 7, 3 ]

bitonicSort(true, [
  89,
  28,
  7,
  3,
  65,
  99,
  57,
  18,
  56,
  63,
  32,
  69,
  73,
  93,
  71,
  30,
]); // [ 3, 7, 18, 28, 30, 32, 56, 57, 63, 65, 69, 71, 73, 89, 93, 99 ]
