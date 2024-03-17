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
        <div className='mt-4 flex justify-start items-center'>
            {!query.data && query.isLoading && (<div>Loading</div>)}

            {query.data && !query.isLoading &&
                <>
                    {query.data.map((hero) => (
                        <div className='flex-1 flex gap-2 items-center justify-between' key={hero.id}>
                            <span>{hero.name}</span>
                            <img className="rounded-lg" src={hero.image.url} width="100px" height="100px" />
                            <button className="bg-blue-700 rounded-full py-2 px-4 hover:bg-blue-500" onClick={() => props.setSelectedHero(hero)}>Edit</button>
                        </div>
                    ))
                    }
                </>
            }
        </div>
    )
}