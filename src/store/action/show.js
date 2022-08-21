export const showlog = () => ({ type: 'LOG', num: 1 })
export const shownum = () => {
  return (dispatch) => {
    console.log('dispatch', 1)
    dispatch({
      type: 'NUM',
      num: 3,
    })
  }
}
