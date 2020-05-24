import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import {CollectionContext} from '../contexts/CollectionContext'
import '../styles/PokeContainer.css'

const PokeContainer = ({location, history}) => {
	const {collection} = useContext(CollectionContext)
	const [pokemons, setPokemons] = useState([])
	const [filtered, setFiltered] = useState([])
	const [filter, setFilter] = useState("")
	const [catchedOnly, setCatchedOnly] = useState(false)

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(location.state.url)
			const json = await response.json()
			const pokemons = json.pokemon.map(pokemon => ({ ...pokemon.pokemon, catched: collection.includes(pokemon.pokemon.name)})).sort((a,b) => a.name < b.name ? -1 : 1)
			setPokemons(pokemons)
			setFiltered(pokemons)
		}
		fetchData();
	}, [collection, location.state.url]);

	useEffect(()=>{
		const results = filtered.filter(pokemon => pokemon.name.includes(filter.toLowerCase()))
		setPokemons(results)
	}, [filter, filtered])

	const onSearchChange = (e) => {
		setFilter(e.target.value)
	}

	const changeDisplay = () => {
		setCatchedOnly(!catchedOnly)
	}

	return (
		<div className="PokeContainer">
			<div className="PokeContainer-back" onClick={() => history.goBack()}>Back</div>
			<div className="PokeContainer-search">
				<input type="text" value={filter} onChange={onSearchChange}></input>
			</div>
			<div className="PokeContainer-show_catched">
				<input type="checkbox" id="showCatched" name="showCatched" value={catchedOnly} onChange={changeDisplay}></input>
				<label htmlFor="showCatched">List only catched pokemons</label>
			</div>
			<div className="PokeContainer-cards">
				{pokemons.map(pokemon => {
					if (catchedOnly && !pokemon.catched) {
						return null
					} else {
						return (
							<Link 
								className={`PokeContainer-link ${pokemon.catched && "catched"}`}
								key={pokemon.name}
								exact="true"
								to={{
									pathname: `/pokemon/${pokemon.name}`,
									state: {
										url: pokemon.url,
										catched: pokemon.catched
									}
								}}
							>
								{pokemon.name}
							</Link>
						)}
				})}
			</div>
		</div>
	);
};

export default PokeContainer;