import './App.css'
import { CssBaseline, Grid, MuiThemeProvider } from '@material-ui/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'
import VerificationQuestionPage
  from './components/verification-questions-cold-lead/verification-question/VerificationQuestionPage'
import VerificationResults from './components/verification-questions-cold-lead/verification-results/VerificationResults'
import EmailCaptureStep from './components/verification-questions-cold-lead/email-capture-step/EmailCaptureStep'
import { ColdLead } from './utils/Types'
import blckTwttrTheme from './components/theme/Theme'

export enum RoutesEnum {
  ENTRY_QUESTIONS = '/verification-questions',
  ENTRY_QUESTIONS_RESULTS = '/verification-questions/results',
}

function App() {
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
            <Route exact path={RoutesEnum.ENTRY_QUESTIONS_RESULTS +'/:id'}
                   render={() => <VerificationResults lead={coldLead} setLead={setColdLead}/>}/>
            <Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/:difficulty/:id'}
                   render={() => <VerificationQuestionPage lead={coldLead} setLead={setColdLead} />}/>
            <Redirect to={RoutesEnum.ENTRY_QUESTIONS}/>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
