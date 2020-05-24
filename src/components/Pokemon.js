import React, { useState, useEffect } from 'react';

const Pokemon = ({location}) => {
	const [pokemon, setPokemon] = useState({})

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(location.state.url)
			const json = await response.json()
			setPokemon(json)
		}
		fetchData();
	}, [location.state.url]);

	return (
		<div>
			<h2>{pokemon.name}</h2>
		</div>
	);
};

export default Pokemon;