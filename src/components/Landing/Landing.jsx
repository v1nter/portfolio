import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';
import css from './Landing.module.css';
import { Link, Route } from 'wouter';
import Wrapper from '../Wrapper/Wrapper';

export default function Landing() {
	return (
		<Fragment>
			<AnimatePresence>
				<motion.div className={css.landing}>
					<Link to={'/'}>[Enter]</Link>
					<Route component={Wrapper} />
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
