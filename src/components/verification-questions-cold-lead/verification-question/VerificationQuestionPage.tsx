import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  ImageHint,
  SanityVerificationQuestion,
  VerificationQuestionDifficultyEnum
} from '../../../common/sanityIo/Types'
import VerificationQuestion from './VerificationQuestion'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { ColdLead, StepProps } from '../PreSignup'
import leadClient, { UpdateLeadRequest } from '../leadClient'
import { RoutesEnum } from '../../../App'
import blckTwttrTheme from '../../abReplica/common/Theme'
import firebaseAnalyticsClient from '../../abReplica/firebaseAnalyticsClient'
import { useStepStyles } from '../email-capture-step/Step1'
import cmsClient from '../../abReplica/cmsClient'
import EasyVerificationQuestionHeader from './easy/EasyVerificationQuestionHeader'
import MediumVerificationQuestionHeader from './medium/MediumVerificationQuestionHeader'
import HardVerificationQuestionHeader from './hard/HardVerificationQuestionHeader'
import VerificationPageLayout from '../verification-results/VerificationPageLayout'
import VerificationQuestionImage from './VerificationQuestionImage'
import VerificationQuestionCategorySelector from './VerificationQuestionCategorySelector'
import { SanityVerificationQuestionCategoryEnumType } from '../../../common/sanityIo/SanityVerificationCategory'

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

