import React, { useState} from "react";
import EditPet from "./EditPet";
import './index.css'

function PetCard({user, petOwner, petName, petImage, petAge, petBreed, onDeletePet, id, onUpdatePet}) {
     
    const [isEditing, setIsEditing] = useState(false)
    const [updateButton, setUpdateButton] = useState(false)


    function handleDeleteClick(){
        fetch (`http:localhost:9292/pets/${id}`, {
           method: "DELETE"
        })
        onDeletePet(id)

        }

        function handleUpdatePet(updatedPet){
            console.log(updatedPet);
            setIsEditing(false)
            setUpdateButton(false)
            onUpdatePet(updatedPet)
        }

        function  handleUpdateClick(){
           setIsEditing((isEditing)=> !isEditing)
           setUpdateButton((updateButton => !updateButton))
        }

        return (
            <div className="wrapper">
              <div className="card-body">
              
              {isEditing ? (
                <EditPet
                petImage={petImage}
                petName={petName}
                petAge={petAge}
                petBreed={petBreed}
                id={id}
                onUpdatePet={handleUpdatePet}
                />

              ) : (
                <div style={{marginLeft:"25%", marginRight:"auto", marginBottom:"1%"}}>
                    <h2>{petName}</h2>
                    <img style={{width:"20rem"}} src={petImage} alt='loading ...'/>
                    <ul>
                    <li>Age: {petAge}</li>
                    <li>Breed: {petBreed}</li>
                    </ul>
                    

                </div>
              )}
             
             {petOwner=== user.id ? (
                <div className="card-body" style={{marginLeft:"25%", marginRight:"auto", marginBottom:"5%"}}>
                  <button onClick={handleDeleteClick}>Delete pet</button>
                  <button onClick={handleUpdateClick}>{updateButton ? 'Cancel' : 'Update'}</button>
                </div>) : (null)
             } 

            </div>
            </div>


        )
    }
    export default PetCard;
