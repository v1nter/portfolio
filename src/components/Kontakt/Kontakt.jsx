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
					initial={{ opacity: 0, transition: { duration: 1 } }}
					animate={{ opacity: 1, transition: { duration: 1 } }}
					exit={{ opacity: 0, transition: { duration: 1 } }}
					key={'hireMe'}
				>
					Kontakt
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
