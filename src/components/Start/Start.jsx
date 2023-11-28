import { Fragment } from 'react';
import css from './Start.module.css';
import { Helmet } from 'react-helmet-async';

export default function Start() {
	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Start</title>
			</Helmet>
			<div className={css.start}>
				<div className={css.box}></div>
			</div>
		</Fragment>
	);
}
