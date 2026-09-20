import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
} from 'aws-amplify/auth'

export async function registerUser(email, password) {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
      },
    },
  })
}

export async function verifyUser(email, code) {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  })
}

export async function loginUser(email, password) {
  return await signIn({
    username: email,
    password,
  })
}

export async function logoutUser() {
  return await signOut()
}

export async function getLoggedInUser() {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}