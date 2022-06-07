import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blackFireworks from '../../components/shared/common/assets/for-animation/black-fireworks.png'
import { motion } from 'framer-motion'
import { FireworksFramerAnimate, FireworksFramerInitial, FireworksFramerTransition } from '../AnimateTypes'
import { v4 as uuidv4 } from 'uuid'

export const useStyles = makeStyles((theme: Theme) => ({}))


interface IProps {
  initialStyle?: FireworksFramerInitial,
  animateStyle?: FireworksFramerAnimate
  transitionStyle?: FireworksFramerTransition
}

const StagedFirework: FunctionComponent<IProps> = (props) => {

  return (
    <motion.div key={uuidv4()}
      initial={{...props.initialStyle, zIndex: 9999}}
      animate={props.animateStyle}
      transition={props.transitionStyle}
    >
      <img src={blackFireworks}/>
    </motion.div>
  )
}

export default StagedFirework