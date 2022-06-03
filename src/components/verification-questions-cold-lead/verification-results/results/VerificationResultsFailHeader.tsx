import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { useStepStyles } from '../../email-capture-step/EmailCaptureStep'
import blckTwttrTheme from '../../../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const VerificationResultsFailHeader: FunctionComponent<IProps> = (props) => {
  const classes = useStepStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid item container direction='column' alignItems='center'>
      <Grid item>
        <Typography
          component='span'
          variant='h2'
          color='secondary'
          display='inline'
          style={{textAlign: 'center'}}
          >
          You FAILED!
        </Typography>
      </Grid>
    </Grid>
  )
}

export default VerificationResultsFailHeader