import { useState } from "react";
import { put } from 'aws-amplify/api';
import { useMutation, useQueryClient } from '@tanstack/react-query'

async function saveHero(hero) {
  const options = {
    body: hero
  }

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

export default function HeroFormModal(props) {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(true)
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

    props.close()
  }

  function updateLocalHero(e) {
    setLocalPowerStats((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) | 0 }))
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <form onSubmit={save} className="flex flex-col">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl  text-black">
                  <b>Edit Hero</b> {props.hero.name}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={props.close}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    X
                  </span>
                </button>
              </div>
              {/*body*/}

              <div className="relative p-6 flex-auto text-black">
                <div className='ml-4 flex pl-2 flex-col'>
                    <div class="mb-3 pt-0 flex-1 flex justify-start items-center gap-4">
                      <span className="flex-1">Intelligence</span>
                      <input 
                        className="flex-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring" 
                        value={localPowerStats.intelligence} 
                        onChange={updateLocalHero} 
                        name="intelligence" 
                      />
                    </div>
             

                    <div class="mb-3 pt-0 flex-1 flex justify-start items-center gap-4">
                    
                    <span className="flex-1">Strength</span>
                    <input 
                     className="flex-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring" 
                    value={localPowerStats.strength} 
                    onChange={updateLocalHero} 
                    name="strength" 
                    />
                  </div>

                  <div class="mb-3 pt-0 flex-1 flex justify-start items-center gap-4">
                    <span className="flex-1">Speed</span>
                    <input 
                    className="flex-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"  
                    value={localPowerStats.speed} 
                    onChange={updateLocalHero} 
                    name="speed" 
                    />
                  </div>

                  <div class="mb-3 pt-0 flex-1 flex justify-start items-center gap-4">
                    <span className="flex-1">Durability</span>
                    <input 
                    className="flex-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"  
                    value={localPowerStats.durability} 
                    onChange={updateLocalHero} 
                    name="durability" 
                    />
                  </div>

                  <div class="mb-3 pt-0 flex-1 flex justify-start items-center gap-4">
                    
                    <span className="flex-1">Power</span>
                    <input 
                    className="flex-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"  
                    value={localPowerStats.power} 
                    onChange={updateLocalHero} 
                    name="power" 
                    />
                  </div>

                  <div class="mb-3 pt-0 flex-1 flex justify-start items-center gap-4">
                    
                    <span className="flex-1">Combat</span>
                    <input 
                    className="flex-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"  
                    value={localPowerStats.combat} 
                    onChange={updateLocalHero} 
                    name="combat" 
                    />
                  </div>
                </div>
              </div>

              {/*footer*/}
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={props.close}
                >
                  Cancel
                </button>
                <button className=" bg-blue-700 hover:bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>

      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}