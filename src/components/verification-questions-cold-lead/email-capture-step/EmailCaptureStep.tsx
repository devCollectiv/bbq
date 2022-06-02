import { Button, CircularProgress, Grid, Hidden, MuiThemeProvider, TextField, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import leadClient, { UpdateLeadRequest } from '../leadClient'
import { useHistory, useLocation } from 'react-router-dom'
import { StepProps } from '../PreSignup'
import CssGeogrid from '../css-geogrid/CssGeogrid'
import { motion } from 'framer-motion'
import emailValidator from '../../../utils/emailValidator'
import { RoutesEnum } from '../../../App'
import blckTwttrTheme from '../../abReplica/common/Theme'
import { VerificationQuestionDifficultyEnum } from '../../../common/sanityIo/Types'
import firebaseAnalyticsClient from '../../abReplica/firebaseAnalyticsClient'
import VerificationPageLayout from '../verification-results/VerificationPageLayout'

export const useStepStyles = makeStyles((theme: Theme) => ({
  attemptLabel: {
    marginTop: theme.spacing(.5)
  },
  root: {
    // [theme.breakpoints.up('lg')]: {
    //   paddingTop: theme.spacing(16)
    // }
  },
  button: {
    // height: '40px',
    borderRadius: '10px',
    // width: '520px',
    padding: theme.spacing(1,5),
    boxShadow: '8px 8px #3B3B3B',
    [theme.breakpoints.down('xs')]: {
      boxShadow: '4px 4px #3B3B3B'
    }
  },
  formControl: {
    // margin: theme.spacing(1),
    // width: '377px'
  },
  emailTextField: {
    // [theme.breakpoints.up('sm')]: {
    //   width: '377px'
    // }
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
  emailContainer: {},
  responsiveTitle: {
    // borderLeft: '8px solid transparent',
    // [theme.breakpoints.up('sm')]: theme.typography.h3
  },
  responsiveTitleBrand: {
    position: 'relative'
  },
  geogrid: {
    // marginLeft: theme.spacing(5)
  },
  step2Accent: {
    display: 'inline-flex',
    // background: '#CEE4D1',
    // borderRadius: '51.07px',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      top: '5px',
      left: '-4px',
      width: '122px',
      height: '22.3px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '6px',
      left: '-8px',
      width: '164px',
      height: '31.3px'
    }
  },
  step2AccentTypography: {
    // top: 0,
    // left: 0,
    // textTransform: 'uppercase'
  },
  formFieldsContainer: {},
  disabledButton: {
    marginTop: theme.spacing(1)
  }
}))

const EmailCaptureStep: FunctionComponent<StepProps> = ({lead, setLead}: StepProps) => {
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

      history.push(RoutesEnum.ENTRY_QUESTIONS + '/' + VerificationQuestionDifficultyEnum.EASY + '/' + createdLead._id)
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
              className={classes.responsiveTitle}>
              BlckTwttr
            </Typography>
          </Grid>
          <Grid container justifyContent='center' item className={classes.emailContainer}
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
          <Button
            disabled={isButtonDisabled}
            color='primary'
            variant='contained'
            // disabled={!isFormValid() || formSubmitting}
            aria-label='next to black verification questions'
            classes={{disabled: classes.disabledButton}}
            className={classes.button}
            onClick={createLead}
            fullWidth
          >
            {!formSubmitting &&
              <Typography style={{fontFamily: 'Youth'}} variant='button'
                          align='center'>{isButtonDisabled ? 'Please enter your email address...' : 'Submit'}</Typography>}
            {
              formSubmitting && <><CircularProgress color='inherit' size='22px'/>
                <Typography
                  variant='button'
                  align='center'
                  style={{marginLeft: blckTwttrTheme.spacing(2), fontFamily: 'Youth'}}>
                  Now
                  for Verification...
                </Typography></>
            }
          </Button>
        </Grid>
      </Grid>
      {/*</Grid>*/}
      {/*<Hidden mdDown>*/}
      {/*  <Grid item className={classes.geogrid}>*/}
      {/*    /!*  This should be an image placeholder*!/*/}
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


export default EmailCaptureStep