const VerificationQuestionPage: FunctionComponent<StepProps> = ({
                                                                  lead,
                                                                  imageVerificationQuestion
                                                                }: StepProps) => {
  const classes = useStepStyles(blckTwttrTheme)
  const history = useHistory()
  const {id, difficulty}: { id?: any, difficulty?: string } = useParams()
  const [buttonText, setButtonText] = React.useState<string>('')
  const [formSubmitting, setFormSubmitting] = React.useState(false)
  const [verificationQuestionQuestion, setVerificationQuestionQuestion] = React.useState<SanityVerificationQuestion>({})
  const [coldLead, setColdLead] = React.useState<ColdLead>()
  const [nextQuestionDifficulty, setNextQuestionDifficulty] = React.useState<VerificationQuestionDifficultyEnum>()
  const [headerText, setHeaderText] = React.useState<any>()

  const location = useLocation()

  React.useEffect(() => {


    if (difficulty) {
      console.log('difficulty is', difficulty)
      const difficultyEnum: VerificationQuestionDifficultyEnum = parseInt(difficulty)

      let difficultyStr = 'Unknown'
      let translateDifficulty
      let translatedButtonText
      let translatedHeaderText
      switch (difficultyEnum) {
        case VerificationQuestionDifficultyEnum.EASY:
          difficultyStr = 'Easy'
          translateDifficulty = VerificationQuestionDifficultyEnum.MEDIUM
          translatedButtonText = 'Ok, next question...'
          translatedHeaderText = <EasyVerificationQuestionHeader/>
          break
        case VerificationQuestionDifficultyEnum.MEDIUM:
          difficultyStr = 'Medium'
          translateDifficulty = VerificationQuestionDifficultyEnum.HARD
          translatedButtonText = '...aight cool, one more question...'
          translatedHeaderText = <MediumVerificationQuestionHeader/>
          break
        case VerificationQuestionDifficultyEnum.HARD:
          difficultyStr = 'Hard'
          translateDifficulty = VerificationQuestionDifficultyEnum.IMAGE
          translatedButtonText = 'Submit Responses.'
          translatedHeaderText = <HardVerificationQuestionHeader/>
          break
        default:
          translateDifficulty = VerificationQuestionDifficultyEnum.EASY
          translatedButtonText = 'Ok, next question...'

      }
      console.log('translated difficulty is', difficulty, translateDifficulty)
      setButtonText(translatedButtonText)
      setNextQuestionDifficulty(translateDifficulty)
      setHeaderText(translatedHeaderText)

      if (location) {
        document.title = `BlckTwttr | Verification Question #BlackTwitterVerificationQuestions - ${difficultyStr}`
        firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, `${difficultyStr} Verification Question`)
      }
    }
  }, [difficulty])

  React.useEffect(() => {
    if (id) {
      cmsClient.fetchColdLead(id).then((retrievedLead: ColdLead) => {
        setColdLead(retrievedLead)
      })
    }
  }, [id])

  const [retries, setRetries] = React.useState<number>(0)

  const getRandomQuestion = async (categoryNumber?: any) => {
    return cmsClient.fetchRandomVerificationQuestion(parseInt(difficulty ?? ''), categoryNumber).then((question) => {
      if (question) {
        setRetries(state => state + 1)
        setVerificationQuestionQuestion(question)
        return
      } else {
        // none of this difficulty in this category select from all questions
        return cmsClient.fetchRandomVerificationQuestion(parseInt(difficulty ?? '')).then((questionAttempt2) => {
          if (questionAttempt2) {
            setRetries(state => state + 1)
            setVerificationQuestionQuestion(questionAttempt2)
          }
        })
      }
    })
  }

  React.useEffect(() => {
    // cmsClient.fetchRandomVerificationQuestion(parseInt(difficulty ?? '')).then((question) => {
    //   setVerificationQuestionQuestion(question)
    // })
    getRandomQuestion().then(() => {
    })
  }, [nextQuestionDifficulty])

  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [response, setResponse] = React.useState<string | undefined>()
  const updateLead = (): Promise<void> => {
    if (coldLead) {
      setFormSubmitting(true)

      const verifyResponse = (response?.trim() === verificationQuestionQuestion?.correctAnswer?.trim())
      console.log('Verifying the users response', verifyResponse, response, verificationQuestionQuestion?.correctAnswer)
      if (verifyResponse) {
        setIsVerified(true)
      }

      let keyValue
      switch (parseInt(difficulty ?? '')) {
        case VerificationQuestionDifficultyEnum.EASY:
          keyValue = 'easyAttempt'
          break
        case VerificationQuestionDifficultyEnum.HARD:
          keyValue = 'hardAttempt'
          break
        case VerificationQuestionDifficultyEnum.MEDIUM:
          keyValue = 'mediumAttempt'

          break
        default:
          keyValue = 'easyAttempt'
          break
      }

      const attempt = {
        [keyValue]: {
          isVerified: verifyResponse,
          response: response ?? 'noResponseRecorded',
          questionId: verificationQuestionQuestion?._id ?? ''
        }
      }

      const updateLeadRequest: UpdateLeadRequest = {
        _id: coldLead?._id,
        ...attempt
      }

      coldLead?._id && difficulty && attempt && firebaseAnalyticsClient.attemptSubmitted(coldLead._id, parseInt(difficulty), verificationQuestionQuestion.slug?.current ?? 'slugOmittedFromQuestion', attempt[keyValue])

      return leadClient.updateLead(updateLeadRequest).then((result: UpdateLeadRequest) => {
        setFormSubmitting(false)
        setResponse(undefined)
        if (nextQuestionDifficulty === VerificationQuestionDifficultyEnum.IMAGE) {
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

  const [imageHint, setImageHint] = React.useState<ImageHint>()

  React.useEffect(() => {
    if (imageVerificationQuestion?.imageHints) {
      const foundDifficultyImage = imageVerificationQuestion.imageHints.find((hint: ImageHint) => {
        return hint.hintDifficulty == parseInt(difficulty ?? '-1')
      })
      if (foundDifficultyImage) {
        setImageHint(foundDifficultyImage)
      }
    }
  }, [imageVerificationQuestion])

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
        {retries > 0 && <Typography>Retries: {retries}</Typography>}
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
        <Button
          color='primary'
          variant='contained'
          disabled={!response}
          aria-label={`next question`}
          classes={{disabled: classes.disabledButton}}
          className={classes.button}
          fullWidth
          onClick={updateLead}
        >
          {!formSubmitting &&
            <Typography style={{fontFamily: 'Youth'}} variant='button'
                        align='center'>{!response ? 'Answer the Question' : buttonText}</Typography>}
          {formSubmitting && <CircularProgress color='inherit' size='22px'/>}
        </Button>
        {verificationQuestionQuestion && verificationQuestionQuestion.category &&
          <VerificationQuestionCategorySelector currentCategory={verificationQuestionQuestion.category.category}
                                                handleSetCurrentCategory={handleSetCurrentCategory}/>}
      </Grid>

      {/*<Hidden mdDown>*/}
      {/*  <Grid item className={classes.geogrid}>*/}
      {/*    <CssGeogrid imageSrc={imageHint?.imageSrc}/>*/}
      {/*  </Grid>*/}
      {/*</Hidden>*/}
      {/*<Hidden lgUp>*/}
      {/*  <Grid container item direction='column' className={classes.footer} alignContent='flex-end'>*/}
      {/*    /!*<GeogridShapeContainer color='#FB7C6A' shape='triangleUpRight' pageIndicator/>*!/*/}
      {/*    /!*<GeogridShapeContainer color='#CEE4D1' shape='triangleUpRight' fade pageIndicator/>*!/*/}
      {/*    /!*<GeogridShapeContainer color='#FDF3EB' shape='triangleUpRight' pageIndicator/>*!/*/}
      {/*  </Grid>*/}
      {/*</Hidden>*/}
    </VerificationPageLayout>
  )
}


export default VerificationQuestionPage

