import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import {CollectionContext} from '../contexts/CollectionContext'
import '../styles/Pokemon.css'

const Pokemon = ({location, history}) => {
	const { releaseOrCatch} = useContext(CollectionContext)
	const [pokemon, setPokemon] = useState({})
	const [catched, setCatched] = useState(location.state.catched)

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(location.state.url)
			const json = await response.json()
			setPokemon(json)
		}
		fetchData();
	}, [location.state.url]);

	const imageUrl = pokemon.sprites?.front_default
	const handleClick = () => {
		setCatched(!catched)
		releaseOrCatch(pokemon.name)
	}

	return (
		<div className="Pokemon">
			<div className="Pokemon-back" onClick={() => history.goBack()}>
				Back
			</div>
			<h2 className="Pokemon-name">{pokemon.name}</h2>
			{imageUrl ? <img className="Pokemon-image" src={imageUrl} alt=""/> : "no image"}
			<p className="Pokemon-data">Weight: {pokemon.weight}</p>
			<p className="Pokemon-data">Height: {pokemon.height}</p>
			<p className="Pokemon-data">Not hidden abilities:</p>
			<ul className="Pokemon-abilities">
				{pokemon.abilities?.map(ability => !ability.is_hidden && <li key={ability.ability.name}>{ability.ability.name}</li>)}
			</ul>
			<div className="Pokemon-button" onClick={handleClick}>{catched ? "Release" : "Catch"}</div>
		</div>
	);
};

export default Pokemon;