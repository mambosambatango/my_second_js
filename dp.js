const MaxWeight = 4;
const Products = [
  {
    weight: 1,
    value: 1500
  },
  {
    weight: 4,
    value: 3000
  },
  {
    weight: 3,
    value: 2000
  },
];

const dpTable = {};

const dp = () => {
  // 「前の最大値」の初期値を用意
  for (let w = 1;  w <= MaxWeight;  w++) {
    if (!dpTable[0]) {
      dpTable[0] = {};
    }
    dpTable[0][w] = 0;
  }

  Products.forEach((product, index) => {
    const productId = index + 1;
    dpTable[productId] = {};

    for (let weight = 1;  weight <= MaxWeight;  weight++) {
      // 前の最大値
      const prevMaxValue = dpTable[productId - 1][weight];
      // 現在の品物の価値（現在の重みより軽ければ加算）
      const curProductValue = (product.weight <= weight) ? product.value : 0;
      // 残りのスペースの価値（現在の重み - 品物の重さ の位置のデータを取ってくる。負の値になった場合は 0 を入れる）
      const maxValOfRemainingSpace = (dpTable[productId - 1][weight - product.weight] || 0);
      // 現在の品物の価値 + 残りのスペースの価値
      const curMaxValue = curProductValue + maxValOfRemainingSpace;

      // 前の最大値 と (現在の品物の価値 + 残りのスペースの価値) を比較し、大きい方がその時の最適解
      dpTable[productId][weight] = Math.max(prevMaxValue, curMaxValue);
    }
  });

  return dpTable;
}

const result = dp();

console.log(result);
// { '0': { '1': 0, '2': 0, '3': 0, '4': 0 },
//   '1': { '1': 1500, '2': 1500, '3': 1500, '4': 1500 },
//   '2': { '1': 1500, '2': 1500, '3': 1500, '4': 3000 },
//   '3': { '1': 1500, '2': 1500, '3': 2000, '4': 3500 } }
