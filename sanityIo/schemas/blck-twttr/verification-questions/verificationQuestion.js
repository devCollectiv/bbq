export default {
  name: 'verificationQuestion',
  title: 'Verification Question',
  type: 'document',
  fields: [

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
      name: 'imageSrc',
      title: 'Image Hint',
      type: 'image'
    },
    {
      name: 'question',
      title: 'Question',
      type: 'string'
    },
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
      title: 'question',
      media: 'imageSrc'
    }
  }
}
