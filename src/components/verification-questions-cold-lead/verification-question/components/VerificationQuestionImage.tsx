import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'
import { TouchApp } from '@material-ui/icons'
import blckTwttrTheme from '../../../theme/Theme'
import cmsClient, { SanityImage } from '../../../shared/cms/cmsClient'

import { motion } from 'framer-motion'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  imageSrc?: SanityImage
  imageDataUrl?: string
  height?: number
  width?: number
}

const VerificationQuestionImage: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  const HEIGHT = props.height || 400
  const WIDTH = props.width || 400

  const [width, setWidth] = React.useState<number>(HEIGHT)
  const [height, setHeight] = React.useState<number>(WIDTH)
  const [imageSrcUrl, setImageSrcUrl] = React.useState<string>()

  React.useEffect(()=>{
      if(props.height){
        setHeight(props.height)
      }
  },[props.height])

  React.useEffect(() => {
    if (props.imageSrc) {
      const calculatedWidth = Math.floor(props.imageSrc.asset.metadata.dimensions.aspectRatio * height)
      const url = cmsClient.utils
        .urlFor(props.imageSrc)?.height(height)
        .width(calculatedWidth)
        .fit('scale')
        .url() ?? ''

      setWidth(calculatedWidth)
      setHeight(height)
      setImageSrcUrl(url)
    }
  }, [props.imageSrc, height])

  React.useEffect(() => {
    if (props.imageDataUrl) {
      let i = new Image()

      i.onload = function () {
        console.log('widht and height calculated from data Url', i.width, i.height, props.imageDataUrl)
        const aspectRatio = i.width/i.height
        console.log("current height",height)
        const calculatedWidth = Math.floor(aspectRatio * height)

        setWidth(calculatedWidth)
        setImageSrcUrl(props.imageDataUrl)
      }

      i.src = props.imageDataUrl
    }
  }, [props.imageDataUrl])

  return (
    <Grid item xs={12} container justifyContent='center'>
      {imageSrcUrl && <Card style={{
        overflow: 'scroll',
        borderRadius: '16px',
        position: 'relative',
        height: height,
        width: width
      }}>
        <img src={imageSrcUrl}/>

        <motion.div
          initial={{
            position: 'absolute', top: '50px', right: '32px'
          }}
          animate={{
            top: '85%',
            opacity: [0, .9, 0, .9, 0, .7]
          }}
          transition={{duration: 2}}
        >
          <TouchApp fontSize='large' style={{color: 'whitesmoke'}}/>
        </motion.div>
        <motion.div
          initial={{
            position: 'absolute', top: '50px', right: '32px'
          }}
          animate={{
            right: '85%',
            opacity: [0, .9, 0, .9, 0, 0]
          }}
          transition={{duration: 2}}
        >
          <TouchApp fontSize='large' style={{color: 'whitesmoke'}}/>
        </motion.div>
      </Card>}
    </Grid>
  )
}

export default VerificationQuestionImage