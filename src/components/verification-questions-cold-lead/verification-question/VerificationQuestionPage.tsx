import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useHistory, useLocation, useParams } from 'react-router-dom'
import leadClient, { UpdateLeadRequest } from '../leadClient'
import { RoutesEnum } from '../../../App'
import VerificationPageLayout from '../verification-results/VerificationPageLayout'
import MediumVerificationQuestionHeader from './components/medium/MediumVerificationQuestionHeader'
import VerificationQuestionCategorySelector
  from './components/category-selector-modal/VerificationQuestionCategorySelector'
import HardVerificationQuestionHeader from './components/hard/HardVerificationQuestionHeader'
import VerificationQuestionImage from './components/VerificationQuestionImage'
import VerificationQuestion from './components/VerificationQuestion'
import { useStepStyles } from '../email-capture-step/EmailCaptureStep'
import EasyVerificationQuestionHeader from './components/easy/EasyVerificationQuestionHeader'
import {
  ColdLead, ColdLeadAttempt,
  SanityVerificationQuestion, SanityVerificationQuestionCategoryEnumType,
  VerificationQuestionStepEnum,
  VerificationStepProps
} from '../../../utils/Types'
import blckTwttrTheme from '../../theme/Theme'
import firebaseAnalyticsClient from '../../shared/firebase/firebaseAnalyticsClient'
import cmsClient from '../../shared/cms/cmsClient'
import VerificationQuestionCtaButton from '../VerificationQuestionCtaButton'
import cmsService from '../../shared/cms/cmsService'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      paddingTop: theme.spacing(16)
    }
  },
  formContainer: {
    zIndex: 1200,
    [theme.breakpoints.down('xs')]: {
      width: '300px'
    },
    [theme.breakpoints.up('sm')]: {
      width: '492px'
    }
  },
  button: {
    height: '40px',
    boxShadow: '8px 8px #CEE4D1',
    [theme.breakpoints.down('xs')]: {
      boxShadow: '4px 4px #CEE4D1'
    }
  },
  nameContainer: {
    height: '72px'
  },
  websiteContainer: {
    height: '72px'
  },
  loanAmountContainer: {
    height: '72px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(6)
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.5)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    width: '377px'
  },
  pageIndicator: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      width: '24px'
    }
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  emailContainer: {
    height: '72px',
    marginTop: theme.spacing(11)
  },
  responsiveTitle: {
    borderLeft: '8px solid transparent',
    [theme.breakpoints.up('sm')]: theme.typography.h3
  },
  responsiveTitleBrand: {
    position: 'relative'
  },
  geogrid: {
    marginLeft: theme.spacing(5)
  },
  step2Accent: {
    display: 'inline-flex',
    background: '#CEE4D1',
    borderRadius: '51.07px',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      top: '5px',
      left: '-4px',
      width: '122px',
      height: '22.3px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '16px',
      left: '-20px',
      width: '164px',
      height: '31.3px'
    }
  },
  step2AccentTypography: {
    top: 0,
    left: 0,
    position: 'absolute'
  },
  formFieldsContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6),
      height: '268px'

    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
      height: '300px'

    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(5.25),
      height: '288px'
    }
  },
  disabledButton: {
    marginTop: theme.spacing(1)
  }
}))

