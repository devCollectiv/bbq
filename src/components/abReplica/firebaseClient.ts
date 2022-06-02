import { initializeApp } from "firebase/app";
// Firebase configuration

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.FIREBASE_ANALYTICS_TRACKING_ID,
}

const app = initializeApp(firebaseConfig)
export default { app }



// class Firebase {
//   auth = undefined
//
//   db = undefined
//
//   storage = undefined
//
//   provider = undefined
//
//   analytics = undefined
//
//   constructor() {
//     /* For some reason without this check the application calls this constructor twice. When initializeApp is called for the second time it throws an error. */
//     if (!firebase.apps.length) {
//       app.initializeApp(firebaseConfig)
//     } else {
//       firebase.app()
//     }
//
//     this.auth = app.auth
//     this.db = app.database ? app.database() : undefined
//     this.storage = app.storage ? app.storage() : undefined
//     // this.provider = new app.auth.FacebookAuthProvider()
//     this.analytics = app.analytics
//   }
//
//   // awLogin = (username?: string) => {
//   //   console.log('awLogin', this.auth().currentUser)
//   //
//   //   try {
//   //     return this.auth()
//   //       .currentUser.getIdToken(/* forceRefresh */ true)
//   //       .then(idToken => awapiClient.login(idToken, username))
//   //       .then(backendUser => {
//   //         // update context
//   //         console.log('User returned from backend into firebase', backendUser)
//   //         return backendUser
//   //       }).catch((e) => {
//   //         console.log('error', e)
//   //       })
//   //
//   //   } catch (error) {
//   //     // Handle Errors here.
//   //     const errorCode = error.code
//   //     const errorMessage = error.message
//   //     // The email of the user's account used.
//   //     const userEmail = error.email
//   //     // The firebase.auth.AuthCredential type that was used.
//   //     const { credential } = error
//   //     // ...
//   //     console.log(
//   //       'awLogin error email credential',
//   //       errorCode,
//   //       errorMessage,
//   //       userEmail,
//   //       credential,
//   //     )
//   //     return undefined
//   //   }
//   //
//   // }
//
//   // *** Auth API ***
//   // /**
//   //  * Logs the user into FACEBOOK and then AW with a popup
//   //  * @returns {Promise<Promise<Response> | void>}
//   //  */
//   // fbLogin = () => {
//   //   this.provider = new this.auth.FacebookAuthProvider()
//   //
//   //   return this.auth().signInWithPopup(this.provider).then(() =>
//   //     this.awLogin(),
//   //   )
//   // }
//
//   // /**
//   //  * Create account with email and password
//   //  * @param email - new account email address
//   //  * @param password - new account password
//   //  * @returns {Promise<firebase.auth.UserCredential>}
//   //  */
//   // doCreateUserWithEmailAndPassword = (email, password) =>
//   //   this.auth()
//   //     .createUserWithEmailAndPassword(email, password)
//   //     .then(authUser => {
//   //       console.log('created wit email and pass', authUser)
//   //     })
//   //     .catch(e => {
//   //       console.log(e)
//   //     })
//
//   // /**
//   //  * Sign into the application with email and password
//   //  * @param email - login email
//   //  * @param password - login password
//   //  * @returns {Promise<firebase.auth.UserCredential>} - credentials of an authenticated user.
//   //  */
//   // doSignInWithEmailAndPassword = (email, password) =>
//   //   this.auth().signInWithEmailAndPassword(email, password)
//   //
//   // /**
//   //  * Signs any firebase user out
//   //  * @returns {Promise<void>}
//   //  */
//   // doSignOut = (userId) => {
//   //   this.analyticsUserLogOut(userId, this.auth().currentUser.providerId)
//   //
//   //   return this.auth().signOut()
//   // }
//
//   // /**
//   //  * Sends a Password reset email to accounts created with email and password
//   //  * @param email
//   //  * @returns {Promise<void>}
//   //  */
//   // doPasswordReset = email => this.auth().sendPasswordResetEmail(email)
//   //
//   // /**
//   //  * updates a users password
//   //  * @param password - password to use
//   //  * @returns {Promise<void>}
//   //  */
//   // doPasswordUpdate = password =>
//   //   this.auth().currentUser.updatePassword(password)
//
//   // // *** User API ***
//   // /**
//   //  * returns the AW user with the uid
//   //  * @param uid - user to look up
//   //  * @returns {firebase.database.Reference} - reference to user in firebase.
//   //  */
//   // user = uid => this.db.ref(`users/${uid}`)
//   //
//   // /**
//   //  * Returns reference AW users collection
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // users = () => this.db.ref('users')
//   //
//   // // *** Ball API ***
//   // /**
//   //  * Returns a reference to the ball with uid
//   //  * @param uid
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // ball = uid => this.db.ref(`balls/${uid}`)
//   //
//   // /**
//   //  * Returns a reference to AW Balls collection
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // balls = () => this.db.ref('balls')
//   //
//   // // *** NewHouses API ***
//   // /**
//   //  * Returns reference to new House request with uid
//   //  * @param uid
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // newHouse = uid => this.db.ref(`newHouses/${uid}`)
//   //
//   // /**
//   //  * Returns a reference to the new House collection
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // newHouses = () => this.db.ref('newHouses')
//   //
//   // // *** Comments API ***
//   // /**
//   //  * Returns a reference to the comment with uid
//   //  * @param uid
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // comment = uid => this.db.ref(`comments/${uid}`)
//   //
//   // /** Returns a reference to the comments collection
//   //  *
//   //  * @returns {firebase.database.Reference}
//   //  */
//   // comments = () => this.db.ref('comments')
//
//   // /**
//   //  * Get a link to an image in Storage
//   //  * @param ballId - ball Id to get the image for
//   //  * @param flyer - url to flyer
//   //  * @returns {Promise<any>}
//   //  */
//   // getImageURL = (ballId, imageStr) => {
//   //   let fileExtension = 'png'
//   //   if (imageStr && imageStr.length === 3) {
//   //     fileExtension = imageStr
//   //   }
//   //
//   //   let gsReference = null
//   //   try {
//   //     gsReference = this.storage.refFromURL(
//   //       `gs://anybodywalking-e68e6.appspot.com/newBallImages/${ballId}.${fileExtension}`,
//   //     )
//   //   } catch (error) {
//   //     console.log('ImageURL: ', error)
//   //   }
//   //
//   //   return gsReference.getDownloadURL()
//   // }
//
//   // /**
//   //  * upload an image for new Balls
//   //  * @param ballId - name of file
//   //  * @param imgFile - file to upload
//   //  * @returns {firebase.storage.UploadTask}
//   //  */
//   // /** TODO: rename to uploadImageFile * */
//   // uploadImage = (ballId, imgFile) => {
//   //   let imagesRef = null
//   //   try {
//   //     imagesRef = this.storage
//   //       .ref()
//   //       .child(
//   //         `newBallImages/${ballId}.${ImageUtils.extractImageExtensionFromFile(imgFile)}`,
//   //       )
//   //   } catch (e) {
//   //     console.log('UploadImageError:', e)
//   //   }
//   //
//   //   return imagesRef.put(imgFile)
//   // }
//
//   // /**
//   //  * upload an image for profile image
//   //  * @param userId - user ID
//   //  * @param imgFile - file to upload
//   //  * @returns {firebase.storage.UploadTask}
//   //  */
//   // uploadProfileImage = (userId, imgFile) => {
//   //   const imagesRef = this.storage
//   //     .ref()
//   //     .child(
//   //       `profileImages/${userId}.${ImageUtils.extractImageExtensionFromFile(imgFile)}`,
//   //     )
//   //
//   //   return imagesRef.put(imgFile)
//   // }
//
//   /**
//    * Get a link to an image in Storage
//    * @param ballId - ball Id to get the image for
//    * @param flyer - url to flyer
//    * @returns {Promise<any>}
//    */
//   // getProfileImageURL = (userId, fileExtension) =>
//   //   this.storage
//   //     .refFromURL(
//   //       `gs://anybodywalking-e68e6.appspot.com/profileImages/${userId}.${fileExtension}`,
//   //     )
//   //     .getDownloadURL()
//
//   /**
//    * Updates an AwUser with new values
//    * @param updatedUser:AwUser - the new user values
//    * @returns {Promise<any>}
//    */
//   // updateAwUser = updatedUser => {
//   //   const userRef = this.user(updatedUser.firebaseUUID)
//   //
//   //   userRef.set(updatedUser)
//   // }
//
//   // // need other events? https://developers.google.com/gtagjs/reference/event
//   // analyticsUserSignUp = (provider: string) => {
//   //   console.log('Firebase Analytics user Signup', provider)
//   //   this.analytics().logEvent('sign_up', {
//   //     method: provider,
//   //   })
//   // }
//   //
//   // analyticsUserLogIn = (userId: string, provider: string) => {
//   //   console.log('Firebase Analytics user Login', provider)
//   //   this.analytics().logEvent('login', {
//   //     method: provider,
//   //     id: userId,
//   //   })
//   // }
//   //
//   // analyticsUserLogOut = (userId: string, provider: string) => {
//   //   console.log('Firebase Analytics user logout', provider)
//   //   this.analytics().logEvent('logout', {
//   //     method: provider,
//   //     id: userId,
//   //   })
//   // }
//   //
//   // analyticsPageView = (pathname: string, search: string, title: string) => {
//   //   console.log('GA pageView ', pathname, search)
//   //
//   //   // eslint-disable-next-line no-unused-expressions
//   //   if (this.analytics) {
//   //     this.analytics().logEvent('page_view', {
//   //       // page_location: "https://example.com/about",
//   //       page_path: pathname + search,
//   //       page_title: title,
//   //     })
//   //   } else {
//   //     console.log('This better be an automated test')
//   //   }
//   // }
//   //
//   // analyticsFavoritedABall = (ballSlug: string) => {
//   //   console.log('GA favorite ball', ballSlug)
//   //
//   //   this.analytics().logEvent('add_favorite_ball', {
//   //     slug: ballSlug,
//   //   })
//   // }
//   //
//   // analyticsUnfavoriteABall = (ballSlug: string) => {
//   //   console.log('GA unfavorite ball', ballSlug)
//   //
//   //   this.analytics().logEvent('remove_favorite_ball', {
//   //     slug: ballSlug,
//   //   })
//   // }
//   //
//   // analyticsViewBall = (ball: SanityBall) => {
//   //   console.log('GA ballView ', ball)
//   //
//   //   this.analytics().logEvent('ball_view', {
//   //     ...ball,
//   //   })
//   // }
// }

// export default Firebase
