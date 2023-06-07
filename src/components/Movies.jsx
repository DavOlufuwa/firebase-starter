import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { auth, db, storage } from "../config/firebase"

// Getting the created movies from Firebase;

const Movies = () => {

  const [movieList, setMovieList] = useState([])

  // refernce to the movies collection
  const moviesCollectionRef = collection(db, "movies")
 
  // states for the new movie informations
  const [newTitle, setNewTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(2000)
  const [newGenre, setNewGenre] = useState("")

  // states for the update movie title informations
  const [updateTitle, setUpdateTitle] = useState("")

  // state for the file uploads state
  const [fileUpload, setFileUpload] = useState(null)


  // function to create a new movie
  const submitMovie = async () => {

    try {
      await addDoc(moviesCollectionRef, {
        title: newTitle,
        releaseDate: newReleaseDate,
        genre: newGenre,
        // tracking the creatorId
        creatorId: auth?.currentUser?.uid, 
      })
      enqueueSnackbar("New movie created", { variant: "success" , autoHideDuration: 1000 })      
    } catch (error) {
      // toast with error message
      enqueueSnackbar("There was an error, please check if you're logged in and try again", { variant: "error" , autoHideDuration: 5000 })
    }
  }

  // function to delete a movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
    enqueueSnackbar("Movie deleted", { variant: "success" , autoHideDuration: 1000 })
  }

  // function to upload file into the firebase storage
  const uploadFile = async () => {
    if(!fileUpload) return;
    try {
      const fileRef = ref(storage, `${fileUpload.name}`)
      await uploadBytes(fileRef, fileUpload)
      enqueueSnackbar("File uploaded Successfully", { variant: "success" , autoHideDuration: 1000 })
    } catch (error) {
      enqueueSnackbar("There was an error uploading the image", { variant: "error" , autoHideDuration: 5000 })
    }
  }




  // function to update the movie title
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { title: updateTitle })
    enqueueSnackbar("Movie title updated", { variant: "success" , autoHideDuration: 1000 })
  }



  // function to get movie list
  useEffect(() => {
    const getMovieList = async () => {
      //READ DATA FROM FIRE STORE
      try {
        const data = await getDocs(moviesCollectionRef) 

        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setMovieList(filteredData)

      } catch (error) {
        console.error(error)
      }
    };
    getMovieList()
  }, [moviesCollectionRef])

  return (
    <div className="text-center mt-3">
      <h1 className="font-bold text-2xl">Movies</h1>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
              <p>Title: {movie.title}</p>
              <p>Release Date: {movie.releaseDate}</p>
              <p>Genre: {movie.genre}</p>

              {/* input and button to update the title */}
              <input type="text" placeholder="New Title" onChange={(e) => setUpdateTitle(e.target.value)}/>  
              <button className="bg-green-300 px-3 py-2 hover:bg-green-900 hover:text-white"
              onClick={() => updateMovieTitle(movie.id)}>Update Title</button>

              <button className="bg-pink-300 px-3 py-2 hover:bg-pink-900 hover:text-white"
              onClick={() => deleteMovie(movie.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-center">CREATE NEW MOVIE</h2>
        <div className="flex flex-col items-center justify-center gap-4">
          <input 
            type="text" 
            placeholder="Title" 
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="number" 
            placeholder="Release Date" 
            onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          />
          <input 
            type="text" 
            placeholder="Genre" 
            onChange={(e) => setNewGenre(e.target.value)}
          />
          <button 
            className="bg-blue-500 px-3 py-2 hover:bg-blue-900 hover:text-white" 
            onClick={submitMovie}
            >Create new Movie</button>
        </div>

        <div>
          {/* form to upload files */}
          <h2 className="text-center">UPLOAD FILES</h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
            <button className="bg-purple-500 px-3 py-2 hover:bg-purple-900 hover:text-white" onClick={uploadFile}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies