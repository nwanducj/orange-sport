import { auth, firestore, storage } from '@/services/firebase'
import { signInWithPhoneNumber, signOut, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updatePassword, createUserWithEmailAndPassword, } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, getDocs, collection } from "firebase/firestore";


import Cookie from 'js-cookie'
import JWTDecode from 'jwt-decode'

export const state = () => ({
    accessToken: process.server ?
        null : localStorage.getItem('orange_access_token') || null,
    user: null,
    userDto: null,
    authType: ''
})

export const getters = {
    getUserDto: (state) => {
        return state.userDto
    },
    getUser: (state) => {
        return state.user
    },
    getAuthType: (state) => {
        return state.authType
    }
}
export const mutations = {
    SET_USER: (state, account) => {
        state.user = account
    },
    SET_USER_DTO: (state, user) => {
        state.userDto = user
    },
    SET_AUTH_TYPE: (state, authType) => {
        state.authType = authType
    }
}




export const actions = {
    async authenticateUserEmail(vuexContext, authData) {
        let userRecent
        try {
            if (authData.isLogin) {
                await signInWithEmailAndPassword(auth, authData.email, authData.password).then((userCredential) => {
                    // Signed in 
                    userRecent = userCredential.user;
                    console.log(userCredential)
                    console.log(userCredential.user)
                })
            } else {
                await createUserWithEmailAndPassword(auth,
                    authData.email,
                    authData.password
                ).then((userCredential) => {
                    // Signed in 
                    console.log(userCredential)
                    console.log(userCredential.user)
                    userRecent = userCredential.user;
                    sendEmailVerification(auth.currentUser)
                    // ...
                })
            }

            //get JWT from firebase
            console.log(auth.currentUser)
            const token = await auth.currentUser.accessToken
            const { email, uid } = auth.currentUser
            // //console.log(token)

            if (process.browser) {
                // save JWT to the cookie
                Cookie.set('orange_access_token', token)
                localStorage.setItem('orange_access_token', token)
            }
            //save user locally
            vuexContext.commit('SET_USER', { email, uid })
            vuexContext.commit('SET_AUTH_TYPE', 'email')
        } catch (err) {
            //console.log(err)
            throw err
        }
    },
    async resendVerification(vuexContext) {
        await sendEmailVerification(auth.currentUser)

    },
    async changePassword(vuexContext, newPassword) {
        const user = auth.currentUser;

        await updatePassword(user, newPassword).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    },
    async phoneAuth(vuexContext, payload) {
        let confirmResult
        await signInWithPhoneNumber(auth, payload.phoneNumber, payload.recaptchaVerifier)
            .then((confirmationResult) => {
                confirmResult = confirmationResult
                return confirmResult
            })
            .catch((error) => {
                console.log("Sms not sent", error.message)
                return false
            })
        return confirmResult
    },
    async confirmPhoneAuth(vuexContext, { confirmResult, code }) {
        confirmResult
            .confirm(code)
            .then((result) => {
                return result
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(auth)
        console.log(auth.currentUser)
        // const token = await auth.currentUser.accessToken

        vuexContext.commit('SET_AUTH_TYPE', 'phone')
        const { phoneNumber, uid, accessToken } = auth.currentUser
        vuexContext.commit('accessToken', accessToken)
        // //console.log(token)

        if (process.browser) {
            // save JWT to the cookie
            Cookie.set('orange_access_token', accessToken)
            localStorage.setItem('orange_access_token', accessToken)
        }
        //save user locally
        vuexContext.commit('SET_USER', { phoneNumber, uid })
        // ...

    },
    async getInterest(vuexContext) {
        let allList = []
        const interestList = await getDocs(collection(firestore, "interests"));
        interestList.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            allList.push(doc.data().name)
        });
        console.log(allList)
        return allList
    },
    async updateUsername(vuexContext, username) {
        try {
            const user = { ...vuexContext.state.userDto }

            // //console.log('saving user', userData)

            await updateDoc(doc(firestore, "profiles", `${user.uid}`), { username: username });

            user.username = username
            vuexContext.commit('SET_USER_DTO', user)
        } catch (err) {
            //console.log('Error', err)
            throw err
        }
    },
    async changeEmail(vuexContext, email) {
        try {
            const user = { ...vuexContext.state.userDto }

            // //console.log('saving user', userData)
            await updateEmail(auth.currentUser, email).then(() => {
                // Email updated!

                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
            await updateDoc(doc(firestore, "profiles", `${user.uid}`), { email: email });

            user.email = email
            vuexContext.commit('SET_USER_DTO', user)
        } catch (err) {
            //console.log('Error', err)
            throw err
        }
    },
    async forgotPassword(vuexContext, email) {
        await sendPasswordResetEmail(auth, email)
            .then(val => { })
            .catch(err => {
                console.log(err)
            })
    },
    async fetchData(vuexContext) {
        let accessTokenCookie = process.browser ?
            await localStorage.getItem('orange_access_token') :
            null

        if (!accessTokenCookie) {
            return
        }

        const decoded = JWTDecode(accessTokenCookie)
        //console.log("Decoding...");
        //console.log("Decoded", decoded);

        if (!decoded) {
            return
        }
        console.log(decoded)
        vuexContext.commit('SET_USER', {
            uid: decoded.user_id,
            email: decoded.email,
            phoneNumber: decoded.phone_number,
            email_verified: decoded.email_verified,
            sign_in_provider: decoded.firebase.sign_in_provider
        })


        //console.log('fetching user')
        try {
            const userId = vuexContext.state.user.uid
            console.log(userId)

            // const doc = await firestore.doc(`profiles/${userId}`).get()

            const docRef = doc(firestore, "profiles", `${userId}`);
            const docSnap = await getDoc(docRef)
            //console.log('fetching user done')

            if (docSnap.exists()) {
                //console.log("user exists")
                vuexContext.commit('SET_USER_DTO', docSnap.data())

                return false
            }
            //console.log("not exists")
            return true
        } catch (err) {
            //console.log('Error', err)
            throw err
        }
    },
    async saveUserDto(vuexContext, data) {
        try {
            const user = vuexContext.state.user
            let userData = {}

            if (data.uid == null) {
                userData = { ...user, ...data }
            } else {
                userData = { ...data }
            }
            // userData.email = user.email
            // //console.log('saving user', userData)

            await setDoc(doc(firestore, "profiles", `${user.uid}`), userData, { merge: true });

            //save user locally

            vuexContext.commit('SET_USER', { email: data.email, uid: user.uid })
            vuexContext.commit('SET_USER_DTO', data)
        } catch (err) {
            //console.log('Error', err)
            throw err
        }
    },

    async logout(vuexContext) {
        try {
            if (process.browser) {
                Cookie.remove('orange_access_token')
                localStorage.removeItem('orange_access_token')
            }
            //save user locally
            vuexContext.commit('SET_USER', null)
            vuexContext.commit('SET_USER_DTO', null)
            await signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
        } catch (err) {
            //console.log(err)
            throw err
        }
    },
}