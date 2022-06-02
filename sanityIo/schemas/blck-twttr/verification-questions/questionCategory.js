export default {
  name: 'questionCategory',
  title: 'Question Category',
  type: 'object',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'number',
      options: {
        list: [
          {title: 'Spades', value: 0},
          {title: 'Movies,Movies Actors & Actresses', value: 1},
          {title: 'Music & Music Artists', value: 2},
          {title: 'TV,TVs Actors & Actresses', value: 3},
          {title: '#BlackTwitter', value: 4},
          {title: 'Black Grammar', value: 5},
          {title: 'Black Trivia', value: 6},
          {title: 'Math', value: 7},
        ]
      }
    },
  ]
}
