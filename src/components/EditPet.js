import React, { useState }from "react";

function EditPet({petImage, petName, petAge, petBreed, id , onUpdatePet}){

    const [newImage, setNewImage] = useState('')
    const [newName, setNewName] = useState('')
    const [newAge, setNewAge] = useState(0)
    const [newBreed, setNewBreed] = useState('')


    function handleUpdateSubmit(e) {
        e.preventDefault()
      
        console.log({"image":newImage, "name":newName, "age":newAge})
          fetch (`http://localhost:9292/pets/${id}` , {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "image" : newImage ==="" ? petImage : newImage,
                "name" : newName ==="" ? petName : newName,
                "age" : newAge === 0 ? petAge : newAge,
                "breed": newBreed=== "" ? petBreed : newBreed
            }), 
          })
          .then((r)=> r.json())
             .then((updatedPet)=> onUpdatePet(updatedPet))
    }

    return (
        <div className="edit-form">
          <img style={{marginLeft:"25%", marginRight:"auto", marginBottom:"1%"}} src={petImage} alt={petName}></img>
        <form onSubmit={handleUpdateSubmit} style={{marginLeft:"25%", marginRight:"auto", marginBottom:"1%"}}>
            <label>
                    New pet Image:
                    <input
                        placeholder={petImage}
                        value={newImage}
                        onChange={(e)=>setNewImage(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    New pet Name:
                    <input
                    placeholder={petName}
                    value={newName}
                    onChange={(e)=>setNewName(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                     pet Breed:
                    <input
                    placeholder={petBreed}
                    value={newBreed}
                    onChange={(e)=>setNewBreed(e.target.value)}
                    />
                </label>
                <br></br>
                <label>

                    pet Age:
                    <input
                     type="number"
                     placeholder={petAge}
                     value={newAge}
                     onChange={(e)=>setNewAge(e.target.value)}
                    />
                </label>
                <br></br>
                <button type="submit" value= "update">Update pet</button>

          </form>      
        </div>
    )      
}
export default EditPet;