import css from './MenuItem.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';
import SubMenuItem from './SubMenuItem';
import { useState } from 'react';

//* Stellt ein MenuItem dar *//

const prefix = `//&nbsp;&#10148;&nbsp;`;

// Animation für das Einblenden des Submenü

export default function MenuItem({ item, menuDispatch, allItems }) {
	// State zum Rendern der Submenuitems
	const [showSubMenu, setShowSubMenu] = useState(false);

	const subItems = allItems.filter((subItem) => subItem.ref === item.id);

	// Konfiguration des MenuItems
	const animatedLink = (
		<motion.div
			whileHover={{ scale: 1.2, transition: { duration: 0 } }}
			className={css.link}
			dangerouslySetInnerHTML={{ __html: `${prefix}${item.title}` }}
			// MenuItem benachrichtigt onClick das Menü
			onClick={() => menuDispatch({ action: item.title, id: item.id })}
		></motion.div>
	);

	return (
		<AnimatePresence>
			<Fragment>
				<div
					className={css.menuEntry}
					onMouseEnter={() => setShowSubMenu(true)}
					onMouseLeave={() => setShowSubMenu(false)}
				>
					{/* Darstellung des MenuItems  */}
					{animatedLink}
					{/* Darstellung der SubMenuItems */}
					{/* Suche alle Items, deren ref === der ID des Hauptitems entspricht und stelle sie unter dem Item dar*/}
					{subItems.length > 0 && showSubMenu && (
						<div className={css.subMenu} onClick={() => setShowSubMenu(false)}>
							{subItems.map((subItem) => (
								<motion.div
									className={css.subMenuItem}
									initial={{ opacity: 0, transition: { duration: 0.3 } }}
									animate={{ opacity: 1, transition: { duration: 0.3 } }}
									exit={{ opacity: 0, transition: { duration: 0.3 } }}
								>
									<SubMenuItem
										key={subItem.id}
										item={subItem}
										menuDispatch={menuDispatch}
									/>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</Fragment>
		</AnimatePresence>
	);
}
