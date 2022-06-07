import React from 'react'
import { FireworksFramerAnimate, FireworksFramerInitial } from '../AnimateTypes'

export type AnimationContextType = {
  loading: boolean,
  handleSetLoading?(loading:boolean): void,
  shootFirework?(initialStyles: FireworksFramerInitial, animateStyles: FireworksFramerAnimate): void,
  shootBlackCardCongratsFireworks?():void,
  handleSetAnimationStage?(stage:any):void,
  animationStage?:any,
  homeAnimationAnimate?: any,
  homeAnimationInitial?: any
  fadeHomeOut?:any
  lockScreen?(onFinish:any):void
  openLockScreen?():void
}

const AnimationContext = React.createContext<AnimationContextType>({
  loading: false
})

export default AnimationContext
