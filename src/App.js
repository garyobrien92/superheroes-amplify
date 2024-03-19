import './App.css';
import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';


import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import SearchSuperHeroes from './components/SearchSuperHeroes'
import SavedSuperHeroes from './components/SavedHeroes';
import HeroFormModal from './components/HeroFormModal';

Amplify.configure(config)

// Create a client
const queryClient = new QueryClient()

function App() {
  const [selectedHero, setSelectedHero] = useState(null)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className='bg'></div>
        <header className="App-header">
          <h1>Super Heroes</h1>
        </header>

        <div className='flex-1 flex'>
          <div className='flex-0 flex gap-8 flex-col'>
            <SearchSuperHeroes />

            <SavedSuperHeroes setSelectedHero={setSelectedHero} />
          </div>


          {
            selectedHero && selectedHero.id &&
            <HeroFormModal key={selectedHero.id} hero={selectedHero} close={() => setSelectedHero(null)} />
          }
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
