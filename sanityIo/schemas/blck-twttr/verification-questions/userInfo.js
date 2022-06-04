export default {
  name: 'userInfo',
  title: 'User Info',
  type: 'object',
  fields: [
    {
      name: 'proposedCategory',
      title: 'Proposed Category',
      type: 'string'
    },
    {
      name: 'userRef',
      title: 'User',
      type: 'reference',
      to:[{type:'coldLead'}]
    },
  ]
}
