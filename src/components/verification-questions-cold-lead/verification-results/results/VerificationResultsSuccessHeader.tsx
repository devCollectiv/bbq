import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../../abReplica/common/Theme'
import { Grid, Typography } from '@material-ui/core'
import { useStepStyles } from '../../email-capture-step/Step1'
import { motion } from 'framer-motion'

import blackFireworks from '../../../../components/abReplica/common/assets/black-fireworks.png'


export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const VerificationResultsSuccessHeader: FunctionComponent<IProps> = (props) => {
  const classes = useStepStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid item container justifyContent='center'>
      <Grid item>
        <Typography
          variant='h3'
          color='secondary'
          align='center'
        >
          Congratulations!
        </Typography>
      </Grid>
    </Grid>
  )
}

export default VerificationResultsSuccessHeader