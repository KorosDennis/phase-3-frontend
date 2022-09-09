import React, { useState} from 'react';


function PetForm ({onAddPet, user}) {

    const [petName, setPetName] = useState('')
    const [petAge, setPetAge] = useState([0])
    const [petImage, setPetImage] = useState('')
    const [petBreed, setPetBreed] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        alert("pet added successfully")

        fetch('http://localhost:9292/pets' , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: petName,
            age: petAge,
            image: petImage,
            breed: petBreed,
            user_id: user.id
        })
    })
    .then((r)=> r.json())
    .then((newPet)=> {
        onAddPet(newPet)
        setPetName('')
        setPetAge(0)
        setPetImage('')
        setPetBreed('')

    })
}

return(
    <>
       <h2>add pet to the list</h2>
       <form className='add-pet' onSubmit={handleSubmit}>
        <label>
            <br></br>
            pet Image:
            <input
               placeholder='link to image'
               value={petImage}
               onChange={(e)=> setPetImage(e.target.value)}
            />
        </label>
        <br></br>
        <label>
            <br></br>
            Pet age:
            <input
              type='number'
              placeholder='whats the age of the pet?'
              value={petAge}
              onChange={(e)=> setPetAge(e.target.value)}
            />
        </label>
        <br></br>

        <label>
            <br></br>
            Pet name:
            <input
            placeholder='pet name'
            value={petName}
            onChange={(e)=> setPetName(e.target.value)}
            />
         </label>
          <br></br>
         <label>
         <br></br>
              pet Breed:
              
                    <input
                    placeholder={petBreed}
                    value={petBreed}
                    onChange={(e)=>setPetBreed(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                
         <button type="submit">Create Pet</button>
       </form>
    </>
)
}
export default PetForm;

