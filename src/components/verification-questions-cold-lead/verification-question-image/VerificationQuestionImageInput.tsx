import React, { FunctionComponent, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@material-ui/core'

import { motion } from 'framer-motion'
import VerificationQuestionImage from '../verification-question/components/VerificationQuestionImage'
import firebaseAnalyticsClient from '../../shared/firebase/firebaseAnalyticsClient'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  coldLeadId?: string
  handleSetImage?({imageFileDataUrl, fileUploadState}:{imageFileDataUrl:string, fileUploadState:any}): void
}

const VerificationQuestionImageInput: FunctionComponent<IProps> = (props) => {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [uploadedImageDataUrl, setUploadedImageDataUrl] = React.useState<any>()
  const [fileUploadState,setFileUploadState] = React.useState<any>()
  React.useEffect(() => {
    if (uploadedImageDataUrl && props.handleSetImage) {
      props.coldLeadId && firebaseAnalyticsClient.veriQImageUploaded(props.coldLeadId)
      props.handleSetImage({imageFileDataUrl:uploadedImageDataUrl, fileUploadState})
    }
  }, [uploadedImageDataUrl, fileUploadState])


  const fileUploadToBlob = (blob: any) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(blob)

    fileReader.addEventListener('load', function (progressEvent) {
      if (progressEvent && progressEvent.target && progressEvent.target.result) {

        const newState = {
          fileUploaded: blob,
        }
        setFileUploadState((state:any) => ({...state, ...newState}))
        setUploadedImageDataUrl(progressEvent.target.result)
      }
    })
  }

  const updateQuestionImage = (event: any) => {
    if (event.target.files.length > 0) {
      fileUploadToBlob(event.target.files[0])
    }
  }

  return (
    <Grid item xs={12} container justifyContent='center' spacing={2}>
      {
        uploadedImageDataUrl &&
        <motion.div
          initial={{height: 0, opacity: 0}}
          animate={{height: 400, opacity:1 }}
          transition={{duration:.75}}
        >
          <VerificationQuestionImage imageDataUrl={uploadedImageDataUrl}/>
        </motion.div>
      }
      <Grid item container justifyContent='center'>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              style={{alignItems: 'start'}}
              control={
                <Grid container item style={{position: 'relative'}} justifyContent='center'>
                  <TextField
                    style={{opacity: 0}}
                    required
                    ref={imageInputRef}
                    fullWidth
                    variant='outlined'
                    onChange={updateQuestionImage}
                    name='verificationQuestionImage'
                    type='file'
                    inputProps={{accept: 'image/png, image/jpeg'}}
                  />
                  <Button
                    onClick={(e) => {
                      imageInputRef.current?.click()
                    }}
                    color='secondary'
                    variant='outlined'
                    style={{
                      position: 'absolute',
                      borderRadius: '16px',
                      backgroundColor: "#FAFAFA"
                    }}
                  >
                    <Grid container justifyContent='center'>
                      <Grid item xs={7}>
                        <Typography color='inherit' style={{fontFamily: 'Youth'}}>Choose Verification Question Image
                          File...</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              }
              label={''}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default VerificationQuestionImageInput