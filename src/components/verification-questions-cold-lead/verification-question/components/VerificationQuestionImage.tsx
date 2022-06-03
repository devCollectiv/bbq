import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'
import { TouchApp } from '@material-ui/icons'
import blckTwttrTheme from '../../../theme/Theme'
import cmsClient, { SanityImage } from '../../../shared/cms/cmsClient'

import {motion} from 'framer-motion'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  imageSrc?: SanityImage
}

const VerificationQuestionImage: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid item xs={12} sm={6} container justifyContent='center'>
      {props.imageSrc && <Card style={{
        overflow: 'scroll',
        borderRadius: '16px',
        position: 'relative',
        height: 400,
        width: props.imageSrc.asset.metadata.dimensions.aspectRatio * 400
      }}>
        <img src={
          cmsClient.utils
            .urlFor(props.imageSrc)?.height(400)
            .width(Math.floor(props.imageSrc.asset.metadata.dimensions.aspectRatio * 400))
            .fit('scale')
            .url() ?? ''}/>

        <motion.div
          initial={{
            position: 'absolute', top: '50px', right: '32px'
          }}
          animate={{
            top: '85%',
            opacity: [0,.9,0,.9,0,.7]
          }}
          transition={{duration: 2}}
        >
          <TouchApp fontSize='large'  style={{color: "whitesmoke"}}/>
        </motion.div>
        <motion.div
          initial={{
            position: 'absolute', top: '50px', right: '32px'
          }}
          animate={{
            right: '85%',
            opacity: [0,.9,0,.9,0,0]
          }}
          transition={{duration: 2}}
        >
          <TouchApp fontSize='large'  style={{color: "whitesmoke"}}/>
        </motion.div>
      </Card>}
    </Grid>
  )
}

export default VerificationQuestionImage