import React, {useEffect, useState} from "react";
import { Route,Routes} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import PetPage from "./PetPage";
import PetForm from "./PetForm";
import NavBar from "./NavBar";
import Comments from "./Rating Comments/Comments";

    

function App (){

  const [petData, setPetData]= useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(false)
  const [allUsers, setAllUsers] = useState([])
 
  useEffect(() => {
    fetch("http://localhost:9292/pets")
    .then((r)=> r.json())
    .then(pets => setPetData(pets))
   }, [])

 useEffect(() => {
  fetch("http://localhost:9292/users")
  .then((r)=> r.json())
  .then(users => setAllUsers(users))
 }, [])

 function handleCreateUser(newUser){
  console.log(newUser)
 }

 function handleUserlogin(userData){
  setUser(userData)
  setLoggedIn(true)
  console.log(userData)
  }

  function handleAddPet(newPetData){
     console.log(user)
     setPetData([...petData,newPetData])
  }

  function handleUpdatePet(updatedPet) {
    console.log(updatedPet)
    const updatedPets = petData.filter(pet => pet.id=== updatedPet.id ? updatedPet : pet)
    setPetData(updatedPets)
  }

  function handleDeletePet(id){
      const updatedPets = petData.filter(pet => pet.id !== id)
      setPetData(updatedPets)
  }

  function handleLogoutClick(){
    setUser(false)
    setLoggedIn(false)
  }

  return (
    <div className="container">
    <h1> Pet App</h1>
    {loggedIn ? (
      <>
      <h2>Welcome back {user.name}!</h2>
      <button onClick={handleLogoutClick}>Logout</button>
        <PetForm
          user={user}
          onAddPet={handleAddPet}
        />

        <PetPage
        user={user}
        pets={petData}
        onDeletePet={handleDeletePet}
        onUpdatePet={handleUpdatePet}
        />
      </>
    ): (
      <>
      <Home />
      <Login 
      onCreateUser={handleCreateUser}
      onHandleLogin={handleUserlogin}
      allUsers={allUsers}
      />
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/Comments" element=
        {<Comments/>}/> 
      </Routes>
    </>
    )}
    </div>
)
}
export default App;