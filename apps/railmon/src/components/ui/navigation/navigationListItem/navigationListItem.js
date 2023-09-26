import React from 'react';
import { NavLink } from 'react-router-dom';


const NavigationListItem = (props) => (
	<li>
		<NavLink 
			to={ props.link }
			className='dropdown-item text-white'
			onClick={ props.click }>
			<i className={ props.icon + ' fs-4' } />
			{ props.children }
		</NavLink>
	</li>
);

export default NavigationListItem;