const VerificationQuestionPage: FunctionComponent<VerificationStepProps> = ({}: VerificationStepProps) => {
  const classes = useStepStyles(blckTwttrTheme)
  const history = useHistory()
  const {id, difficulty}: { id?: any, difficulty?: string } = useParams()
  const [buttonText, setButtonText] = React.useState<string>('')
  const [formSubmitting, setFormSubmitting] = React.useState(false)
  const [verificationQuestionQuestion, setVerificationQuestionQuestion] = React.useState<SanityVerificationQuestion>({})
  const [coldLead, setColdLead] = React.useState<ColdLead>()
  const [nextQuestionDifficulty, setNextQuestionDifficulty] = React.useState<VerificationQuestionStepEnum>()
  const [headerText, setHeaderText] = React.useState<any>()
  const [updateReqKeyValueName, setUpdateReqKeyValueName] = React.useState<string>('')
  const location = useLocation()

  React.useEffect(() => {


    if (difficulty) {
      console.log('difficulty is', difficulty)
      const difficultyEnum: VerificationQuestionStepEnum = parseInt(difficulty)

      let difficultyStr
      let translateDifficulty
      let translatedButtonText
      let translatedHeaderText
      let keyValue

      switch (difficultyEnum) {
        case VerificationQuestionStepEnum.EASY:
          keyValue = 'easyAttempt'
          difficultyStr = 'Easy'
          translateDifficulty = VerificationQuestionStepEnum.MEDIUM
          translatedButtonText = 'Ok, next question...'
          translatedHeaderText = <EasyVerificationQuestionHeader/>
          break
        case VerificationQuestionStepEnum.MEDIUM:
          keyValue = 'mediumAttempt'
          difficultyStr = 'Medium'
          translateDifficulty = VerificationQuestionStepEnum.HARD
          translatedButtonText = '...aight cool, one more question...'
          translatedHeaderText = <MediumVerificationQuestionHeader/>
          break
        case VerificationQuestionStepEnum.HARD:
          keyValue = 'hardAttempt'
          difficultyStr = 'Hard'
          translateDifficulty = VerificationQuestionStepEnum.DONE
          translatedButtonText = 'Submit Responses.'
          translatedHeaderText = <HardVerificationQuestionHeader/>
          break
        default:
          keyValue = 'easyAttempt'
          difficultyStr = 'image'
          translateDifficulty = VerificationQuestionStepEnum.EASY
          translatedButtonText = 'Ok, next question...'

      }
      console.log('translated difficulty is', difficulty, translateDifficulty)
      setButtonText(translatedButtonText)
      setNextQuestionDifficulty(translateDifficulty)
      setHeaderText(translatedHeaderText)
      setUpdateReqKeyValueName(keyValue)

      if (location) {
        document.title = `BlckTwttr | Verification Question #BlackTwitterVerificationQuestions - ${difficultyStr}`
        firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, `${difficultyStr} Verification Question`)
      }
    } else {
      history.push(RoutesEnum.ENTRY_QUESTIONS)
    }
  }, [difficulty])

  React.useEffect(() => {
    if (id) {
      cmsClient.fetchColdLead(id).then((retrievedLead: ColdLead) => {
        setColdLead(retrievedLead)
      })
    } else {
      history.push(RoutesEnum.ENTRY_QUESTIONS)
    }
  }, [id])

  const [retries, setRetries] = React.useState<number>(0)

  const getRandomQuestion = async (categoryNumber?: any) => {
    const difficultyInt = parseInt(difficulty ?? '')

    return cmsService.fetchRandomVerificationQuestion(difficultyInt, categoryNumber).then((question) => {
      setRetries(state => state + 1)
      setVerificationQuestionQuestion(question)
      return
    })
  }

  React.useEffect(() => {
    getRandomQuestion().then(() => {
    })
  }, [nextQuestionDifficulty])

  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [response, setResponse] = React.useState<string | undefined>()
  const updateLead = (): Promise<void> => {
    if (coldLead) {
      setFormSubmitting(true)

      const verifyResponse = (response?.trim() === verificationQuestionQuestion?.correctAnswer?.trim())

      if (verifyResponse) {
        setIsVerified(true)
      }

      let keyValue
      switch (parseInt(difficulty ?? '')) {
        case VerificationQuestionStepEnum.EASY:
          keyValue = 'easyAttempt'
          break
        case VerificationQuestionStepEnum.HARD:
          keyValue = 'hardAttempt'
          break
        case VerificationQuestionStepEnum.MEDIUM:
          keyValue = 'mediumAttempt'
          break
        default:
          keyValue = 'easyAttempt'
          break
      }

      const attempt: { [key in string]: ColdLeadAttempt } = {
        [keyValue]: {
          isVerified: verifyResponse,
          response: response ?? 'noResponseRecorded',
          questionId: verificationQuestionQuestion?._id ?? '',
          questionSlug: verificationQuestionQuestion?.slug?.current ?? '',
          questionRef: cmsClient.utils.getSanityDocumentRef(verificationQuestionQuestion?._id ?? '')
        }
      }

      const updateLeadRequest: UpdateLeadRequest = {
        _id: coldLead?._id,
        ...attempt
      }

      coldLead?._id && difficulty && attempt && firebaseAnalyticsClient.attemptSubmitted(coldLead._id, parseInt(difficulty), attempt[keyValue])

      return leadClient.updateLead(updateLeadRequest).then((result: UpdateLeadRequest) => {
        setFormSubmitting(false)
        setResponse(undefined)
        if (nextQuestionDifficulty === VerificationQuestionStepEnum.DONE) {
          history.push(RoutesEnum.ENTRY_QUESTIONS_RESULTS + '/' + coldLead?._id)
        } else {
          history.push(RoutesEnum.ENTRY_QUESTIONS + '/' + nextQuestionDifficulty + '/' + coldLead?._id)
        }
      }).catch(() => {
        setFormSubmitting(false)
      })
    } else {
      return Promise.reject('Error: no cold Lead retrieved')
    }
  }


  React.useEffect(() => {
    if (coldLead?._id && verificationQuestionQuestion) {
      firebaseAnalyticsClient.attemptStarted(coldLead._id, verificationQuestionQuestion)
    }
  }, [verificationQuestionQuestion])

  const handleSetCurrentCategory = (category: SanityVerificationQuestionCategoryEnumType) => {
    console.log('setting current category', category)
    if (category) {
      getRandomQuestion(category.value).then(() => {
      })
    }
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  return (
    <VerificationPageLayout>

      <Grid container item style={{marginBottom: blckTwttrTheme.spacing(5)}}>
        {headerText}
      </Grid>
      <Grid container justifyContent='center' item spacing={3}>
        {/*{retries > 0 && <Typography>Retries: {retries}</Typography>}*/}
        {
          verificationQuestionQuestion?.imageSrc
          && <VerificationQuestionImage imageSrc={verificationQuestionQuestion.imageSrc}/>
        }
        <Grid item xs={12} sm={6} container justifyContent='center'>
          <VerificationQuestion handleSetSelectedResponse={(passedResponse) => setResponse(passedResponse)}
                                verificationQuestion={verificationQuestionQuestion}/>
        </Grid>
      </Grid>
      <Grid container item xs={11}>
        <VerificationQuestionCtaButton onClicked={updateLead} isLoading={formSubmitting} buttonText={buttonText}
                                       isDisabled={!response} disabledButtonText={'Answer the Question.'}/>
        {verificationQuestionQuestion && verificationQuestionQuestion.category &&
          <VerificationQuestionCategorySelector currentCategory={verificationQuestionQuestion.category.category}
                                                currentDifficulty={parseInt(difficulty ?? '')}
                                                handleSetCurrentCategory={handleSetCurrentCategory}/>}
      </Grid>
    </VerificationPageLayout>
  )
}


export default VerificationQuestionPage

