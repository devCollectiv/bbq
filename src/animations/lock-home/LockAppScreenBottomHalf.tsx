import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../components/theme/Theme'
import { Grid } from '@material-ui/core'
import { motion, useAnimation } from 'framer-motion'
import { Lock, LockOpen } from '@material-ui/icons'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  onFinish?(): any
  animationDone?():any
  open?: boolean
}

const LockAppScreenBottomHalf: FunctionComponent<IProps> = (props) => {


  const bottomHalfVariants = {
    opened: {top: '150vh'},
    closed: {top: '50vh'}
  }
  const lockVariants = {
    shown: {opacity: 1},
    notShown: {opacity: 0}
  }

  const controls = useAnimation()
  const lockControls = useAnimation()
  const unlockControls = useAnimation()

  React.useEffect(() => {
    controls.start('closed').then(() => {
      props && props.onFinish && props.onFinish()
      unlockControls.start('shown')
      lockControls.start('notShown').then(()=>{
        controls.start('opened').then(()=>{
          props.animationDone&& props.animationDone()
        })
      })
    })
  }, [])


  return (
    <Grid item>
      <motion.div
        style={{position: 'absolute', zIndex: 9999}}
        initial='opened'
        animate={controls}
        transition={{duration: 2}}
        variants={bottomHalfVariants}
      >
        <Grid container item justifyContent='center' style={{
          height: '50vh',
          width: '100vw',
          position: 'relative',
          backgroundColor: blckTwttrTheme.palette.background.paper
        }}>
          <Grid item style={{
            borderRadius: '50px',
            padding: blckTwttrTheme.spacing(3, 5),
            backgroundColor: 'darkgoldenrod',
            color: '#FAFAFA',
            height: 'max-content',
            position: 'relative',
            top: -50
          }}>

            <motion.div
              initial='shown'
              animate={lockControls}
              transition={{duration: 1}}
              variants={lockVariants}
            >

              <Lock color='inherit' style={{fontSize: '96px'}}/>
            </motion.div>
            <motion.div
              style={{position: 'absolute', top: 24}}
              initial='notShown'
              animate={unlockControls}
              transition={{duration: 1}}
              variants={lockVariants}
            >

              <LockOpen color='inherit' style={{fontSize: '96px'}}/>
            </motion.div>
          </Grid>

        </Grid>
      </motion.div>
    </Grid>
  )
}

export default LockAppScreenBottomHalf