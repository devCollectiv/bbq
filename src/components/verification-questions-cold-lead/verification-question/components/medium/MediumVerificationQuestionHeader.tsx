import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles"
import { useStepStyles } from '../../step-1/Step1'
import blckTwttrTheme from '../../../abReplica/common/Theme'
import { Grid, Typography } from '@material-ui/core'
import {motion} from 'framer-motion'
export const useStyles = makeStyles((theme: Theme) => ({

}))

interface IProps {

}

const MediumVerificationQuestionHeader: FunctionComponent<IProps> = (props) => {
  const classes = useStepStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid item container direction='column' alignItems='center'>
      <Grid container direction='column' item style={{overflow: 'hidden'}}>
        <Typography
          variant='h3'
          color='primary'
          style={{textAlign: 'center'}}
          >
          O...Ok, what about...
        </Typography>
        {/*<Typography*/}
        {/*  variant='h2'*/}
        {/*  color='textSecondary'*/}
        {/*  align='center'*/}
        {/*  >*/}
        {/*  can you*/}
        {/*</Typography>*/}
        {/*<motion.div*/}
        {/*  initial={{*/}
        {/*    position: 'relative',*/}
        {/*    scale: 2,*/}
        {/*    opacity: 0*/}
        {/*  }}*/}
        {/*  animate={{*/}
        {/*    scale: 1,*/}
        {/*    opacity: 1*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Typography*/}
        {/*    variant='h2'*/}
        {/*    color='secondary'*/}
        {/*    align='center'*/}
        {/*    style={{marginTop: blckTwttrTheme.spacing(2)}}*/}
        {/*    >*/}
        {/*    answer this...*/}
        {/*  </Typography>*/}
        {/*</motion.div>*/}
      </Grid>
    </Grid>
  )
}

export default MediumVerificationQuestionHeader