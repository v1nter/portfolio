import css from './Popover.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function Popover({ colors, amount }) {
	const r = colors.r;
	const g = colors.g;
	const b = colors.b;

	console.log(amount);

	return (
		<motion.div
			className={css.popOverContent}
			initial={{ opacity: 0, y: 200, translateX: '-50%' }}
			animate={{
				opacity: 1,
				y: 0,
				translateY: '-50%',
				translateX: '-50%',
			}}
			exit={{ opacity: 0, y: -200 }}
		>
			Farbe {r} {g} {b} in Zwischenablage kopiert
		</motion.div>
	);
}
