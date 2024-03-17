import { useState } from "react"
import { useQuery } from '@tanstack/react-query'

async function searchSuperHeroes() {
    try {
        const res = await fetch('https://superheroapi.com/api/accesstokenhere/search/name')
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export default function SearchSuperHeroes() {
    const [name, setName] = useState('')
    const queryKey = ['superheroes', name]
    const query = useQuery({ 
        queryKey, 
        queryFn: searchSuperHeroes
    })

    return (
        <div className="search-hero">
            <input className="text-black" placeholder="Search hero by name" value={name} onChange={(e) => setName(e.target.value)} />

            {!query.data && query.isLoading && (<div>Loading</div>)}

            {query.data &&  !query.isLoading &&
                <div>
                    Results Count {query.data.length}
                </div>
            }
        </div>
    )
}