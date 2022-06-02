import { Button, Card, Grid, Hidden, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { ColdLead, StepProps } from '../PreSignup'
import blckTwttrTheme from '../../abReplica/common/Theme'
import { useStepStyles } from '../email-capture-step/Step1'
import { SanityReportCard } from '../../../common/sanityIo/Types'
import cmsClient from '../../abReplica/cmsClient'
import firebaseAnalyticsClient from '../../abReplica/firebaseAnalyticsClient'
import { RoutesEnum } from '../../../App'
import { CheckCircle, Close } from '@material-ui/icons'
import VerificationResultsFailHeader from './results/VerificationResultsFailHeader'
import VerificationResultsSuccessHeader from './results/VerificationResultsSuccessHeader'
import VerificationResultsSuccessFooter from './results/VerificationResultsSuccessFooter'
import VerificationResultsFailFooter from './results/VerificationResultsFailFooter'
import { motion } from 'framer-motion'
import VerificationPageLayout from './VerificationPageLayout'
import blackFireworks from '../../abReplica/common/assets/black-fireworks.png'

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
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
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
      top: '6px',
      left: '-8px',
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

const VerificationResults: FunctionComponent<StepProps> = ({
                                                             lead,
                                                             setLead,
                                                             imageVerificationQuestion
                                                           }: StepProps) => {
  const classes = useStepStyles(blckTwttrTheme)

  const history = useHistory()

  const location = useLocation()

  React.useEffect(() => {
    if (location) {
      document.title = `BlckTwttr | Verification Results #BlackTwitterVerificationQuestions - Results`
      firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, `Verification Results`)
    }
  }, [])


  const {id}: { id: string } = useParams()
  const [coldLead, setColdLead] = React.useState<ColdLead>()

  React.useEffect(() => {
    if (id) {
      cmsClient.fetchColdLead(id).then((retrievedLead) => {
        setColdLead(retrievedLead)
      })

    }
  }, [])

  const [leadBlackCard, setLeadBlackCard] = React.useState<SanityReportCard>()
  React.useEffect(() => {
    // Calculate Report Card

    if (coldLead) {
      const easyAttemptGrade = !!coldLead.easyAttempt?.isVerified
      const mediumAttemptGrade = !!coldLead.mediumAttempt?.isVerified
      const hardAttemptGrade = !!coldLead.hardAttempt?.isVerified
      // const imageAttemptGrade = !!coldLead.imageAttempt?.isVerified
      const reportCard: SanityReportCard = {
        easyAttemptResult: easyAttemptGrade,
        hardAttemptResult: hardAttemptGrade,
        mediumAttemptResult: mediumAttemptGrade,
        // imageAttemptResult: imageAttemptGrade,
        isVerified: easyAttemptGrade && mediumAttemptGrade && hardAttemptGrade
      }

      setLeadBlackCard(reportCard)
    }
  }, [coldLead])

  React.useEffect(() => {
    coldLead?._id &&
    leadBlackCard &&
    firebaseAnalyticsClient.reportCardViewed(coldLead?._id, leadBlackCard)

    coldLead?._id && (leadBlackCard?.isVerified ? firebaseAnalyticsClient.reportCardSuccess(coldLead?._id) : firebaseAnalyticsClient.reportCardFail(coldLead?._id))
  }, [leadBlackCard])

  const questionResultBlackCard = () => {
    return <Grid container item xs={5} justifyContent='center' style={{marginBottom: '32px', position: 'relative'}}>
      {leadBlackCard?.isVerified && <Grid item style={{
        position: 'absolute',
        zIndex: 9999
      }}>
        <motion.div
          initial={{
            opacity: 1, scale: .5, position: 'absolute', top: '-423px',
            left: '-463px'
          }}
          animate={{opacity: 0, scale: 1.5}}
          transition={{duration: 2}}
        >
          <img src={blackFireworks}/>
        </motion.div>
        <motion.div
          initial={{
            opacity: 1, scale: 0, position: 'absolute', top: '-200px',
            left: '-763px'
          }}
          animate={{opacity: 0, scale: .5}}
          transition={{duration: 1.25}}
        >
          <img src={blackFireworks}/>
        </motion.div>
        <motion.div
          initial={{
            opacity: 1, scale: 0, position: 'absolute', top: '-550px',
            left: '-763px'
          }}
          animate={{opacity: 0, scale: 1.05}}
          transition={{duration: 1.5}}
        >
          <img src={blackFireworks}/>
        </motion.div>
      </Grid>}
      <Card style={{
        position: 'relative',
        backgroundColor: '#3b3b3b',
        borderRadius: '14px',
        padding: blckTwttrTheme.spacing(7, 6),
        minWidth: '382px'
      }}>
        <motion.div
          initial={{opacity:0, scale: 2.5}}
          animate={{opacity:1, scale: 1}}
          transition={{duration: .75}}
        >
          <Grid container item justifyContent='center'>
            <Grid container item xs={10} justifyContent='center' spacing={3}>
              <Grid container justifyContent='center' item style={{marginBottom: blckTwttrTheme.spacing(2)}}>
                <Typography align='center' variant='h4' color='primary' style={{fontFamily: 'Youth'}}
                            gutterBottom>Black
                  Card</Typography>
              </Grid>
              <Grid container xs={8} item justifyContent='space-between'>
                <Grid item>
                  <Typography style={{color: 'whitesmoke', fontFamily: 'Youth'}} variant='h6'
                              className={classes.attemptLabel}>
                    Easy
                  </Typography>

                </Grid>
                <Grid item>
                  <Typography variant='h4'>
                    {
                      leadBlackCard?.easyAttemptResult ?
                        <CheckCircle fontSize='inherit' style={{color: blckTwttrTheme.palette.success.main}}/> :
                        <Close fontSize='inherit' style={{color: blckTwttrTheme.palette.error.main}}/>
                    }
                  </Typography>

                </Grid>
              </Grid>
              <Grid xs={8} container item justifyContent='space-between'>
                <Typography style={{color: 'whitesmoke', fontFamily: 'Youth'}} variant='h6'
                            className={classes.attemptLabel}>
                  Medium
                </Typography>
                <Typography variant='h4'>
                  {
                    leadBlackCard?.mediumAttemptResult ?
                      <CheckCircle fontSize='inherit' style={{color: blckTwttrTheme.palette.success.main}}/> :
                      <Close fontSize='inherit' style={{color: blckTwttrTheme.palette.error.main}}/>
                  }
                </Typography>
              </Grid>
              <Grid xs={8} container item justifyContent='space-between'>
                <Typography style={{color: 'whitesmoke', fontFamily: 'Youth'}} variant='h6'
                            className={classes.attemptLabel}>
                  Hard
                </Typography>
                <Typography variant='h4'>
                  {
                    leadBlackCard?.hardAttemptResult ?
                      <CheckCircle fontSize='inherit' style={{color: blckTwttrTheme.palette.success.main}}/> :
                      <Close fontSize='inherit' style={{color: blckTwttrTheme.palette.error.main}}/>
                  }
                </Typography>
              </Grid>
              {/*<Grid  xs={8} container item justifyContent='space-between'>*/}
              {/*  <Typography variant='h6' className={classes.attemptLabel}*/}
              {/*              style={{color: 'whitesmoke', fontFamily: 'Youth'}}>*/}
              {/*    Image*/}
              {/*  </Typography>*/}
              {/*  <Typography variant='h4'>*/}
              {/*    {*/}
              {/*      leadBlackCard?.imageAttemptResult ?*/}
              {/*        <CheckCircle fontSize='inherit' style={{color: blckTwttrTheme.palette.success.main}}/> :*/}
              {/*        <Close fontSize='inherit' style={{color: blckTwttrTheme.palette.error.main}}/>*/}
              {/*    }*/}
              {/*  </Typography>*/}
              {/*</Grid>*/}
            </Grid>
            <Grid container item direction='column' alignItems='center' style={{
              backgroundColor: 'whitesmoke',
              padding: blckTwttrTheme.spacing(2, 5),
              borderRadius: '16px',
              marginTop: '16px'
            }}>
              <Typography variant='h6' className={classes.attemptLabel} style={{fontFamily: 'Youth'}}>
                Access:
              </Typography>
              {
                leadBlackCard?.isVerified ?
                  <Typography variant='h4' style={{
                    color: blckTwttrTheme.palette.success.main,
                    fontFamily: 'Youth'
                  }}>Granted</Typography> :
                  <Typography variant='h4' style={{
                    color: blckTwttrTheme.palette.error.main,
                    fontFamily: 'Youth'
                  }}>Revoked</Typography>
              }
            </Grid>
          </Grid>
        </motion.div>
      </Card>
    </Grid>
  }

  return (
    <VerificationPageLayout>
      <Grid container direction='column' alignItems='center'>
        <Grid container justifyContent='center' item>
          {leadBlackCard?.isVerified ? <VerificationResultsSuccessHeader/> : <VerificationResultsFailHeader/>}
        </Grid>
      </Grid>
      <Grid container justifyContent='center' item>
        {questionResultBlackCard()}
        <Grid container item direction='column' alignItems='center'>
          <Grid container justifyContent='center' item>
            {leadBlackCard?.isVerified ? <VerificationResultsSuccessFooter/> : <VerificationResultsFailFooter/>}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          aria-label='submit a question'
          color='secondary'
          className={classes.button}
          onClick={() => history.push(RoutesEnum.SUBMIT_QUESTION)}
        >
          <Typography variant='button' align='center' style={{fontFamily: 'Youth', textTransform: 'capitalize'}}>Add a
            #BlackTwitterVerificationQuestion</Typography>
        </Button>
      </Grid>
    </VerificationPageLayout>
  )
}


export default VerificationResults

