export type SanityVerificationQuestionCategoryEnumType = {
  displayName: string,
  value: number
}

const SanityVerificationQuestionCategoryEnum: { [key: string]: SanityVerificationQuestionCategoryEnumType } = Object.freeze({
  SPADES: {displayName: '♠ Spades', value: 0},
  MOVIES: {displayName: '🍿 Movies', value: 1},
  MUSIC: {displayName: '🎶️ Music', value: 2},
  TV: {displayName: '📺 TV', value: 3},
  BLACK_TWITTER: {displayName: '🖤 Black Twitter', value: 4},
  BLACK_GRAMMAR: {displayName: '🗣 Black Grammar', value: 5},
  BLACK_TRIVIA: {displayName: '⁇ Black Trivia', value: 6},
  MATH: {displayName: '🔢 Math', value: 7}
})

export const SanityVerificationQuestionCategoryEnumKeys = Object.keys(SanityVerificationQuestionCategoryEnum)

export default SanityVerificationQuestionCategoryEnum
