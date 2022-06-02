import React, {FunctionComponent} from 'react'
import {Grid, Link, Typography} from '@material-ui/core'
import {SanityMenuGroup, SanityMenuItem} from '../../cmsClient'
import {useHistory} from 'react-router-dom'
import {makeStyles, Theme} from '@material-ui/core/styles'
import blckTwttrTheme from '../../common/Theme'

export const useStyles = makeStyles((theme: Theme) => ({
  plexH4: {
    fontWeight: 300,
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
    textDecorationThickness: 'from-font',
    color: blckTwttrTheme.palette.accentText.blue.main,
    whiteSpace: 'nowrap',
  },
  underlineHoverOff: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  specializing: {
    color: blckTwttrTheme.palette.text.disabled,
  },
  linkContainer: {
    textAlign: 'center',
  },
}))

type SpecializationsMenuProps = {
  menuGroup?: SanityMenuGroup
}

const SpecializationsMenu: FunctionComponent<SpecializationsMenuProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  const history = useHistory()

  return (
    <Grid container direction="column" item alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="overline" className={classes.specializing}>{props.menuGroup?.menuGroupTitle}</Typography>
      </Grid>
      <Grid container item justify="center"
            className={classes.linkContainer} spacing={4}>
        {
          props.menuGroup?.links?.map((link: SanityMenuItem, index: number) => {
            return (
              <Grid key={index} item xs={12} md={4}>
                <Link
                  className={classes.underlineHoverOff}
                  onClick={() => history.push(link.url ?? '')}>
                  <Typography variant="h4" className={classes.plexH4}>{link.displayText}</Typography>
                </Link>
              </Grid>
            )
          })
        }
      </Grid>
    </Grid>
  )
}

export default SpecializationsMenu