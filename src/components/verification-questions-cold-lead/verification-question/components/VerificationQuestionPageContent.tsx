import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import VerificationQuestionImage from './VerificationQuestionImage'
import VerificationQuestion from './VerificationQuestion'
import { Grid } from '@material-ui/core'
import { SanityVerificationQuestion } from '../../../../utils/Types'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  handleResponse?(response:string):void,
  verificationQuestion?: SanityVerificationQuestion
}

const VerificationQuestionPageContent: FunctionComponent<IProps> = (props) => {
  return (
    <Grid container item justifyContent='center' spacing={2}>
      {/*{retries > 0 && <Typography>Retries: {retries}</Typography>}*/}
      {
        props.verificationQuestion?.imageSrc
        && <VerificationQuestionImage imageSrc={props.verificationQuestion.imageSrc}/>
      }
      {
        props.verificationQuestion && <Grid item xs={12} sm={6} container justifyContent='center'>
          <VerificationQuestion
            handleSetSelectedResponse={props.handleResponse}
            verificationQuestion={props.verificationQuestion}
          />
        </Grid>
      }
    </Grid>
  )
}

export default VerificationQuestionPageContent