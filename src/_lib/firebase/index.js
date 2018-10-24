const db = 'https://date-fns.firebaseio.com'

export const firebaseURL = (path) =>
  `${db}/${path}.json`
