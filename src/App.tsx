import './App.css'
import { CssBaseline, Grid, MuiThemeProvider } from '@material-ui/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import React, { useContext } from 'react'
import VerificationQuestionPage
  from './components/verification-questions-cold-lead/verification-question/VerificationQuestionPage'
import VerificationResults from './components/verification-questions-cold-lead/verification-results/VerificationResults'
import EmailCaptureStep from './components/verification-questions-cold-lead/email-capture-step/EmailCaptureStep'
import { ColdLead } from './utils/Types'
import blckTwttrTheme from './components/theme/Theme'
import AddVerificationQuestion
  from './components/verification-questions-cold-lead/add-verification-question/AddVerificationQuestion'
import AddVerificationQuestionComplete
  from './components/verification-questions-cold-lead/add-verification-question/AddVerificationQuestionComplete'
import AnimationProvider from './animations/animation-context/AnimationProvider'
import AnimationContext from './animations/animation-context/AnimationContext'

export enum RoutesEnum {
  ENTRY_QUESTIONS = '/verification-questions',
  ENTRY_QUESTIONS_RESULTS = '/verification-questions/results',
  ADD_ENTRY_QUESTION = '/verification-questions/add-question',
  ADD_ENTRY_QUESTION_RESULT = '/verification-questions/add-question-complete'
}

function App() {
  const [coldLead, setColdLead] = React.useState<ColdLead>({
    email: ''
  })


  return (
    <MuiThemeProvider theme={blckTwttrTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <AnimationProvider>
          <Grid container item direction='column' alignItems='center' style={{height: '100vh', width: '100vw'}}>
            <Grid container item>
              <Switch>
                <Route exact path={RoutesEnum.ADD_ENTRY_QUESTION_RESULT + '/:questionId'}
                       render={() => <AddVerificationQuestionComplete lead={coldLead} setLead={setColdLead}/>}/>
                <Route exact path={RoutesEnum.ADD_ENTRY_QUESTION + '/:id'}
                       render={() => <AddVerificationQuestion lead={coldLead} setLead={setColdLead}/>}/>
                <Route exact path={RoutesEnum.ENTRY_QUESTIONS}
                       render={() => <EmailCaptureStep lead={coldLead} setLead={setColdLead}/>}/>
                <Route exact path={RoutesEnum.ENTRY_QUESTIONS_RESULTS + '/:id'}
                       render={() => <VerificationResults lead={coldLead} setLead={setColdLead}/>}/>
                <Route exact path={RoutesEnum.ENTRY_QUESTIONS + '/:difficulty/:id'}
                       render={() => <VerificationQuestionPage lead={coldLead} setLead={setColdLead}/>}/>
                <Redirect to={RoutesEnum.ENTRY_QUESTIONS}/>
              </Switch>
            </Grid>
          </Grid>
        </AnimationProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
