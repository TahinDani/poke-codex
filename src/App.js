import React, {useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import TypeContainer from './components/TypesContainer'
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
			<Switch>
				<Route exact path="/" render={(routeProps) => <TypeContainer types={types}/> }/>
				<Route exact path='/type/:id' render={()=>"This is a type"} />
			</Switch>
		</div>
	);
}

export default App;
