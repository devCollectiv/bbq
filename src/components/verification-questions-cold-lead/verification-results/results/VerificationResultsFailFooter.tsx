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
              You are either
            </Typography>
          </motion.div>
        </Grid>
        <Grid container item justifyContent='center'>
          <Typography
            variant='h6'
            color='textSecondary'
            align='center'
          >
            not black
          </Typography>
        </Grid>
        <Grid container item justifyContent='center'>

          <Typography
            variant='h6'
            color='primary'
            align='center'
            style={{marginLeft: blckTwttrTheme.spacing(2)}}>
            or not black enough </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default VerificationResultsFailHeader