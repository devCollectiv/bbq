import { Button, CircularProgress, Grid, Hidden, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import leadClient, { UpdateLeadRequest } from '../leadClient'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { ColdLead, StepProps } from '../PreSignup'
import CssGeogrid from '../css-geogrid/CssGeogrid'
import blckTwttrTheme from '../../abReplica/common/Theme'
import { useStepStyles } from '../email-capture-step/Step1'
import { ImageHint, VerificationQuestionDifficultyEnum } from '../../../common/sanityIo/Types'
import cmsClient from '../../abReplica/cmsClient'
import firebaseAnalyticsClient from '../../abReplica/firebaseAnalyticsClient'
import { RoutesEnum } from '../../../App'
import VerificationQuestion from '../verification-question/VerificationQuestion'
import VerificationPageLayout from '../verification-results/VerificationPageLayout'
import VerificationQuestionImage from '../verification-question/VerificationQuestionImage'
import { urlFor } from '../../abReplica/static-pages/cmsStaticPagesClient'

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

const ImageVerificationQuestion: FunctionComponent<StepProps> = ({
                                                                   lead,
                                                                   setLead,
                                                                   imageVerificationQuestion
                                                                 }: StepProps) => {
  const classes = useStepStyles(blckTwttrTheme)

  const history = useHistory()

  const [validBrandName, setValidBrandName] = React.useState(true)
  const [validWebsite, setValidWebsite] = React.useState(true)
  const [formSubmitting, setFormSubmitting] = React.useState(false)
  const [validEmail, setValidEmail] = React.useState<boolean>(true)

  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [response, setResponse] = React.useState<string>('')

  const updateLead = (): Promise<void> => {
    setFormSubmitting(true)

    console.log("Verifying response in image question",response === imageVerificationQuestion?.correctAnswer,response,imageVerificationQuestion?.correctAnswer)
    let verifyResponse = response === imageVerificationQuestion?.correctAnswer
    if (verifyResponse) {
      setIsVerified(true)
    }

    const imageAttempt = {
      _id: coldLead?._id,
      imageAttempt: {
        isVerified: verifyResponse,
        response: response,
        questionId: imageVerificationQuestion?._id ?? ''
      }
    }

    const updateLeadRequest: UpdateLeadRequest = {
      ...imageAttempt
    }

    coldLead?._id && imageAttempt && firebaseAnalyticsClient.attemptSubmitted(coldLead._id, VerificationQuestionDifficultyEnum.IMAGE, imageVerificationQuestion?.slug?.current ?? "noSlugForThisImage", imageAttempt?.imageAttempt)
    return leadClient.updateLead(updateLeadRequest).then(() => {
      history.push(RoutesEnum.ENTRY_QUESTIONS+"/results/"+coldLead?._id)
    }).catch(() => {
      setFormSubmitting(false)
    })
  }
  const location = useLocation()
  const [imageHint, setImageHint] = React.useState<ImageHint>()
  React.useEffect(() => {
    console.log('hints', imageVerificationQuestion?.imageHints)
    if (imageVerificationQuestion?.imageHints) {
      const foundDifficultyImage = imageVerificationQuestion.imageHints.find((hint) => {
        console.log(hint.hintDifficulty == VerificationQuestionDifficultyEnum.IMAGE, hint.hintDifficulty, VerificationQuestionDifficultyEnum.IMAGE)
        return hint.hintDifficulty == VerificationQuestionDifficultyEnum.IMAGE
      })
      if (foundDifficultyImage) {
        console.log('found image for this screen', foundDifficultyImage)

        setImageHint(foundDifficultyImage)
      }
    }
    if (coldLead?._id && imageVerificationQuestion) {
      firebaseAnalyticsClient.attemptStarted(coldLead._id, imageVerificationQuestion)
    }
  }, [imageVerificationQuestion])

  React.useEffect(()=>{
      if (location) {
        document.title = `BlckTwttr | Verification Question #BlackTwitterVerificationQuestions - Image`
        firebaseAnalyticsClient.analyticsPageView(location.pathname, location.search, `Image Verification Question`)
      }
  },[])


  const {id}: { id: string } = useParams()
  const [coldLead, setColdLead] = React.useState<ColdLead>()

  React.useEffect(() => {
    if (id) {
      cmsClient.fetchColdLead(id).then((retrievedLead) => {
        setColdLead(retrievedLead)
      })

    }
  }, [])

  return (
    <VerificationPageLayout>
        <Grid container direction='column' alignItems='center'>

        </Grid>
        <Grid container justifyContent='center' alignItems='center' alignContent='center' item direction='column'>
          <Grid item>
            <VerificationQuestionImage imageSrc={imageHint && imageHint.imageSrc} />
          </Grid>
          <Grid  container justifyContent='center' item>

          <VerificationQuestion verificationQuestion={imageVerificationQuestion ?? {}}
                                handleSetSelectedResponse={(passedResponse:string) => setResponse(passedResponse)}/>
          </Grid>

        </Grid>
        <Grid container item justifyContent='center'>
          <Button
            variant='contained'
            disabled={!response}
            color='primary'
            aria-label='next to step 3'
            classes={{disabled: classes.disabledButton}}
            className={classes.button}
            onClick={updateLead}
          >
            {!formSubmitting &&
              <Typography variant='button' align='center' style={{fontFamily:"Youth"}}>Go to your Results!</Typography>}
            {formSubmitting && <CircularProgress color='inherit' size='22px'/>}
          </Button>
        </Grid>
      {/*<Hidden mdDown>*/}
      {/*  <Grid item className={classes.geogrid}>*/}
      {/*    <CssGeogrid imageSrc={imageVerificationQuestion?.imageHints?.find((imageHint: ImageHint) => {*/}
      {/*      if (imageHint.hintDifficulty === VerificationQuestionDifficultyEnum.IMAGE) {*/}
      {/*        return imageHint*/}
      {/*      }*/}
      {/*    })?.imageSrc}/>*/}
      {/*  </Grid>*/}
      {/*</Hidden>*/}
      {/*<Hidden lgUp>*/}
      {/*  <Grid container item direction='column' className={classes.footer} alignContent='flex-end'>*/}
      {/*    /!*<GeogridShapeContainer color="#FB7C6A" shape='triangleUpRight' pageIndicator/>*!/*/}
      {/*    /!*<GeogridShapeContainer color="#CEE4D1" shape='triangleUpRight' pageIndicator/>*!/*/}
      {/*    /!*<GeogridShapeContainer color="#565190" shape='triangleUpRight' pageIndicator/>*!/*/}
      {/*  </Grid>*/}
      {/*</Hidden>*/}

    </VerificationPageLayout>
  )
}


export default ImageVerificationQuestion

