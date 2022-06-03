import cmsClient from './cmsClient'
import SanityVerificationCategory from '../enum/SanityVerificationCategory'
import { SanityVerificationQuestion, VerificationQuestionStepEnum } from '../../../utils/Types'
import sanityClient from '../../../sanityClient'

const getCategoryCountsByDifficulty = async (): Promise<any[][]> => {
  const data = await cmsClient.getAllVerificationQuestionCategoriesAndDifficulties()

  const categoryKeyArray = SanityVerificationCategory.enumKeysArr

  let accumlatedArrArr = [
    Array(categoryKeyArray.length).fill(0),
    Array(categoryKeyArray.length).fill(0),
    Array(categoryKeyArray.length).fill(0)
  ]

  const categoryCounts = data.reduce((accumulatedCategoryCounts, catDifficult) => {
    accumulatedCategoryCounts[catDifficult.levelOfDifficulty][catDifficult.category] = accumulatedCategoryCounts[catDifficult.levelOfDifficulty][catDifficult.category] + 1
    return accumulatedCategoryCounts
  }, accumlatedArrArr)

  return categoryCounts
}

const fetchRandomVerificationQuestion = async (verificationQuestionDifficulty: VerificationQuestionStepEnum, categoryNumber?: any): Promise<SanityVerificationQuestion> => {
  console.log('fetchingRandomVerificationQuestions', verificationQuestionDifficulty, categoryNumber)

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

  let allQuestionsForDifficulty

  if (categoryNumber) {
    allQuestionsForDifficulty = await cmsClient.getAllVerificationQuestionByCategoryAndDifficulty(verificationDifficulty, categoryNumber)
  } else {
    allQuestionsForDifficulty = await cmsClient.fetchAllVerificationQuestionsForDifficulty(verificationQuestionDifficulty)
  }

  const dataLength = allQuestionsForDifficulty.length
  const randomQuestionIndex = Math.floor(Math.random() * dataLength)

  return allQuestionsForDifficulty[randomQuestionIndex]
}

export default {
  fetchRandomVerificationQuestion,
  getCategoryCountsByDifficulty
}