import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles"
import {Button, Grid, InputAdornment, Link, TextField, Typography, withStyles} from "@material-ui/core";
import theme from "../../common/Theme";
import {
  AccountCircle,
  Email,
  EmailOutlined,
  Facebook,
  LinkedIn,
  MailOutline,
  Message,
  Phone,
  PhoneOutlined,
  Twitter,
  YouTube
} from "@material-ui/icons";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#1f1f1f',
    color: "#FAFAFA",
    padding: theme.spacing(0, 4)
  },
  header: {
    fontWeight: 800,
    letterSpacing: '10px',
    lineHeight: 1.4,
    fontSize: '30px',
    textTransform: 'uppercase'
  },
  headerAccent: {
    display: 'inline-block',
    marginLeft: theme.spacing(1)
  },
  formContainer: {
    margin: 'auto',
    height: '500px',
    paddingTop: "28px",
    paddingLeft: "48px",
    paddingRight: "48px",
    paddingBottom: "18px",
    borderRadius: ' 0.63rem',
    backgroundColor: '#313131',
    boxShadow: '11px 10px 38px rgb(0 0 0 / 38%)'
  },
  inputAdornmentContainer: {
    marginTop: theme.spacing(1),
    zIndex: 3
  },
  inputAdornmentTextBlockContainer: {
    position: "relative",
    top: -25,
    zIndex: 3
  },
  formTitle: {
    marginBottom: theme.spacing(1)
  },
  socialMediaContainer: {
    marginTop: theme.spacing(1)
  },
  lhsContainer: {
    width: "500px",
    height: "650px"
  },
  formInput: {
    color: "white",
  },
  sectionTitle: {
    fontWeight: 800,
    color: "white !important"
  }
}))

const StyledTextField = withStyles({
  root: {
    transition: "all 0.3s ease-in-out",
    "& label": {
      display: "inline-block",
      fontSize: "16px",
      fontWeight: 700,
      position: "relative",
      top: "0px",
      left: "-14px",
    },
    "& legend": {
      maxWidth: "0px"
    },
    "& input": {
      height: "0px",
      zIndex: 2
    },
    "& textarea": {
      zIndex: 2
    },
    "& fieldset": {
      backgroundColor: "#292929",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: `${theme.palette.primary.main} !important`,
      "&.Mui-focused": {
        borderColor: `${theme.palette.primary.main} !important`,
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${theme.palette.primary.main} !important`
          }
        }
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: `#212121 !important`
        }
      }
    }
  }
})(TextField);

export type ContactUsProps = {
  address: string,
  email: string,
  phone: string,
  facebook: string,
  twitter: string,
  linkedIn: string,
  youtube: string
}

const ContactUs: FunctionComponent<ContactUsProps> = (props) => {
  const classes = useStyles(theme)

  return (
    <Grid container className={classes.root}>
      <Grid container item alignItems="stretch">
        <Grid container item xs={12} lg={6}>
          <Grid container direction="column" item justify="space-around" className={classes.lhsContainer}>
            <Grid container item>
              <Typography variant="h2">Have a Project?</Typography>
            </Grid>
            <Grid container item>
              <Typography style={{wordWrap: "break-word"}}>
                Let me know how i can help. Fill out the form and i’ll be in touch as soon as
                possible.</Typography>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography ><MailOutline/></Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.sectionTitle}>Address:</Typography>
                <Typography >{props.address}</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography ><PhoneOutlined/></Typography>
              </Grid>
              <Grid item>
                <Typography  className={classes.sectionTitle}>Phone:</Typography>
                <Typography >{props.phone}</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography ><EmailOutlined/></Typography>
              </Grid>
              <Grid item>
                <Typography  className={classes.sectionTitle}>Email:</Typography>
                <Typography >{props.email}</Typography>
                <Grid container item className={classes.socialMediaContainer} spacing={1}>
                  <Grid item>
                    <Typography >
                      <Link href={"http://facebook.com/"+props.facebook}><Facebook fontSize="large"/></Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography >
                      <Link href={"http://twitter.com/"+props.twitter}><Twitter fontSize="large"/></Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography >
                      <Link href={"http://linkedIn.com/"+props.linkedIn}><LinkedIn fontSize="large"/></Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography >
                      <Link href={"http://youtube.com/"+props.youtube}><YouTube fontSize="large"/></Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
        <Grid container item xs={12} lg={6} justify="center">
          <Grid container item>
            <Grid container item justify="center" className={classes.formTitle}>
              <Typography variant="h3"  className={classes.header}>
                Get in
                <Typography component="span" variant="h3" className={`${classes.header} ${classes.headerAccent}`}
                            color="primary">
                  Touch
                </Typography>
              </Typography>
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                id="contact-name-input"
                label={<Typography style={{color:"white"}}>Name</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography  className={classes.inputAdornmentContainer}>
                        <AccountCircle/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                id="contact-email-input"
                label={<Typography style={{color:"white"}}>Email</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography  className={classes.inputAdornmentContainer}>
                        <Email/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                id="contact-phone-input"
                label={<Typography style={{color:"white"}}>Phone</Typography>}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                                  className={classes.inputAdornmentContainer}><Phone/></Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item>
              <StyledTextField
                fullWidth
                id="contact-message-input"
                label={<Typography style={{color:"white"}}>Message</Typography>}
                variant="outlined"
                multiline
                rows="4"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography

                        className={classes.inputAdornmentTextBlockContainer}>
                        <Message/>
                      </Typography>
                    </InputAdornment>
                  ),
                  className: classes.formInput
                }}
              />
            </Grid>
            <Grid container item alignItems="center" justify="center">
              <Button color="primary" variant="contained"><Typography  variant="button">Send
                Button</Typography></Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContactUs