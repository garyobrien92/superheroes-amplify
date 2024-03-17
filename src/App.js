import './App.css';
import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';

import { get } from 'aws-amplify/api';

Amplify.configure(config)

console.log(Amplify.getConfig())

function App() {

  const [heroes, setHeroes] =  useState([])

  useEffect(() => {
    get({
      apiName: 'superheroes', 
      path:'/superheroes'
    })
    .response
    .then((res) => res.body.json())
    .then(res => setHeroes(() =>res)).catch(err => {
      console.log(err)
    })
  }, [])
  
  return (
        <div className="App">
          <header className="App-header">
            Hello
            <p>
            Hey 
          </p>

          {
            heroes.map((hero) => (
              <div key={hero.id}>
                { hero.name }
                <img src={hero.image.url} width="50px" height="50px" />
              </div>
            ))
          }
          </header>
        </div>
      
  );
}

export default App;
