import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from 'aws-amplify/api';

async function searchSuperHeroes({queryKey}) {
    const [_, name] = queryKey;
    try {
        const res = await fetch(`https://superhero-api.p.rapidapi.com/search?name=${name}&limit=10`, {
            headers: {
                'X-RapidAPI-Key': '6b4439c66cmsha7681ed4bbbf227p1a75bfjsnac130b8b9082',
                'X-RapidAPI-Host': 'superhero-api.p.rapidapi.com'
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

async function saveHero(hero) {
    const options = {
        body: hero
    }
    try {
      const res = await post({
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

export default function SearchSuperHeroes() {
    const queryClient = useQueryClient()
    const [name, setName] = useState('ironman')
    const queryKey = ['superheroes', name]
    const query = useQuery({ 
        queryKey, 
        queryFn: searchSuperHeroes
    })

    const mutation = useMutation({
        mutationFn: saveHero,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['savedheroes'] })
        },
      })

    return (
        <div className="search-hero">
            <input className="text-black" placeholder="Search hero by name" value={name} onChange={(e) => setName(e.target.value)} />

            {!query.data && query.isLoading && (<div>Loading</div>)}

            {query.data &&  !query.isLoading &&
                <div className="w-full flex-1 flex flex-wrap p-4 gap-4">

                    {query.data.hero.map(({ data: hero }) => (
                        <div key={hero.id} className="border rounded flex flex-col">
                            <img className="rounded" src={hero.image.url} width="200px" height="200px" />
                            <span>{hero.name}</span>
                            <div className="flex-1">
                                <button className=" bg-blue-700 w-full py-2 px-4 hover:bg-blue-500" onClick={() => mutation.mutate(hero)}>
                                    Save
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}