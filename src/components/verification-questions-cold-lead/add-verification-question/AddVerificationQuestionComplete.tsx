import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core'
import React, { ChangeEvent, FunctionComponent } from 'react'
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
import VerificationQuestionPageContent from '../verification-question/components/VerificationQuestionPageContent'
import AddVerificationQuestionCompleteHeader from './AddVerificationQuestionCompleteHeader'
import { PanTool } from '@material-ui/icons'
import AddVerificationQuestionCompleteFarewell
  from '../verification-question/components/AddVerificationQuestionCompleteFarewell'


const AddVerificationQuestionComplete: FunctionComponent<VerificationStepProps> = ({}: VerificationStepProps) => {
  const location = useLocation()

  React.useEffect(() => {
    if (location) {
      document.title = `BlckTwttr | Add Verification Question Success #BlackTwitterVerificationQuestions`
      firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, `Success Add Verification Question`)
    }
  }, [])

  const {questionId}: { questionId: string } = useParams()

  const [potentialVerificationQuestion, setPotentialVerificationQuestion] = React.useState<AddVerificationQuestionState>({})
  React.useEffect(() => {
    if (questionId) {
      cmsClient.fetchVerificationQuestion(questionId).then((retrievedQuestion: SanityVerificationQuestion) => {
        setPotentialVerificationQuestion(retrievedQuestion)
      })
    }
  }, [])


  return (
    <VerificationPageLayout>
      <Grid container direction='column' alignItems='center'>
        <Grid container justifyContent='center' item>
          <AddVerificationQuestionCompleteHeader/>
        </Grid>
      </Grid>
      <Grid container justifyContent='center' item>
        <VerificationQuestionPageContent verificationQuestion={potentialVerificationQuestion}/>
      </Grid>
      <Grid item container justifyContent='center'>
        <AddVerificationQuestionCompleteFarewell/>
      </Grid>
    </VerificationPageLayout>
  )
}


export default AddVerificationQuestionComplete

