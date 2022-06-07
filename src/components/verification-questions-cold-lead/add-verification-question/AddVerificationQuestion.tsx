import { Button, CircularProgress, Grid, TextField } from '@material-ui/core'
import React, { ChangeEvent, FunctionComponent, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useStepStyles } from '../email-capture-step/EmailCaptureStep'
import {
  AddVerificationQuestionState,
  ColdLead,
  SanityReportCard,
  SanityVerificationQuestion,
  VerificationStepProps
} from '../../../utils/Types'
import blckTwttrTheme from '../../theme/Theme'
import firebaseAnalyticsClient from '../../shared/firebase/firebaseAnalyticsClient'
import cmsClient from '../../shared/cms/cmsClient'
import VerificationQuestionImage from '../verification-question/components/VerificationQuestionImage'
import AddVerificationQuestionHeader from './AddVerificationQuestionHeader'
import VerificationPageLayout from '../verification-results/VerificationPageLayout'
import VerificationQuestionImageInput from '../verification-question-image/VerificationQuestionImageInput'
import cmsService from '../../shared/cms/cmsService'
import { RoutesEnum } from '../../../App'
import AnimationContext from '../../../animations/animation-context/AnimationContext'


const AddVerificationQuestion: FunctionComponent<VerificationStepProps> = ({}: VerificationStepProps) => {
  const location = useLocation()

  const [fileUploadStatus, setFileUploadStatus] = React.useState<any>()
  const [imageDataUrl, setImageDataUrl] = React.useState<string>()

  React.useEffect(() => {
    if (location) {
      document.title = `BlckTwttr | Add Verification Question #BlackTwitterVerificationQuestions - Add Question`
      firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, `Add Verification Question`)
    }
  }, [])


  const {id}: { id: string } = useParams()
  const [coldLead, setColdLead] = React.useState<ColdLead>()

  const animationContext = useContext(AnimationContext)
  React.useEffect(() => {
    if (id) {
      cmsClient.fetchColdLead(id).then((retrievedLead) => {
        setColdLead(retrievedLead)
      })
    }

    console.log("about to open lock screen")
        // animationContext && animationContext.openLockScreen && animationContext.openLockScreen()
  }, [])

  const history = useHistory()
  const [potentialVerificationQuestion, setPotentialVerificationQuestion] = React.useState<AddVerificationQuestionState>({})
  const [formSubmitting, setFormSubmitting] = React.useState<boolean>()

  const submitQuestion = async () => {
    setFormSubmitting(true)
    coldLead?._id && potentialVerificationQuestion.question && potentialVerificationQuestion.correctAnswer && firebaseAnalyticsClient.veriQQuestionSubmitted(coldLead._id, potentialVerificationQuestion.question, potentialVerificationQuestion.correctAnswer)

    let newQuestion
    if (coldLead) {
      newQuestion = await cmsService.saveVerificationQuestion({
        ...potentialVerificationQuestion,
        coldLeadId: coldLead._id
      }, fileUploadStatus?.fileUploaded)
    }

    coldLead?._id
    && potentialVerificationQuestion.question
    && newQuestion?._id
    && newQuestion.slug
    && firebaseAnalyticsClient.veriQQuestionSubmittedSuccess(coldLead._id, newQuestion._id, newQuestion.slug.current)

    setFormSubmitting(false)

    history.push(RoutesEnum.ADD_ENTRY_QUESTION_RESULT + '/' + newQuestion?._id)
  }

  const handleChangeValue = (event: any) => {

    const name = event.target.name
    const value = event.target.value

    const formUpdate: AddVerificationQuestionState = {
      [name]: value
    }

    setPotentialVerificationQuestion((state) => ({
      ...state,
      ...formUpdate
    }))
  }

  const handleSetImage = ({imageDataUrl, fileUploadState}: any) => {
    setImageDataUrl(imageDataUrl)
    setFileUploadStatus(fileUploadState)
  }

  const formFieldColor = 'secondary'
  const formFieldVariant = 'outlined'


  return (
    <VerificationPageLayout>
      <Grid container direction='column' alignItems='center'>
        <Grid container justifyContent='center' item>
          <AddVerificationQuestionHeader/>
        </Grid>
      </Grid>
      <Grid container justifyContent='center' item>
        <Grid container item direction='column' spacing={5} alignItems='center'>
          <Grid container item direction='column' spacing={3} xs={10}>
            <Grid item container justifyContent='center'>
              <VerificationQuestionImageInput coldLeadId={coldLead?._id} handleSetImage={handleSetImage}/>
            </Grid>
            <Grid container item>
              <TextField
                onBlur={(e) => {
                  coldLead?._id && potentialVerificationQuestion.question && firebaseAnalyticsClient.veriQQuestionEntered(coldLead._id, potentialVerificationQuestion.question)
                }}
                label='Question'
                color={formFieldColor}
                variant={formFieldVariant}
                fullWidth
                name='question'
                value={potentialVerificationQuestion.question ?? ''}
                onChange={handleChangeValue}
              />

            </Grid>
            <Grid item>

              <TextField
                onBlur={(e) => {
                  coldLead?._id && potentialVerificationQuestion.correctAnswer && firebaseAnalyticsClient.veriQQuestionCorrectAnswerEntered(coldLead._id, potentialVerificationQuestion.correctAnswer)
                }}
                label='Correct Answer'
                color={formFieldColor}
                variant={formFieldVariant}
                value={potentialVerificationQuestion.correctAnswer ?? ''}
                name='correctAnswer'
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item>
              <TextField
                onBlur={(e) => {
                  coldLead?._id && potentialVerificationQuestion.incorrect1 && firebaseAnalyticsClient.veriQQuestionInCorrectAnswerEntered(coldLead._id, potentialVerificationQuestion.incorrect1)
                }}
                label='Incorrect Answer 1'
                color={formFieldColor}
                variant={formFieldVariant}
                value={potentialVerificationQuestion.incorrect1 ?? ''}
                name='incorrect1'
                onChange={handleChangeValue}
              />

            </Grid>
            <Grid item>
              <TextField
                onBlur={(e) => {
                  coldLead?._id && potentialVerificationQuestion.incorrect2 && firebaseAnalyticsClient.veriQQuestionInCorrectAnswerEntered(coldLead._id, potentialVerificationQuestion.incorrect2)
                }}
                label='Incorrect Answer 2'
                color={formFieldColor}
                variant={formFieldVariant}
                value={potentialVerificationQuestion.incorrect2 ?? ''}
                name='incorrect2'
                onChange={handleChangeValue}
              />

            </Grid>
            <Grid item>
              <TextField
                onBlur={(e) => {
                  coldLead?._id && potentialVerificationQuestion.incorrect3 && firebaseAnalyticsClient.veriQQuestionInCorrectAnswerEntered(coldLead._id, potentialVerificationQuestion.incorrect3)
                }}
                label='Incorrect Answer 3'
                color={formFieldColor}
                variant={formFieldVariant}
                value={potentialVerificationQuestion.incorrect3 ?? ''}
                name='incorrect3'
                onChange={handleChangeValue}
              />
            </Grid>

            <Grid item>
              <TextField
                onBlur={(e) => {
                  coldLead?._id && potentialVerificationQuestion.proposedCategory && firebaseAnalyticsClient.veriQQuestionInCorrectAnswerEntered(coldLead._id, potentialVerificationQuestion.proposedCategory)
                }}
                label='Category'
                color={formFieldColor}
                variant={formFieldVariant}
                value={potentialVerificationQuestion.proposedCategory ?? ''}
                name='proposedCategory'
                onChange={handleChangeValue}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent='center'>
        <Grid container item xs={7} justifyContent='center'>
          <Button
            fullWidth
            disabled={
              formSubmitting
              || (potentialVerificationQuestion?.question?.length ?? 0) === 0
              || (potentialVerificationQuestion?.correctAnswer?.length ?? 0) === 0
            }
            variant='contained'
            color='secondary' style={{fontFamily: 'Youth', height: '48px'}}
            onClick={submitQuestion}
          >{formSubmitting ? <CircularProgress size={22} color='inherit'/> : 'Submit Question.'}
          </Button>
        </Grid>
      </Grid>
    </VerificationPageLayout>
  )
}


export default AddVerificationQuestion

