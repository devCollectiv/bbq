export default {
  name: 'imageVerificationQuestion',
  title: 'Image Verification Question',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96
      }
    },
    {
      name: 'levelOfDifficulty',
      title: 'Level of Difficulty',
      type: 'number',
      options: {
        list: [
          {title: 'Easy', value: 0},
          {title: 'Medium', value: 1},
          {title: 'Hard', value: 2},
          {title: 'Image', value: 3}
        ]
      }
    },
    {
      name: 'question',
      title: 'Question',
      type: 'string'
    },
    {
      name: 'correctAnswer',
      title: 'Correct Answer',
      type: 'string'
    },
    {
      name: 'incorrectAnswers',
      title: 'Incorrect Answers',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'imageHints',
      title: 'Image hints',
      type: 'array',
      of: [{type: 'imageHint'}]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'questionCategory'
    },
    {
      name: 'isEnabled',
      title: 'Enabled?',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'question'
    }
  }
}
