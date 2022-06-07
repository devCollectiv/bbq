import imageUrlBuilder from '@sanity/image-url'
import {
  AddVerificationQuestionState,
  ColdLead, SanityCategoryDifficultyType, SanityImageVerificationQuestion,
  SanityRef,
  SanityVerificationQuestion,
  VerificationQuestionStepEnum
} from '../../../utils/Types'
import sanityClient from '../../../sanityClient'
import { SanityVerificationQuestionCategoryEnumKeys } from '../enum/SanityVerificationCategory'
import cmsClient from './cmsClient'
import { v4 as uuidv4 } from 'uuid'
import verificationQuestion
  from '../../verification-questions-cold-lead/verification-question/components/VerificationQuestion'


export type SanityMenuItem = {
  title?: string,
  displayText?: string,
  url?: string
  isOutlinedButton?: boolean
  isContainedButton?: boolean
}

export type SanitySlug = {
  _type: string,
  current: string
}

export type SanityMenuGroup = {
  title?: string,
  menuGroupTitle?: string,
  slug?: SanitySlug,
  displayText?: string,
  links?: SanityMenuItem[]
}

export type SanityMenuContainer = {
  title?: string,
  slug?: SanitySlug,
  displayText?: string,
  menuItems?: SanityMenuGroup[]
  logoImageAltText?: string
  logoImageSrc?: SanityImage
}

export type SanityBlogCategory = {
  title: string
  description?: string | null
  color: { title: string, value: string }
}

export type SanityImage = {
  asset: {
    _id: string,
    url: string,
    altText: string,
    metadata: {
      hasAlpha: boolean
      isOpaque: boolean
      lqip?: string
      blurHash?: string
      dimensions: {
        _type: 'sanity.imageDimensions'
        aspectRatio: number
        height: number
        width: number
      }
    },
  }
}

const builder = imageUrlBuilder(sanityClient)
const utils = {
  urlFor: (source: SanityImage) => {
    return source && source.asset ? builder.image(source) : undefined
  },
  convertToSlugStr: (slugStr: string) => {
    return slugStr
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  },
  convertToSlugObj: (slugStr: string):SanitySlug => {
    return {
      _type: "slug",
      current: slugStr
    }
  },
  getSanityDocumentRef: (sanityId: string): SanityRef => ({
    _type: 'reference',
    _ref: sanityId
  }),
  getSanityKeyedValue: (value: any) => {
    return {
      _key: uuidv4(),
      value: value
    }
  }
}

const fetchRef = (sanityRef: SanityRef): Promise<any> => {

  return sanityClient
    .fetch(
      `*[_id == $reference][0]`,
      {reference: sanityRef._ref}
    ).then((data: any) => {
      return data
    })
}

const fetchAllVerificationQuestionsForDifficulty = (verificationQuestionDifficulty: VerificationQuestionStepEnum): Promise<SanityVerificationQuestion[]> => {
  console.log('fetchAllVerificationQuestionsForDifficulty', verificationQuestionDifficulty)

  let verificationDifficulty

  switch (verificationQuestionDifficulty) {
    case VerificationQuestionStepEnum.EASY:
      verificationDifficulty = VerificationQuestionStepEnum.EASY
      break
    case VerificationQuestionStepEnum.HARD:
      verificationDifficulty = VerificationQuestionStepEnum.HARD
      break
    case VerificationQuestionStepEnum.DONE:
      verificationDifficulty = VerificationQuestionStepEnum.DONE
      break
    case VerificationQuestionStepEnum.MEDIUM:
      verificationDifficulty = VerificationQuestionStepEnum.MEDIUM
      break
    default:
      verificationDifficulty = VerificationQuestionStepEnum.EASY
  }

  return sanityClient
    .fetch(
      `*[_type == "verificationQuestion" && levelOfDifficulty == $verificationDifficulty  && isEnabled == true]{
          _id,
          slug,
          levelOfDifficulty,
          question,
          correctAnswer,
          incorrectAnswers[],
          imageSrc{
            asset->{
              url,
              metadata
             }
          },
          category{
             category
          },
       }`,
      {verificationDifficulty}
    ).then((data: any[]) => {
      return data
    })
}

const fetchColdLead = (leadId: string): Promise<ColdLead> => {
  console.log('fetchColdLead')
  return sanityClient
    .fetch(
      `*[_type == "coldLead" && _id == $leadId]{
          _id,
          email,
          easyAttempt {
            isVerified,
            response,
            questionId,
            questionSlug,
            questionRef->,
          },
          mediumAttempt{
            isVerified,
            response,
            questionId,
            questionSlug,
            questionRef->,
          },
          hardAttempt{
            isVerified,
            response,
            questionId,
            questionSlug,
            questionRef->,
          },
          category {
             category
          }
       }`,
      {leadId}
    ).then((data: any[]) => {
      return data[0]
    })
}

