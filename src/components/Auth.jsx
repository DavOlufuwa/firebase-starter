import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth"
import { useState } from "react"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // getting the already signed in user
  

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword( auth, email, password )      
    } catch (error) {
      console.log(error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      console.log(auth?.currentUser?.email)
    } catch (error) {
      console.error(error)
    }
  }

  const logOut =  async () => {
    try {
      await signOut(auth);
      console.log(auth?.currentUser?.email)
    } catch (error) {
      console.error(error)
    }
  }

  

  return (
    <div className=" flex w-full justify-center items-center gap-6 flex-col">
      {/* adding email and password inputs */}
      <input type="email" name="" id="" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="" id="" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 px-3 py-2 hover:bg-blue-900 hover:text-white" onClick={signIn}>Sign In</button>
      <button className="bg-blue-500 px-3 py-2 hover:bg-blue-900 hover:text-white" onClick={signInWithGoogle}>Sign In with google</button>
      <button className="bg-blue-500 px-3 py-2 hover:bg-blue-900 hover:text-white" onClick={logOut}>Sign Out</button>
    </div>
  )
}

export default Auth