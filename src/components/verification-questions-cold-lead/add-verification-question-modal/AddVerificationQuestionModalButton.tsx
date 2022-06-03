import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import AddVerificationQuestionModal from './AddVerificationQuestionModal'
import blckTwttrTheme from '../../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
}

const AddVerificationQuestionModalButton: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  return (
    <>
    <Button
      aria-label='submit a question'
      color='secondary'
      variant='outlined'
      style={{borderRadius: '20px', padding: blckTwttrTheme.spacing(1, 8)}}
      onClick={()=>setIsModalOpen(true)}
    >
      <Typography variant='button' align='center' style={{textTransform: 'capitalize'}}>
        Add a #BlackTwitterVerificationQuestion
      </Typography>
    </Button>
      <AddVerificationQuestionModal open={isModalOpen}/>
    </>
  )
}

export default AddVerificationQuestionModalButton