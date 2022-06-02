import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import FooterMenuContainer from './FooterMenuContainer'
import blckTwttrTheme from '../common/Theme'
import { SanityHomePage } from '../static-pages/cmsStaticPagesClient'
import { SanityAftHomePage } from '../../layout/AftMarketing'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: '#3D3D3D',
    // color: '#FDF3EB',
    // marginLeft: -1 * theme.spacing(1),
    // zIndex: 1000,
    padding: theme.spacing(4),
    '& .MuiFormLabel-root': {
      color: 'white',
    },
  },
  emailContainer: {
    height: '72px',
  },
  columnHeader: {
    fontWeight: 500,
    color: '#FDF3EB',
    marginBottom: '16px',
  },
  footerLink: {
    marginBottom: '8px',
  },
  newsletterForm: {
    maxWidth: '370px',
  },
  emailInputProps: {
    borderColor: '#FDF3EB',
    color: '#FDF3EB !important',
  },
}))

interface IProps {
  footerMenuSlug?:string
  homePage?: SanityAftHomePage
}

const Footer: FunctionComponent<IProps> = (props:IProps) => {
  // const [email, setEmail] = React.useState('')
  const classes = useStyles(blckTwttrTheme)

  return (
    <Grid container className={classes.root}>
      <Grid container justifyContent="flex-start">
        <Grid item xs={12}>
          <FooterMenuContainer homePage={props.homePage} menuContainerSlug={props.footerMenuSlug}/>
        </Grid>
        {/*  <Grid container direction="column" alignItems="flex-end" item xs={6}>*/}
        {/*    <Grid container spacing={2} direction="column" item className={classes.newsletterForm}>*/}
        {/*      <Grid item>*/}
        {/*        <Typography variant="overline" className={classes.columnHeader}>Subscribe to our Newsletter</Typography>*/}
        {/*      </Grid>*/}
        {/*      <Grid item>*/}
        {/*        <Typography variant="subtitle2">Hear from founders and find new insights.</Typography>*/}
        {/*      </Grid>*/}
        {/*      <Grid item>*/}
        {/*        <Grid container justify="center" item>*/}
        {/*          <TextField*/}
        {/*              fullWidth={true}*/}
        {/*              label="Email"*/}
        {/*              id="email"*/}
        {/*              name="email address"*/}
        {/*              type="email"*/}
        {/*              variant="outlined"*/}
        {/*              InputProps={{*/}
        {/*                classes: {*/}
        {/*                  notchedOutline: classes.emailInputProps*/}
        {/*                }*/}
        {/*              }}*/}
        {/*              value={email}*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
      </Grid>
    </Grid>


  )
}

export default Footer