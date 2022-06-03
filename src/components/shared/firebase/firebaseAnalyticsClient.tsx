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


// const analyticsUserSignUp = (provider: string) => {
//   console.log('Firebase Analytics user Signup', provider)
//   firebaseClient.app.analytics().logEvent('sign_up', {
//     method: provider,
//   })
// }
//
// const analyticsUserLogIn = (userId: string, provider: string) => {
//   console.log('Firebase Analytics user Login', provider)
//   firebaseClient.app.analytics().logEvent('login', {
//     method: provider,
//     id: userId,
//   })
// }
//
// const analyticsUserLogOut = (userId: string, provider: string) => {
//   console.log('Firebase Analytics user logout', provider)
//   firebaseClient.app.analytics().logEvent('logout', {
//     method: provider,
//     id: userId,
//   })
// }

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


const logEventWithData = (eventName: string, data: any) => {
  logEvent(analytics, eventName, data)
}

const emailSubmittedEvent = (email: string, leadId: string) => {
  logEventWithData('email_submitted', {
    email: email,
    leadId: leadId
  })
}
const emailTypedEvent = (currentEmail: string) => {
  logEventWithData('email_validated', {
    email: currentEmail
  })
}

const attemptSubmitted = (leadId: string, levelOfDifficulty: VerificationQuestionStepEnum, verificationQuestion: ColdLeadAttempt) => {
  logEventWithData('attempt_submitted', {
    leadId: leadId,
    ...verificationQuestion,
    levelOfDifficulty: levelOfDifficulty
  })
}

const attemptStarted = (leadId: string, verificationQuestion: SanityVerificationQuestion) => {
  logEventWithData('attempt_started', {
    leadId: leadId,
    // questionSlug: verificationQuestion.slug?.current,
    levelOfDifficulty: verificationQuestion.levelOfDifficulty
  })
}

const reportCardSuccess = (leadId: string) => {
  logEventWithData('report_card_success', {
    leadId: leadId,
  })
}

const reportCardFail = (leadId: string) => {
  logEventWithData('report_card_fail', {
    leadId: leadId,
  })
}

const reportCardViewed = (leadId: string, reportCard: SanityReportCard) => {
  logEventWithData('report_card_viewed', {
    leadId: leadId,
    ...reportCard
  })
}

// const analyticsFavoritedABall = (ballSlug: string) => {
//   console.log('GA favorite ball', ballSlug)
//
//   firebaseClient.app.analytics().logEvent('add_favorite_ball', {
//     slug: ballSlug,
//   })
// }
//
// const analyticsUnfavoriteABall = (ballSlug: string) => {
//   console.log('GA unfavorite ball', ballSlug)
//
//   firebaseClient.app.analytics().logEvent('remove_favorite_ball', {
//     slug: ballSlug,
//   })
// }
//
// const analyticsViewBall = (ball: SanityBall) => {
//   console.log('GA ballView ', ball)
//
//   firebaseClient.app.analytics().logEvent('ball_view', {
//     ...ball,
//   })
// }

export default {
  // analyticsFavoritedABall,
  analyticsPageView,
  emailTypedEvent,
  emailSubmittedEvent,
  attemptStarted,
  attemptSubmitted,
  reportCardViewed,
  reportCardSuccess,
  reportCardFail
  // analyticsViewBall,
  // analyticsUserSignUp,
  // analyticsUnfavoriteABall,
  // analyticsUserLogIn,
  // analyticsUserLogOut,
}
