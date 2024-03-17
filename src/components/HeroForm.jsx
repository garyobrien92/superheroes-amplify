import { useState } from "react";
import { put } from 'aws-amplify/api';
import {useMutation, useQueryClient} from '@tanstack/react-query'

async function saveHero(hero) {
    const options = {
        body: hero
    }

    console.log(options)
    try {
      const res = await put({
          apiName: 'superheroes',
          path: '/superheroes',
          options
      }).response
  
  
      const data = await res.body.json()
      return data
  } catch (error) {
      console.log('saved heroes', error)
  }
  }
  
export default function HeroForm(props) {
    const queryClient = useQueryClient()
    const [localPowerStats, setLocalPowerStats] = useState({ ...props.hero.powerstats })

    const mutation = useMutation({
        mutationFn: saveHero,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['savedheroes'] })
        },
      })

    function save(e) {
        e.preventDefault();

        mutation.mutate({ ...props.hero, powerstats: localPowerStats })
    }

    function updateLocalHero(e) {
        setLocalPowerStats((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) | 0 }))
    }

    return (
        <div className='text-black ml-4 flex items-center border-l-2 pl-2 flex-col text-white'>
            <h3>{props.hero.name}</h3>
            <form onSubmit={save} className="flex flex-col">
                <span>
                Intelligence
                <input className="text-black" value={localPowerStats.intelligence} onChange={updateLocalHero} name="intelligence" />
                </span>

                <span>
                Strength
                <input className="text-black" value={localPowerStats.strength} onChange={updateLocalHero} name="strength" />
                </span>

                <span>
                Speed
                <input className="text-black" value={localPowerStats.speed } onChange={updateLocalHero} name="speed" />
                </span>

                <span>
                Durability
                <input className="text-black" value={localPowerStats.durability} onChange={updateLocalHero} name="durability" />
                </span>

                <span>
                Power
                <input className="text-black" value={localPowerStats.power} onChange={updateLocalHero} name="power" />
                </span>

                <span>
                Combat
                <input className="text-black" value={localPowerStats.combat} onChange={updateLocalHero} name="combat" />
                </span>

                <button className=" bg-blue-700 rounded-full py-2 px-4 hover:bg-blue-500 mt-4" type="submit">Save</button>
            </form>            
        </div>
    )
}