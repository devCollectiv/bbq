import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { MEDIUM } from 'material-ui/utils/withWidth'
import { SanityImageAsset } from '@sanity/asset-utils'
import { SanityImage } from '../../components/abReplica/cmsClient'
import SanityVerificationCategory from './SanityVerificationCategory'

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

export declare type SanityRef = {
  _type: string;
  _ref: string;
  _key?: string;
};

export type SanityVerificationQuestion = {
  slug?: SanitySlug
  _id?:string
  imageSrc?: SanityImage
  category?: {category: typeof SanityVerificationCategory}
  question?: string
  correctAnswer?: string
  incorrectAnswers?: string[]
  levelOfDifficulty?: VerificationQuestionDifficultyEnum
}

export enum VerificationQuestionDifficultyEnum {
  EASY,
  MEDIUM,
  HARD,
  IMAGE,
}

export type ImageHint = {
  imageSrc?: SanityImage
  hintDifficulty: VerificationQuestionDifficultyEnum
}

export type SanityImageVerificationQuestion ={
  slug?: SanitySlug,
  _id?:string,
  question?: string,
  correctAnswer?: string
  incorrectAnswers?: string[]
  levelOfDifficulty?: VerificationQuestionDifficultyEnum
  imageHints?: ImageHint[]
}


export type SanityReportCard ={
  easyAttemptResult: boolean
  mediumAttemptResult: boolean
  hardAttemptResult: boolean
  // imageAttemptResult: boolean
  isVerified: boolean
}