import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import blckTwttrTheme from '../../../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const VerificationResultsFailHeader: FunctionComponent<IProps> = (props) => {
  return (
    <Grid item container direction='column' alignItems='center'>
      <Grid item>
        <motion.div
          initial={{
            scale: -10,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
        >
          <Typography
            variant='h6'
            color='textSecondary'
            align='center'
          >
            You are indeed
          </Typography>
        </motion.div>
      </Grid>
      <Grid container item justifyContent='center'>
        <Typography
          variant='h6'
          color='secondary'
          display='inline'
          align='center'
        >
          black
        </Typography>
      </Grid>
      <Grid container item justifyContent='center'>
        <Typography
          variant='h6'
          color='textSecondary'
          align='center'
          style={{marginLeft: blckTwttrTheme.spacing(2)}}>
          or<Typography
          component='p'
          variant='h6'
          display='inline'
          color='secondary'
          align='center'
          style={{marginLeft: blckTwttrTheme.spacing(1)}}>black</Typography> Adjacent </Typography>
      </Grid>
    </Grid>
  )
}

export default VerificationResultsFailHeader