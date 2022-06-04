import React, { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import blackFireworks from '../components/shared/common/assets/for-animation/black-fireworks.png'
import { Grid } from '@material-ui/core'

const BlackFireworksAnimation: FunctionComponent = (props) => {
  return (
    <Grid item style={{
      position: 'absolute',
      zIndex: 9999
    }}>
      <motion.div
        initial={{
          opacity: 1,
          scale: .5,
          position: 'absolute',
          top: '-423px',
          left: '-463px'
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{duration: 2, delay: .25}}
      >
        <img src={blackFireworks}/>
      </motion.div>
      <motion.div
        initial={{
          opacity: 1,
          scale: 0,
          position: 'absolute',
          top: '-200px',
          left: '-763px'
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, .5, 0]
        }}
        transition={{duration: 1.5, delay: 1.5}}
      >
        <img src={blackFireworks}/>
      </motion.div>
      <motion.div
        initial={{
          opacity: 1,
          scale: 0,
          position: 'absolute',
          top: '-550px',
          left: '-763px'
        }}
        animate={{
          opacity: [0, .5, 0],
          scale: [0, .75, 0]
        }}
        transition={{
          duration: 1.25, delay: 1
        }}
      >
        <img src={blackFireworks}/>
      </motion.div>
    </Grid>
  )
}

export default BlackFireworksAnimation