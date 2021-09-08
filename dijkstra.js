const findLowestCostNode = (nodeList) => {
  const unProcessedNodeList = nodeList.filter(node => !node.processd);

  return unProcessedNodeList.reduce((nodeA, nodeB) => {
    if (nodeA.cost <= nodeB.cost) {
      return nodeA;
    } else {
      return nodeB
    }
  }, {});
}

const findNode = (nodeList, targetNodeName) => {
  return nodeList.find(node => node.name === targetNodeName);
}

const _display = (nodeList, node, routes) => {
  if (node.parents.name === 'start') {
    const startNode = findNode(nodeList, 'start');
    routes.push(startNode);

    console.log(routes.reverse()); 
    return;
  }

  const parentsNode = findNode(nodeList, node.parents.name);

  routes.push(parentsNode);

  _display(nodeList, parentsNode, routes);
}

const displayResult = (nodeList) => {
  const finNode = nodeList.find(node => node.name === 'fin');

  _display(nodeList, finNode, [finNode]);
}

const dijkstra = (nodeList) => {
  // 未処理かつ、コストが一番低いノードを取得
  let node = findLowestCostNode(nodeList);

  while (Object.keys(node).length) { // 未処理のノードがある限り続ける
    const neighbors = graph[node.name];

    Object.keys(neighbors).forEach(nodeName => {
      const newCost = node.cost + neighbors[nodeName]; // 経由した場合のコスト

      const neighborNode = findNode(nodeList, nodeName);
      const currentCost = neighborNode.cost; // 現在登録されているコスト

      if (currentCost > newCost) {
        neighborNode.cost = newCost;
        neighborNode.parents = node;
      }
    });

    node.processd = true;
    node = findLowestCostNode(nodeList);    
  }

  displayResult(nodeList);
}

const graph = {
  start: {
    a: 6,
    b: 2
  },
  a: {
    fin: 1,
  },
  b: {
    a: 3,
    fin: 5
  },
  fin: {} // ゴールには隣接ノードはない
}

class Node {
  constructor({ name, cost }) {
    this.name = name;
    this.cost = cost;
    this.parents = {};
    this.processd = false;
  }
}

const start = new Node({ name: 'start', cost: 0 })
const a = new Node({ name: 'a', cost: Infinity })
const b = new Node({ name: 'b', cost: Infinity })
const fin = new Node({ name: 'fin', cost: Infinity })

dijkstra([start, a, b, fin]);
// [ Node { name: 'start', cost: 0, parents: {}, processd: true },
//   Node {
//     name: 'b',
//     cost: 2,
//     parents: Node { name: 'start', cost: 0, parents: {}, processd: true },
//     processd: true },
//   Node {
//     name: 'a',
//     cost: 5,
//     parents: Node { name: 'b', cost: 2, parents: [Object], processd: true },
//     processd: true },
//   Node {
//     name: 'fin',
//     cost: 6,
//     parents: Node { name: 'a', cost: 5, parents: [Object], processd: true },
//     processd: true } ]
