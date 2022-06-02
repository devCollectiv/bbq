import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../abReplica/common/Theme'
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core'
import { SanitySlug, SanityVerificationQuestion } from '../../../common/sanityIo/Types'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  verificationQuestion: SanityVerificationQuestion
  handleSetSelectedResponse(response:string): void
}

const VerificationQuestion: FunctionComponent<IProps> = ({verificationQuestion, handleSetSelectedResponse}) => {
  const classes = useStyles(blckTwttrTheme)

  const [responses, setResponses] = React.useState<string[]>([])
  const [selectedResponse,setSelectedResponse] = React.useState<string>("")

  React.useEffect(() => {
    console.log('Setting up answers', verificationQuestion)


    if (verificationQuestion?.incorrectAnswers !== undefined) {
      const answers = [...verificationQuestion?.incorrectAnswers ?? '', verificationQuestion?.correctAnswer ?? '']
      setResponses(answers)
    }
  }, [verificationQuestion])

  React.useEffect(()=>{
      handleSetSelectedResponse(selectedResponse)
  },[selectedResponse])

  return (
    <Grid container item style={{ maxHeight:"250px", minHeight:"230px"}} xs={8} sm={10}>
      <Grid item>
        <Typography variant='h5' gutterBottom color='secondary'>{verificationQuestion?.question}?</Typography>
      </Grid>
      <Grid container item style={{marginLeft: blckTwttrTheme.spacing(3)}}>
        <FormControl>
          {/*<FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>*/}
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            value={selectedResponse}
          >
            <Grid container item spacing={2}>
            {responses.map((response, index) => {
              return <Grid key={index} container item alignItems='flex-start' alignContent='flex-start'>
                <FormControlLabel
                  value={response}
                  onChange={(e:any)=> {
                    console.log("response changes for first", e.target.value)
                    setSelectedResponse(e.target.value)
                  }}
                  control={<Radio/>}
                  label={
                    <Typography variant='h6'>
                      {response}
                    </Typography>
                  }/>
                {/*<hr/>*/}
              </Grid>
            })}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default VerificationQuestion