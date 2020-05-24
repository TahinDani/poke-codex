import React, { createContext, useState, useEffect } from 'react';

export const CollectionContext = createContext()

export const CollectionProvider = (props) => {
	const [collection, setCollection] = useState(window.localStorage.getItem("collection")?.split(",") || [])

	const releaseOrCatch = (name) => {
		if (!collection.includes(name)) {
			setCollection([...collection, name])
		} else {
			setCollection(collection.filter(item => item !== name))
		}
	}

	useEffect(() => {
		//console.log(collection)
		window.localStorage.setItem("collection", collection)
	}, [collection])

	return(
		<CollectionContext.Provider value={{collection, releaseOrCatch}}>
			{props.children}
		</CollectionContext.Provider>
	)
	
}