export default {
  name: 'imageHint',
  title: 'Image Hint',
  type: 'object',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        maxLength: 96,
      },
    },
    {
      name: 'imageSrc',
      title: 'Image Hint',
      type: 'image',
    },
    {
      name: 'hintDifficulty',
      title: 'Hint Difficulty(Page to show this hint on in Verification)',
      type: 'number',
      options: {
        list: [
          {title: 'Easy', value: 0},
          {title: 'Medium', value: 1},
          {title: 'Hard', value: 2},
          {title: 'Image', value: 3},
        ]
      }
    },
  ]
}
