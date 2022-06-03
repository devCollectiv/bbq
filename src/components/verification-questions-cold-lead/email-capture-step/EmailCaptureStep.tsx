import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import leadClient, { UpdateLeadRequest } from '../leadClient'
import { useHistory, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import emailValidator from '../../../utils/emailValidator'
import { RoutesEnum } from '../../../App'
import VerificationPageLayout from '../verification-results/VerificationPageLayout'
import { VerificationQuestionStepEnum, VerificationStepProps } from '../../../utils/Types'
import blckTwttrTheme from '../../theme/Theme'
import firebaseAnalyticsClient from '../../shared/firebase/firebaseAnalyticsClient'
import VerificationQuestionCtaButton from '../VerificationQuestionCtaButton'

export const useStepStyles = makeStyles((theme: Theme) => ({
  attemptLabel: {
    marginTop: theme.spacing(.5)
  },
  button: {
    borderRadius: '10px',
    padding: theme.spacing(1,5),
    boxShadow: '8px 8px #b2b2b2',
    [theme.breakpoints.down('xs')]: {
      boxShadow: '4px 4px #b2b2b2',
    }
  },
  disabledButton: {
    marginTop: theme.spacing(1)
  }
}))

const EmailCaptureStep: FunctionComponent<VerificationStepProps> = ({lead, setLead}: VerificationStepProps) => {
  const classes = useStepStyles(blckTwttrTheme)
  const history = useHistory()

  const [formSubmitting, setFormSubmitting] = React.useState(false)
  const [validEmail, setValidEmail] = React.useState<boolean>(true)

  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true)

  const onEmailChange = (newEmail: string): void => {
    setLead((state: UpdateLeadRequest) => ({...state, email: newEmail}))
    emailValidator.isValidEmail(newEmail)
  }

  React.useEffect(() => {
    if (emailValidator.isValidEmail(lead.email)) {
      firebaseAnalyticsClient.emailTypedEvent(lead.email)
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [lead])

  const createLead = (): Promise<void> => {
    setFormSubmitting(true)
    // const updateLeadRequest: UpdateLeadRequest = {
    //   email: lead.email,
    //   brandName: lead.brandName,
    //   website: lead.website,
    //   desiredLoanAmount: lead.desiredLoanAmount
    // }

    return leadClient.createLead(lead.email).then((createdLead) => {
      firebaseAnalyticsClient.emailSubmittedEvent(lead.email, createdLead._id)

      history.push(RoutesEnum.ENTRY_QUESTIONS + '/' + VerificationQuestionStepEnum.EASY + '/' + createdLead._id)
    }).catch(() => {
      setFormSubmitting(false)
    })
  }

  const location = useLocation()

  React.useEffect(() => {
    if (location) {
      document.title = `BlckTwttr | Verification Questions #BlackTwitterVerificationQuestions - Step 1`
      firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, 'Email Submission')
    }
  }, [])

  return (
    <VerificationPageLayout>
      {/*<Grid container direction='column' alignContent='center'>*/}
      <Grid container item>
      </Grid>
      <Grid container item direction='column' style={{marginTop: blckTwttrTheme.spacing(3)}}>
        <Grid item container spacing={5}>
          <Grid item container direction='column' alignItems='center' >
            <motion.div
              initial={{scale: 2}}
              animate={{scale: 1}}
              transition={{duration: 0.5}}
            >
              <Grid container item>
                <Typography
                  component='span'
                  variant='h3'
                  color='primary'
                  display='inline'
                  align='center' >
                  Sign Up
                </Typography>
              </Grid>
            </motion.div>
            <Typography
              variant='h3'
              color='textSecondary'
              align='center'>
              to hear about
            </Typography>
            <Typography
              gutterBottom
              color='secondary'
              variant='h3'
              align='center'
              >
              BlckTwttr
            </Typography>
          </Grid>
          <Grid container justifyContent='center' item
                style={{minHeight: '216px', padding: blckTwttrTheme.spacing(0, 12)}}>
            <TextField
              color='secondary'
              fullWidth={true}
              error={!validEmail}
              helperText={validEmail ? '' : 'Invalid email, please provide a valid address.'}
              label='Your Email'
              id='email'
              name='email address'
              type='email'
              value={lead.email}
              onChange={(e): void => onEmailChange(e.target.value)}
              onBlur={(e): void => {
                emailValidator.isValidEmail(e.target.value)
              }}
            />
          </Grid>
        </Grid>
        <Grid container item justifyContent='center'>
          <VerificationQuestionCtaButton onClicked={createLead} isLoading={formSubmitting} disabledButtonText={'Please enter your email above.'} buttonText='Thank you! Submit.' isDisabled={isButtonDisabled} />
        </Grid>
      </Grid>
    </VerificationPageLayout>
  )
}


export default EmailCaptureStep

