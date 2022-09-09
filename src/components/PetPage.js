import React from 'react';
import PetCard from './PetCard';

function Petpage ({
    pets,
    onDeletePet,
    onUpdatePet,
    user

}) {

    return(
        <>
          <div>
            <ul>
                {pets.map((pet)=>{
                    return(
                        <PetCard
                        user ={user}
                        key={pet.id}
                        id={pet.id}
                        petName={pet.name}
                        petImage={pet.image}
                        petAge={pet.age}
                        petBreed={pet.breed}
                        petOwner={pet.user_id}
                        onDeletePet={onDeletePet}
                        onUpdatePet={onUpdatePet}
                        />

                    )
                })}
            </ul>
          </div>
        </>
    )
}
export default Petpage;
