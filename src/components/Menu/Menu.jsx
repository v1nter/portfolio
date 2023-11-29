import { useReducer } from 'react';
import css from './Menu.module.css';
import MenuItem from './MenuItem';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

const menuItems = [
	{ id: 1, title: 'home', to: '/', ref: 0 },
	{ id: 2, title: 'demo', to: '/ColorPicker', ref: 0 },
	{ id: 5, title: 'hireMe', to: '/hire-me', ref: 0 },
	{ id: 4, title: 'colorPicker', to: '/', ref: 2 },
	// { id: 3, title: 'techStack', to: '/', ref: 0 },
];

// let overrideItem;

const startMenu = menuItems.find((item) => item.id === 1);

// Das Menü besteht aus drei Komponenten:
// 1: Menu - Enthält die Logik.
// 2: MenuItem - Stellt die oberste Ebene des Menüs dar
// 3. SubMenuItem - Stellt ggf. vorhandene Untermenüpunkte dar

// Ablauf: 	Ein (Unter-)Menüitem sendet beim Klick via menuDispatch eine Nachricht an das Menu => menuReduce
// 			In menuReduce wird der neue menu-state gesetzt, d.h. das angeklickte Menuitem gespeichert
// 			In der Hauptfunktion wird mit dem setLocation-Hook von wouter zur neuen Seite navigiert

export default function menu() {
	const [menu, menuDispatch] = useReducer(menuReducer, startMenu);
	const [, setLocation] = useLocation();

	// useEffect(() => {
	// 	console.log(overrideItem);
	// }, [overrideItem]);

	// Wechsle die Seite entsprechend dem menu-State
	// changeLocation lagert den useLocation-Hook aus, um Seitenwechsel auch außerhalb des Menüs zu ermöglichen
	setLocation(menu.to);

	return (
		// Darstellung der Hauptebene des Menüs: Zeige nur die Menüeinträge,
		// die kein anderes Item referenzieren (=> ref: <=0)
		<ul className={css.menu}>
			{menuItems
				.filter((item) => item.ref <= 0)
				.map((item) => (
					<MenuItem key={item.id} item={item} menuDispatch={menuDispatch} />
				))}
		</ul>
	);
}

// export function menuOverride(item) {
// 	const x = [item];
// 	overrideItem = x.map((item) => item);
// }

function menuReducer(menu, message) {
	// Beim Klick auf ein MenuItem kommt hier eine Nachricht an

	const oldMenu = menu;
	const item = menuItems.find((item) => item.id === message.id);

	// Wenn item.ref === 0 ist, wurde ein Hauptmenüeintrag geklickt, der eine neue Seite aufruft
	if (item.ref >= 0) {
		return item;
	}
	// Wenn item.ref > 0, wurde ein Submenüeintrag geklickt
	else if (item.ref > 0) {
	}
	// Wenn item.ref -1, wurde eine Hauptmenüeintrag geklickt, der lediglich zu einem Submenü führt
	// => Es passiert nichts.
	else if (item.ref === -1) {
		return oldMenu;
	}
}
