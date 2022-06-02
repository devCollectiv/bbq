import './App.css'
import theme from './common/Theme'
import { CssBaseline, Grid, MuiThemeProvider } from '@material-ui/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'
import { ColdLead, useStyles } from './components/verification-questions-cold-lead/PreSignup'
import cmsClient from './components/abReplica/cmsClient'
import { SanityImageVerificationQuestion } from './common/sanityIo/Types'
import blckTwttrTheme from './components/abReplica/common/Theme'
import VerificationQuestionPage
  from './components/verification-questions-cold-lead/verification-question/VerificationQuestionPage'
import VerificationResults from './components/verification-questions-cold-lead/verification-results/VerificationResults'
import EmailCaptureStep from './components/verification-questions-cold-lead/email-capture-step/EmailCaptureStep'

export enum RoutesEnum {
  ENTRY_QUESTIONS = '/verification-questions',
  ENTRY_QUESTIONS_RESULTS = '/verification-questions/results',
  SUBMIT_QUESTION = '/verification-questions/submit-a-question'
}

function App() {
  const [imageVerificationQuestion,setImageVerificationQuestion] = React.useState<SanityImageVerificationQuestion>()
  React.useEffect(() => {
    cmsClient.fetchRandomImageVerificationQuestion().then((imageVerificationQuestion) => {
      setImageVerificationQuestion(imageVerificationQuestion)
    })
  }, [])

  const classes = useStyles(theme)

  const [coldLead, setColdLead] = React.useState<ColdLead>({
    email: ''
  })

  return (
    <MuiThemeProvider theme={blckTwttrTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Grid container item direction='column' alignItems='center' style={{height:"100vh", width:"100vw"}}>
        <Grid container item>
          <Switch>
            <Route exact path={RoutesEnum.ENTRY_QUESTIONS}
                   render={() => <EmailCaptureStep lead={coldLead} setLead={setColdLead}/>}/>
            {/*<Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/easy/:id'}*/}
            {/*       render={() => <EasyVerificationQuestion lead={coldLead} setLead={setColdLead}/>}/>*/}
            {/*<Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/medium/:id'}*/}
            {/*       render={() => <MediumVerficationQuestion lead={coldLead} setLead={setColdLead}/>}/>*/}
            {/*<Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/hard/:id'}*/}
            {/*       render={() => <HardVerificationQuestion lead={coldLead} setLead={setColdLead}/>}/>*/}
            <Route exact path={RoutesEnum.ENTRY_QUESTIONS_RESULTS +'/:id'}
                   render={() => <VerificationResults lead={coldLead} setLead={setColdLead}/>}/>
            {/*<Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/'+VerificationQuestionDifficultyEnum.IMAGE+'/:id'}*/}
            {/*       render={() => <ImageVerificationQuestion imageVerificationQuestion={imageVerificationQuestion} lead={coldLead} setLead={setColdLead}/>}/>*/}
            <Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/:difficulty/:id'}
                   render={() => <VerificationQuestionPage imageVerificationQuestion={imageVerificationQuestion} lead={coldLead} setLead={setColdLead} />}/>

            <Redirect to={RoutesEnum.ENTRY_QUESTIONS}/>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
