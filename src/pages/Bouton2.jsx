import React from 'react'
import { useAtom } from 'jotai';
import { authAtom } from '../components/atoms'
import { API_BASE_URL } from "../../config";


const Bouton2 = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  console.log(`Bearer ${authState.token}`)

  const handleButton = async (e) => {

    try {
      const response = await fetch(`${API_BASE_URL}/member-data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authState.token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response.ok);
      } else {
        console.error('Une erreur s\'est produite lors de la création de la propriété :', error);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };


  return (
    <div>
      <button onClick={handleButton}>CLIQUE ICI</button>
    </div>
  )
}

export default Bouton2