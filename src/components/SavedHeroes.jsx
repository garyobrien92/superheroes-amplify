import { useQuery } from '@tanstack/react-query'
import { get } from 'aws-amplify/api';

async function getSavedHeroes() {
    try {
        const res = await get({
            apiName: 'superheroes',
            path: '/superheroes'
        }).response


        const data = await res.body.json()
        return data
    } catch (error) {
        console.log('saved heroes', error)
    }
}

export default function SavedSuperHeroes(props) {

    const queryKey = ['savedheroes']
    const query = useQuery({
        queryKey,
        queryFn: getSavedHeroes
    })

    return (
        <div className='mt-4 flex items-center border-t-2 pt-2 flex-col'>
            {!query.data && query.isLoading && (<div>Loading</div>)}


            <h2>Saved Heroes</h2>
            {query.data && !query.isLoading &&
                <div className="w-full flex-1 flex flex-wrap p-4 gap-8 items-center justify-start">
                    {query.data.map((hero) =>
                        <div className="border rounded flex flex-col basis-48" key={hero.id}>
                            <img className="rounded w-auto" src={hero.image.url}/>
                            <span className='border-b-2'>{hero.name}</span>
                            <div className='flex flex-col flex-wrap'>
                                <div className='flex-1 flex gap-2'>
                                    <span>Intelligence</span>
                                    <span>{hero.powerstats.intelligence}</span>
                                </div>
                                <div className='flex-1 flex gap-2'>
                                    <span>Strength</span>
                                    <span>{hero.powerstats.strength}</span>
                                </div>
                                <div className='flex-1 flex gap-2'>
                                    <span>Speed</span>
                                    <span>{hero.powerstats.speed}</span>
                                </div>
                                <div className='flex-1 flex gap-2'>
                                    <span>Durability</span>
                                    <span>{hero.powerstats.durability}</span>
                                </div>
                                <div className='flex-1 flex gap-2'>
                                    <span>Power</span>
                                    <span>{hero.powerstats.power}</span>
                                </div>
                                <div className='flex-1 flex gap-2'>
                                    <span>Combat</span>
                                    <span>{hero.powerstats.combat}</span>
                                </div>
                                
                            </div>
                            <button className="bg-blue-700  py-2 px-4 hover:bg-blue-500 w-full" onClick={() => props.setSelectedHero(hero)}>Edit</button>
                        </div>
                    )
                    }
                </div>
            }
        </div>
    )
}