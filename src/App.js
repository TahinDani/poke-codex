import React, {useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import TypesContainer from './components/TypesContainer'
import PokeContainer from './components/PokeContainer'
import Pokemon from './components/Pokemon'
import {CollectionProvider} from './contexts/CollectionContext'
import './App.css';

function App() {
	const [types, setTypes] = useState([])

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("https://pokeapi.co/api/v2/type")
			const json = await response.json()
			const types = json.results.map(type => type)
			setTypes(types)
		}
		fetchData();
	}, []);

	return (
		<div className="App">
			<CollectionProvider>
				<Switch>
					<Route exact path="/" render={() => <TypesContainer types={types}/> }/>
					<Route exact path="/type/:id" render={(routeProps) => <PokeContainer {...routeProps}/>} />
					<Route exact path="/pokemon/:id" render={(routeProps) => <Pokemon {...routeProps}/>} />
					<Route render={()=>"No match"} />
				</Switch>
			</CollectionProvider>
		</div>
	);
}

export default App;
