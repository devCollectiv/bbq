import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const AddVerificationQuestionHeader: FunctionComponent<IProps> = (props) => {
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
          If your ? is approved it will appear as shown.
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

export default AddVerificationQuestionHeader