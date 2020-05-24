import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/PokeContainer.css'

const PokeContainer = ({location}) => {
	const [pokemons, setPokemons] = useState([])
	const [filter, setFilter] = useState("")

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(location.state.url)
			const json = await response.json()
			const pokemons = json.pokemon.map(pokemon => pokemon.pokemon).sort((a,b) => a.name < b.name ? -1 : 1)
			setPokemons(pokemons)
		}
		fetchData();
	}, [location.state.url]);

	const onSearchChange = (e) => {
		console.log(e.target.value);
		setFilter(e.target.value)
	}

	return (
		<>
		<div className="search">
			<input type="text" value={filter} onChange={onSearchChange}></input>
		</div>
		<div className="PokeContainer">
				{pokemons.map(pokemon => {
					return (
						<Link 
							className="PokeContainer-link"
							key={pokemon.name}
							exact={true}
							to={{
								pathname: `/pokemon/${pokemon.name}`,
								state: {
									url: pokemon.url
								}
							}}
						>
							{pokemon.name}
						</Link>
			)
				})}
		</div>
		</>
	);
};

export default PokeContainer;