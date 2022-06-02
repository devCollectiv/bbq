import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../../abReplica/common/Theme'
import { Grid, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { useStepStyles } from '../../step-1/Step1'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const HardVerificationQuestionHeader: FunctionComponent<IProps> = (props) => {
  const classes = useStepStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid container item direction='column' alignItems='center'>
      <Grid container justifyContent='center' item>
        <motion.div
          initial={{
            scale: 2,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
        >
          <Typography
            component='div'
            variant='h3'
            color='textSecondary'
            align='center'
          >
            U do look familiar...but...
          </Typography>
        </motion.div>
      </Grid>
      {/*<Grid container justifyContent='center' item>*/}
      {/*  <Typography*/}
      {/*    variant='h2'*/}
      {/*    color='textSecondary'*/}
      {/*    align='center'*/}
      {/*  >*/}
      {/*    you might*/}
      {/*  </Typography>*/}
      {/*</Grid>*/}
      {/*<Grid container justifyContent='center' item style={{position: 'relative'}}>*/}
      {/*  <Grid item>*/}

      {/*  <motion.div*/}
      {/*    initial={{*/}
      {/*      position: 'relative',*/}
      {/*      left: -130,*/}
      {/*      opacity: 0*/}
      {/*    }}*/}
      {/*    animate={{*/}
      {/*      left: 124,*/}
      {/*      opacity: 1*/}
      {/*    }}*/}
      {/*    transition={{duration: 1}}*/}
      {/*  >*/}
      {/*    <Typography*/}
      {/*      variant='h2'*/}
      {/*      color='secondary'*/}
      {/*      align='center'*/}
      {/*      >*/}
      {/*      be Black.*/}
      {/*    </Typography>*/}
      {/*  </motion.div>*/}
      {/*  </Grid>*/}
      {/*  <Grid item>*/}
      {/*    <motion.div*/}
      {/*      initial={{*/}
      {/*        position: 'relative',*/}
      {/*        right: -130,*/}
      {/*        opacity: 0*/}
      {/*      }}*/}
      {/*      animate={{*/}
      {/*        right: 123,*/}
      {/*        opacity: 1*/}
      {/*      }}*/}
      {/*      transition={{duration: 1}}*/}
      {/*    >*/}
      {/*      <Typography*/}
      {/*        variant='h2'*/}
      {/*        color='primary'*/}
      {/*        align='center'*/}
      {/*      >*/}
      {/*        be Black.*/}
      {/*      </Typography>*/}
      {/*    </motion.div>*/}
      {/*  </Grid>*/}
    </Grid>
  )
}

export default HardVerificationQuestionHeader