import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/TypesContainer.css'

const TypesContainer = ({types}) => {
	return (
		<div className="TypesContainer">
				{types.map(type => {
					return (
						<Link 
							className="TypesContainer-link"
							key={type.name}
							exact={true}
							to={`/type/${type.name}`}
						>
							{type.name}
						</Link>
			)
				})}
		</div>
	);
};

export default TypesContainer;