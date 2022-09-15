const coords = {
  easy: {
    topLeft: [64.11, 90.23],
    topRight: [67.29, 90.23],
    botLeft: [64.11, 100],
    botRight: [67.29, 100],
  },
  medium: {
    topLeft: [40.94, 67.44],
    topRight: [44.63, 67.44],
    botLeft: [40.94, 77.59],
    botRight: [44.63, 77.59],
  },
  hard: {
    topLeft: [88.73, 44.41],
    topRight: [89.91, 44.41],
    botLeft: [88.73, 46.88],
    botRight: [89.91, 46.88],
  },
}

const json = JSON.stringify(coords)

console.log(json)
