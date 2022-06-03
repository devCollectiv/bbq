import sanityClient from '../../sanityClient'
import { ColdLeadAttempt } from '../../utils/Types'

const createLead = (email: string): Promise<any> => {
  if(!email){
    console.log('createLead', 'ERROR', 'could not create Lead no Email')
    return Promise.reject(Error("could not create Lead no email from user"))
  }

  console.log('createLead', 'NOTICE', 'potential Lead ', email)

  return sanityClient.create({
    _type: 'coldLead',
    email: email
  }).catch((e: any) => {
    console.log('createLead', 'ERROR', 'could not create cold Lead', e)
    return e
  })
}

export type UpdateLeadRequest = {
  email?: string
  easyAttempt?: ColdLeadAttempt
  mediumAttempt?: ColdLeadAttempt
  hardAttempt?: ColdLeadAttempt
  imageAttempt?: ColdLeadAttempt
  _id?:string
}

const updateLead = (request: UpdateLeadRequest): Promise<UpdateLeadRequest> => {
  const LOG = `update-lead-${request._id}`

  console.log(LOG, 'sendingupdate lead req', request)

  try {
    return sanityClient
      .patch(request._id ?? '')
      .setIfMissing({
        easyAttempt: request.easyAttempt,
        mediumAttempt: request.mediumAttempt,
        hardAttempt: request.hardAttempt,
        imageAttempt: request.imageAttempt,
      })
      .commit()
  } catch (e) {
    console.log(LOG, 'error: ', e)
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(e)
  }
}

export default {createLead, updateLead}