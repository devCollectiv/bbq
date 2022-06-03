import SanityVerificationCategory, {
  SanityVerificationQuestionCategoryEnumKeys
} from '../components/shared/enum/SanityVerificationCategory'
import { SanityImage } from '../components/shared/cms/cmsClient'

export type SanityRepositoryType = {
  _type: string,
  service: string,
  slug: SanitySlug,
  repoLink: SanityUrl,
  author: { name: string, image: any, _id: string }
}

export type SanitySourceCodeType<T> = {
  filename?: string,
  slug?: SanitySlug,
  repoLink?: T,
  theCode?: any,
  links?: { url: string, text: string }[]
}

export type SanitySlug = {
  _type: string,
  current: string
}

export type SanityUrl = {
  url: string,
  text: string
}
export type SanityVerificationQuestionCategoryEnumType = {
  displayName: string,
  value: number
}


export declare type SanityRef = {
  _type: string;
  _ref: string;
  _key?: string;
};

export type SanityVerificationQuestion = {
  slug?: SanitySlug
  _id?:string
  imageSrc?: SanityImage
  category?: {category: SanityVerificationQuestionCategoryEnumKeys}
  question?: string
  correctAnswer?: string
  incorrectAnswers?: string[]
  levelOfDifficulty?: VerificationQuestionStepEnum
}

export enum  VerificationQuestionStepEnum {
  EASY,
  MEDIUM,
  HARD,
  DONE,
}

export type ImageHint = {
  imageSrc?: SanityImage
  hintDifficulty: VerificationQuestionStepEnum
}

export type SanityImageVerificationQuestion ={
  slug?: SanitySlug,
  _id?:string,
  question?: string,
  correctAnswer?: string
  incorrectAnswers?: string[]
  levelOfDifficulty?: VerificationQuestionStepEnum
  imageHints?: ImageHint[]
}

export type SanityReportCard ={
  easyAttemptResult: boolean
  mediumAttemptResult: boolean
  hardAttemptResult: boolean
  // imageAttemptResult: boolean
  isVerified: boolean
}

export type ColdLead = {
  _id?:string
  email: string,
  easyAttempt?: ColdLeadAttempt,
  mediumAttempt?: ColdLeadAttempt
  hardAttempt?: ColdLeadAttempt
  imageAttempt?: ColdLeadAttempt
}

export type ColdLeadAttempt = {
  isVerified: boolean
  questionId: string
  questionSlug: string
  response: string
  questionRef: SanityRef
}

export type VerificationStepProps ={
  lead: ColdLead,
  setLead(lead:any): void
}


export type SanityCategoryDifficultyType = {
levelOfDifficulty: VerificationQuestionStepEnum,
  category: SanityVerificationQuestionCategoryEnumKeys
}