import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../../abReplica/common/Theme'
import { Fab, Grid, Typography } from '@material-ui/core'
import VerificationQuestionCategorySelectModal from './VerificationQuestionCategorySelectModal'
import MenuIcon from '@material-ui/icons/Menu'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  currentCategory: any

  handleSetCurrentCategory(category: any): void
}

const VerificationQuestionCategorySelector: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  return (
    <>
      <Fab
        style={{
          position: 'fixed',
          top: '105px',
          left: '32px',
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
        color='secondary'
      >
        <MenuIcon/>
      </Fab>
      <VerificationQuestionCategorySelectModal
        open={isModalOpen}
        currentCategory={props.currentCategory}
        handleSetCurrentCategory={
          (category: any) => props.handleSetCurrentCategory(category)
        }
      />
    </>
  )
}

export default VerificationQuestionCategorySelector