export default {
  name: 'coldLead',
  title: 'Cold Lead',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'easyAttempt',
      title: 'Easy Attempt',
      type: 'coldLeadAttempt',
    },
    {
      name: 'mediumAttempt',
      title: 'Medium Attempt',
      type: 'coldLeadAttempt',
    },
    {
      name: 'hardAttempt',
      title: 'Hard Attempt',
      type: 'coldLeadAttempt',
    },
    {
      name: 'imageAttempt',
      title: 'Image Attempt',
      type: 'coldLeadAttempt',
    },
  ],
  preview: {
    select: {
      title: 'email'
    },
  },
}
