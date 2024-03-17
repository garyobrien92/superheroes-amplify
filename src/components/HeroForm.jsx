import { useState } from "react";
import { put } from 'aws-amplify/api';
import {useMutation, useQueryClient} from '@tanstack/react-query'

async function saveHero(hero) {
    try {
      const res = await put({
          apiName: 'superheroes',
          path: `/superheroes/${hero.id}`,
          body: {
            ...hero
          }
      }).response
  
  
      const data = await res.body.json()
      return data
  } catch (error) {
      console.log('saved heroes', error)
  }
  }
  

  
export default function HeroForm(props) {
    const queryClient = useQueryClient()
    const [localHero, setLocalHero] = useState({ ...props.hero })

    const mutation = useMutation({
        mutationFn: saveHero,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['savedheroes'] })
        },
      })

    function save(e) {
        e.preventDefault();

        mutation.mutate(localHero)
    }

    function updateLocalHero(e) {
        setLocalHero((prev) => ({ ...prev, name: e.target.value }))
    }

    return (
        <div className="mt-4">
            {localHero.id}
            <form onSubmit={save}>
                Name: <input value={localHero.name} onChange={updateLocalHero} />

                <button className="bg-blue-700 rounded-full py-2 px-4 hover:bg-blue-500" type="submit">Save</button>
            </form>            
        </div>
    )
}