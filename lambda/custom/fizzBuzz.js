exports.answer = (n) => {
  if (n == 0) return
  var response = `${n}`
  if (n % 15 == 0) {
    response = `fizz buzz`
  } else if (n % 5 == 0) {
    response = `buzz`
  } else if (n % 3 == 0) {
    response = `fizz`
  }
  return response
}
