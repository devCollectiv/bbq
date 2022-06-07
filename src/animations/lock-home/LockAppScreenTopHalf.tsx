import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../components/theme/Theme'
import { Grid } from '@material-ui/core'
import { motion, useAnimation } from 'framer-motion'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  open?: boolean
}

const LockAppScreenTopHalf: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)


  const openIntialProperties = {
    top: 0
  }

  const openAnimateProperties = {
    top: '-50vh'
  }

  const closeIntialProperties = {
    top: '-50vh'
  }

  const closeAnimateProperties = {
    top: 0
  }

  const topVariants = {
    opened: {
      top: 'calc(-50vh - 64px)',
      transition: {
        delay: 1.2,
        duration: 1.5
      }
    },
    closed: {top: '-24px'}
  }

  const controls = useAnimation()

  const [initialProperties, setInitialProperties] = React.useState<any>(closeIntialProperties)
  const [animateProperties, setAnimateProperties] = React.useState<any>(closeAnimateProperties)

  React.useEffect(() => {
    if (props.open) {
      console.log('Opening top half')
      setInitialProperties(openIntialProperties)
      setAnimateProperties(openAnimateProperties)
    } else {
      setInitialProperties(closeIntialProperties)
      setAnimateProperties(closeAnimateProperties)
    }
  }, [props.open])


  React.useEffect(() => {
    controls.start('closed').then(() => {
      controls.start('opened')
    })
  }, [])

  return (
    <motion.div
      initial='opened'
      style={{position: 'absolute', zIndex: 9999}}
      animate={controls}
      variants={topVariants}
      transition={{duration: 2}}
    >
      <Grid container item style={{
        height: 'calc(50vh + 24px)',
        width: '100vw',
        backgroundColor: blckTwttrTheme.palette.background.paper
      }}>

      </Grid>
    </motion.div>
  )
}

export default LockAppScreenTopHalf