const getAllVerificationQuestionCategoriesAndDifficulties = (): Promise<SanityCategoryDifficultyType[]> => {
  console.log('getAllVerificationQuestionCategoriesAndDifficulties')

  return sanityClient
    .fetch(
      `*[_type=='verificationQuestion' && isEnabled == true]{
          levelOfDifficulty,
          "category": category.category
        }`
    ).then((data: SanityCategoryDifficultyType[]) => {
      return data
    })
}

const getAllVerificationQuestionByCategoryAndDifficulty = (verificationDifficulty: VerificationQuestionStepEnum, categoryNumber: SanityVerificationQuestionCategoryEnumKeys): Promise<SanityVerificationQuestion[]> => {
  console.log('getAllVerificationQuestionCategoriesAndDifficulties')

  return sanityClient
    .fetch(
      `*[_type == "verificationQuestion" && levelOfDifficulty == $verificationDifficulty && category.category == $categoryNumber && isEnabled == true]{
          _id,
          slug,
          levelOfDifficulty,
          question,
          correctAnswer,
          incorrectAnswers[],
          imageSrc{
            asset->{
              url,
              metadata
             }
          },
          category{
             category
          },
       }`,
      {verificationDifficulty, categoryNumber}
    ).then((data: SanityVerificationQuestion[]) => {
      return data
    })
}

export const createVerificationQuestion = (proposedQuestion: AddVerificationQuestionState): Promise<SanityVerificationQuestion> => {
  console.log('About to create a verification Question', proposedQuestion)

  let incorrectAnswerArr: any[] = []

  if (proposedQuestion.incorrect1) {
    incorrectAnswerArr = incorrectAnswerArr.concat(proposedQuestion.incorrect1)
  }
  if (proposedQuestion.incorrect2) {
    incorrectAnswerArr = incorrectAnswerArr.concat(proposedQuestion.incorrect2)
  }
  if (proposedQuestion.incorrect3) {
    incorrectAnswerArr = incorrectAnswerArr.concat(proposedQuestion.incorrect3)
  }

  if (proposedQuestion.coldLeadId && proposedQuestion.question) {
    const createVerificationQuestionRequest: SanityVerificationQuestion&{slug: SanitySlug} = {
      question: proposedQuestion.question,
      slug: cmsClient.utils.convertToSlugObj(cmsClient.utils.convertToSlugStr(proposedQuestion.question)),
      correctAnswer: proposedQuestion.correctAnswer,
      incorrectAnswers: incorrectAnswerArr,
      userInfo: {
        userRef: utils.getSanityDocumentRef(proposedQuestion.coldLeadId),
        proposedCategory: proposedQuestion.proposedCategory
      }
    }

    return sanityClient
      .create({
        ...createVerificationQuestionRequest,
        _type: 'verificationQuestion'
      }).then((res: any) => {
        console.log('result from create veriQ', res)
        return res
      })
  }

  return Promise.reject(Error('No User Id'))
}

const uploadVerificationQuestionImage = (blob: any, verificationQuestionId: string): Promise<SanityVerificationQuestion> => {
  return sanityClient.assets
    .upload('image',
      blob,
      {filename: verificationQuestionId})
    .then(imageAsset => sanityClient
      .patch(verificationQuestionId)
      .set({
        imageSrc: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
      .commit())
    .then((newVerificationQuestion: any) => {
      console.log('Done uploading ball flyer image asset to Sanity!')
      return newVerificationQuestion
    }).catch((e) => {
      return Promise.reject(Error('Error uploading image asset to sanity. Error: ' + e.toString()))
    })
}

// const fetchVerificationQuestion = (questionId:string) =>{
//     console.log('fetchVerificationQuestion')
//
//     return sanityClient
//       .fetch(
//         `*[_type == "verificationQuestion" && _id == $questionId && isEnabled != true]{
//           _id,
//           slug,
//           levelOfDifficulty,
//           question,
//           correctAnswer,
//           incorrectAnswers[],
//           imageSrc{
//             asset->{
//               url,
//               metadata
//              }
//           },
//           category{
//              category
//           },
//        }`,
//         {questionId}
//       ).then((data: SanityVerificationQuestion[]) => {
//         console.log("THe verification question raw", data)
//         return data[0]
//       })
// }

export default {
  fetchRef,
  fetchAllVerificationQuestionsForDifficulty,
  fetchColdLead,
  getAllVerificationQuestionCategoriesAndDifficulties,
  getAllVerificationQuestionByCategoryAndDifficulty,
  createVerificationQuestion,
  uploadVerificationQuestionImage,
  // fetchVerificationQuestion,
  utils
}