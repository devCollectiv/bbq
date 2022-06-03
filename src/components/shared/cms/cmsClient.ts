import imageUrlBuilder from '@sanity/image-url'
import {
  ColdLead, SanityCategoryDifficultyType, SanityImageVerificationQuestion,
  SanityRef,
  SanityVerificationQuestion,
  VerificationQuestionStepEnum
} from '../../../utils/Types'
import sanityClient from '../../../sanityClient'
import { SanityVerificationQuestionCategoryEnumKeys } from '../enum/SanityVerificationCategory'


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
  convertToSlug: (slugStr: string) => {
    return slugStr
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  },
  getSanityDocumentRef:(sanityId: string): SanityRef => ({
    _type: 'reference',
    _ref: sanityId,
  })
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

const getAllVerificationQuestionCategoriesAndDifficulties = ():Promise<SanityCategoryDifficultyType[]> => {
  console.log('getAllVerificationQuestionCategoriesAndDifficulties')

  return sanityClient
    .fetch(
      `*[_type=='verificationQuestion']{
          levelOfDifficulty,
          "category": category.category
        }`
    ).then((data: SanityCategoryDifficultyType[]) => {
      return data
    })
}

const getAllVerificationQuestionByCategoryAndDifficulty = (verificationDifficulty: VerificationQuestionStepEnum, categoryNumber: SanityVerificationQuestionCategoryEnumKeys):Promise<SanityVerificationQuestion[]> => {
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

export default {
  fetchRef,
  fetchAllVerificationQuestionsForDifficulty,
  fetchColdLead,
  getAllVerificationQuestionCategoriesAndDifficulties,
  getAllVerificationQuestionByCategoryAndDifficulty,
  utils
}