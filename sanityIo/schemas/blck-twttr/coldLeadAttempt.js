export default {
  name: 'coldLeadAttempt',
  title: 'Cold Lead Attempt',
  type: 'object',
  fields: [
    {
      name: 'isVerified',
      title: 'Is Verified',
      type: 'boolean',
    },
    {
      name: 'response',
      title: 'Response',
      type: 'string',
    },
    {
      name: 'questionId',
      title: 'QuestionId',
      type: 'string',
    },
    {
      name: 'questionSlug',
      title: 'Question Slug',
      type: 'string',
    },
    {
      name: 'questionRef',
      title: 'Question',
      type: 'reference',
      to:[{type:"verificationQuestion"}]
    },
  ]
}
