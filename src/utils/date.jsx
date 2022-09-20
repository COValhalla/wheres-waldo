export default function getDate() {
  const dateObj = new Date()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  const newDate = `${year}/${month}/${day}`
  return newDate
}
