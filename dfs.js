const graph = {};

graph['START'] = ['alice', 'bob', 'claire'];
graph['bob'] = ['anuj', 'peggy'];
graph['alice'] = ['peggy'];
graph['claire'] = ['TARGET', 'jonny'];
graph['anuj'] = [];
graph['peggy'] = [];
graph['thom'] = [];
graph['jonny'] = [];

const dfs = () => {
  const queue = graph['START'];

  while (queue.length) {
    const person = queue.pop();

    console.log(person);
    if (person === 'TARGET') {
      console.log('見つけた')
      console.log(person)
      return
    } else {
      queue.push(...graph[person])
    }
  }

  console.log('見つからなかった。')
  return
}

dfs();
// claire
// jonny
// TARGET
// 見つけた
// TARGET
