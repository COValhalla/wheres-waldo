let test = { easy: null, medium: null, hard: null }

function updateTest(mode, url) {
  test = { ...test, [mode]: url }
  return test
}

console.log(updateTest('hard', 'testing'))
