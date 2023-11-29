import { Fragment } from 'react';
import css from './Kontakt.module.css';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

export default function Kontakt() {
	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Hire Me</title>
			</Helmet>
			<AnimatePresence>
				<motion.div
					className={css.kontakt}
					initial={{ y: 200, opacity: 0, transition: { duration: 0.5 } }}
					animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
					exit={{ y: -200, opacity: 0, transition: { duration: 0.5 } }}
					key={'hireMe'}
				>
					Kontakt
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
