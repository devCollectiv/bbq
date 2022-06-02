import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../../abReplica/common/Theme'
import { Grid, Typography } from '@material-ui/core'
import { useStepStyles } from '../../step-1/Step1'
import { motion } from 'framer-motion'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const EasyVerificationQuestionHeader: FunctionComponent<IProps> = (props) => {
  const classes = useStepStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid item container direction='column' alignItems='center'>
      <Grid item>
        <Typography
          variant='h3'
          color='textSecondary'
          align='center'
          >
          Lemme ask you this...
        </Typography>
      </Grid>
      {/*<Grid item>*/}
      {/*  <motion.div*/}
      {/*    initial={{*/}
      {/*      scale: -10,*/}
      {/*      opacity: 0*/}
      {/*    }}*/}
      {/*    animate={{*/}
      {/*      scale: 1,*/}
      {/*      opacity: 1*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography*/}
      {/*      variant='h2'*/}
      {/*      color='secondary'*/}
      {/*      align='center'*/}
      {/*    >*/}
      {/*      YOU*/}
      {/*    </Typography>*/}
      {/*  </motion.div>*/}
      {/*</Grid>*/}
      {/*<Grid container item justifyContent='center'>*/}
      {/*  <Typography*/}
      {/*    variant='h2'*/}
      {/*    color='textSecondary'*/}
      {/*    display='inline'*/}
      {/*    align='center'*/}
      {/*  >*/}
      {/*    belong*/}
      {/*  </Typography>*/}
      {/*  <Typography*/}
      {/*    variant='h2'*/}
      {/*    display='inline'*/}
      {/*    color='secondary'*/}
      {/*    align='center'*/}
      {/*    style={{marginLeft: blckTwttrTheme.spacing(2)}}>*/}
      {/*    here...*/}
      {/*  </Typography>*/}
      {/*</Grid>*/}
    </Grid>
  )
}

export default EasyVerificationQuestionHeader