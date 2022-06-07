import React, { FunctionComponent, PropsWithChildren, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import AnimationContext, { AnimationContextType } from './AnimationContext'
import blckTwttrTheme from '../../components/theme/Theme'
import { FireworksFramerAnimate, FireworksFramerInitial, FireworksFramerTransition } from '../AnimateTypes'
import { Grid } from '@material-ui/core'
import StagedFirework from '../staged-animations/StagedFirework'
import AnimationStage from '../AnimationStage'
import { motion } from 'framer-motion'
import LockAppScreenTopHalf from '../lock-home/LockAppScreenTopHalf'
import LockAppScreenBottomHalf from '../lock-home/LockAppScreenBottomHalf'

export const useStyles = makeStyles((theme: Theme) => ({}))

export type AnimatedProviderProps = {
  value?: AnimationContextType
}

const AnimationProvider: FunctionComponent<AnimatedProviderProps> = (props: PropsWithChildren<AnimatedProviderProps>) => {
  const classes = useStyles(blckTwttrTheme)
  const history = useHistory()

  const [loading, setLoading] = React.useState<boolean>(false)

  const HOME_FADE_OUT = {
    opacity: 0
  }
  const HOME_INITIAL = {
    opacity: 1,
    zIndex: 0
  }
  const [animationStage, setAnimationStage] = React.useState<any[]>([])
  const [homeAnimationInitial, setHomeAnimationInitial] = React.useState<any>(HOME_INITIAL)
  const [homeAnimationAnimate, setHomeAnimationAnimate] = React.useState<any>(HOME_FADE_OUT)

  const fadeHomeOut = () => {
    console.log('Fading Home out')
    setHomeAnimationInitial(HOME_INITIAL)
    setHomeAnimationAnimate(HOME_FADE_OUT)
  }

  const lockScreen = (onFinish: any) => {
    setAnimationStage([])
    // make div for top half of screen
    setAnimationStage(state => {
      console.log('top half of lock screen', state)
      return state && state.concat([<LockAppScreenTopHalf/>,
        <LockAppScreenBottomHalf onFinish={onFinish} animationDone={
          () => {
            setAnimationStage([])
          }
        }/>])
    })
  }

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading)
  }


  const handleSetAnimationStage = (stage: any[]) => {
    setAnimationStage(stage)
  }

  const shootFirework = (initialStyles: FireworksFramerInitial, animateStyles: FireworksFramerAnimate, transition: FireworksFramerTransition) => {
    setAnimationStage(state => {
      console.log('current ani stage', state)
      return state && state.concat(<StagedFirework initialStyle={initialStyles} animateStyle={animateStyles}
                                                   transitionStyle={transition}/>)
    })
  }

  const shootBlackCardCongratsFireworks = () => {
    const initialStyles: FireworksFramerInitial[] = [
      {
        opacity: 1,
        scale: .5,
        position: 'absolute',
        top: '-423px',
        left: '-263px'
      },
      {
        opacity: 1,
        scale: 0,
        position: 'absolute',
        top: '0px',
        left: '-463px'
      },
      {
        opacity: 1,
        scale: 0,
        position: 'absolute',
        top: '-550px',
        left: '-563px'
      }
    ]

    const animateStyles = [
      {
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      },
      {
        opacity: [0, 1, 0],
        scale: [0, .5, 0]
      },
      {
        opacity: [0, .5, 0],
        scale: [0, .75, 0]
      }
    ]

    const transitions = [
      {duration: 1.75, delay: .25},
      {duration: 1.5, delay: 1.75},
      {
        duration: 1.25, delay: 2.5
      }
    ]

    console.log('Adding firworks animation')
    for (let z = 0; z < initialStyles.length; z++) {
      console.log('shoot a single firework', z)
      shootFirework(initialStyles[z], animateStyles[z], transitions[z])
    }

  }

  const animationContext = useContext(AnimationContext)

  return (
    <AnimationContext.Provider
      value={{
        loading,
        handleSetLoading,
        shootBlackCardCongratsFireworks,
        handleSetAnimationStage,
        animationStage,
        fadeHomeOut,
        lockScreen
      }}
    >
      <Grid container style={{position: 'relative'}}>

          <Grid item>
            {props.children}
          </Grid>
        <Grid item style={{position: 'absolute'}}>
          <AnimationStage/>
        </Grid>
      </Grid>
    </AnimationContext.Provider>
  )
}

export default AnimationProvider
