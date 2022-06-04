// need other events? https://developers.google.com/gtagjs/reference/event
import firebaseClient from './firebaseClient'
import { initializeAnalytics, logEvent } from 'firebase/analytics'
import {
  ColdLeadAttempt,
  SanityReportCard,
  SanityVerificationQuestion,
  VerificationQuestionStepEnum
} from '../../../utils/Types'

const analytics = initializeAnalytics(firebaseClient.app, {
  config: {
    send_page_view: false
  }
})

const analyticsPageView = (pathname: string, search: string, title: string) => {
  console.log('GA pageView ', pathname, search, title)

  if (analytics) {
    logEvent(analytics, 'page_view', {
      // page_location: "https://example.com/about",
      page_path: pathname + search,
      page_title: title
    })
  } else {
    console.log('This better be an automated test')
  }
}

const utils = {
  logEventWithData: (eventName: string, data: any) => {
    logEvent(analytics, eventName, data)
  }
}


const emailSubmittedEvent = (email: string, leadId: string) => {
  utils.logEventWithData('email_submitted', {
    email: email,
    leadId: leadId
  })
}
const emailTypedEvent = (currentEmail: string) => {
  utils.logEventWithData('email_validated', {
    email: currentEmail
  })
}

const attemptSubmitted = (leadId: string, levelOfDifficulty: VerificationQuestionStepEnum, verificationQuestion: ColdLeadAttempt) => {
  utils.logEventWithData('attempt_submitted', {
    leadId: leadId,
    ...verificationQuestion,
    levelOfDifficulty: levelOfDifficulty
  })
}

const attemptStarted = (leadId: string, verificationQuestion: SanityVerificationQuestion) => {
  utils.logEventWithData('attempt_started', {
    leadId: leadId,
    // questionSlug: verificationQuestion.slug?.current,
    levelOfDifficulty: verificationQuestion.levelOfDifficulty
  })
}

const blackCardSuccess = (leadId: string) => {
  utils.logEventWithData('black_card_success', {
    leadId: leadId,
  })
}

const blackCardFail = (leadId: string) => {
  utils.logEventWithData('black_card_fail', {
    leadId: leadId,
  })
}

const blackCardViewed = (leadId: string, blackCard: SanityReportCard) => {
  utils.logEventWithData('black_card_viewed', {
    leadId: leadId,
    ...blackCard
  })
}

const addQuestionClicked = (leadId: string) => {
  utils.logEventWithData('add_question_click', {
    leadId: leadId,
  })
}

const veriQImageUploaded = (leadId: string) => {
  utils.logEventWithData('proposed_question_image_upload', {
    leadId: leadId,
  })
}

const veriQQuestionEntered = (leadId: string, question: string) => {
  utils.logEventWithData('proposed_question_question_entered', {
    leadId: leadId,
    question: question,
  })
}

const veriQQuestionCorrectAnswerEntered = (leadId: string, correctAnswer: string) => {
  utils.logEventWithData('proposed_question_correct_answer_entered', {
    leadId: leadId,
    correctAnswer: correctAnswer,
  })
}

const veriQQuestionInCorrectAnswerEntered = (leadId: string, incorrectAnswer: string) => {
  utils.logEventWithData('proposed_question_incorrect_answer_entered', {
    leadId: leadId,
    incorrectAnswer: incorrectAnswer
  })
}

const veriQQuestionCategoryEntered = (leadId: string, category: string) => {
  utils.logEventWithData('proposed_question_category_entered', {
    leadId: leadId,
    category: category
  })
}

const veriQQuestionSubmitted = (leadId: string, question:string, correctAnswer: string) => {
  utils.logEventWithData('proposed_question_submitted', {
    leadId: leadId,
    question: question,
    correctAnswer: correctAnswer
  })
}

const veriQQuestionSubmittedSuccess = (leadId: string, questionId:string, questionSlug:string) => {
  utils.logEventWithData('proposed_question_submitted_success', {
    leadId: leadId,
    questionId: questionId,
    questionSlug: questionSlug
  })
}
const veriQResponseClickedAnyway = (questionId:string, questionSlug:string) => {
  utils.logEventWithData('user_clicking_untriggered_responses', {
    questionId: questionId,
    questionSlug: questionSlug
  })
}

enum SocialMediaEnum {
  TWITTER="twitter",
  FACEBOOK="facebook",
  INSTAGRAM="instagram"
}
const twitterLinkClicked = (id:string, questionId:string) => {
  utils.logEventWithData('social_link_clicked', {
    leadId: id,
    questionId: questionId,
    social: SocialMediaEnum.TWITTER
  })
}


export default {
  veriQQuestionCorrectAnswerEntered,
  veriQQuestionSubmittedSuccess,
  veriQQuestionSubmitted,
  veriQQuestionCategoryEntered,
  veriQQuestionInCorrectAnswerEntered,
  analyticsPageView,
  emailTypedEvent,
  emailSubmittedEvent,
  attemptStarted,
  attemptSubmitted,
  blackCardViewed,
  blackCardSuccess,
  blackCardFail,
  addQuestionClicked,
  veriQImageUploaded,
  veriQQuestionEntered,
  veriQResponseClickedAnyway,
  twitterLinkClicked
}
