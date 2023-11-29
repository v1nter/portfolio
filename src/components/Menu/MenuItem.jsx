import { Link } from 'wouter';
import css from './MenuItem.module.css';
import { AnimatePresence, motion } from 'framer-motion';

//* Stellt ein MenuItem dar *//

const prefix = `// &#10148;`;

export default function MenuItem({ item, menuDispatch }) {
	const animatedLink = (
		<motion.div
			whileHover={{ scale: 1.2, transition: { duration: 0 } }}
			className={css.link}
			dangerouslySetInnerHTML={{ __html: `${prefix} ${item.title}` }}
			// MenuItem benachrichtigt onClick das Menü
			onClick={() => menuDispatch({ action: item.title, id: item.id })}
		></motion.div>
	);

	return <AnimatePresence>{animatedLink}</AnimatePresence>;
}
