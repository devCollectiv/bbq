import { SanityVerificationQuestionCategoryEnumType } from '../../../utils/Types'


export enum SanityVerificationQuestionCategoryEnumKeys {
  SPADES,
  MOVIES,
  MUSIC,
  TV,
  BLACK_TWITTER,
  BLACK_TRIVIA,
  BLACK_GRAMMAR,
  MATH,
}

const SanityVerificationQuestionCategoryEnum: { [key: string]: SanityVerificationQuestionCategoryEnumType } = Object.freeze({
  [SanityVerificationQuestionCategoryEnumKeys.SPADES]: {
    displayName: '♠ Spades',
    value: SanityVerificationQuestionCategoryEnumKeys.SPADES
  },
  [SanityVerificationQuestionCategoryEnumKeys.MOVIES]: {
    displayName: '🍿 Movies',
    value: SanityVerificationQuestionCategoryEnumKeys.MOVIES
  },
  [SanityVerificationQuestionCategoryEnumKeys.MUSIC]: {
    displayName: '🎶️ Music',
    value: SanityVerificationQuestionCategoryEnumKeys.MUSIC
  },
  [SanityVerificationQuestionCategoryEnumKeys.TV]: {
    displayName: '📺 TV',
    value: SanityVerificationQuestionCategoryEnumKeys.TV
  },
  [SanityVerificationQuestionCategoryEnumKeys.BLACK_TWITTER]: {
    displayName: '🖤 Black Twitter',
    value: SanityVerificationQuestionCategoryEnumKeys.BLACK_TWITTER
  },
  [SanityVerificationQuestionCategoryEnumKeys.BLACK_GRAMMAR]: {
    displayName: '🗣 Black Grammar',
    value: SanityVerificationQuestionCategoryEnumKeys.BLACK_GRAMMAR
  },
  [SanityVerificationQuestionCategoryEnumKeys.BLACK_TRIVIA]: {
    displayName: '⁇ Black Trivia',
    value: SanityVerificationQuestionCategoryEnumKeys.BLACK_TRIVIA
  },
  [SanityVerificationQuestionCategoryEnumKeys.MATH]: {
    displayName: '🔢 Math',
    value: SanityVerificationQuestionCategoryEnumKeys.MATH
  }
})

export default {
  objectsByEnum: SanityVerificationQuestionCategoryEnum,
  enumKeysArr: Object.keys(SanityVerificationQuestionCategoryEnumKeys).filter(x => !(parseInt(x) >= 0)),
  enum: SanityVerificationQuestionCategoryEnumKeys
}
