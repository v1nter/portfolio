import { Fragment } from 'react';
import css from './Kontakt.module.css';
import { Helmet } from 'react-helmet-async';

export default function Kontakt() {
	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Hire Me</title>
			</Helmet>
			<div className={css.kontakt}>Kontakt</div>
		</Fragment>
	);
}
