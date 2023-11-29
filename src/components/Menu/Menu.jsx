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

let override = 0;

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

	// Wechsle die Seite entsprechend dem menu-State
	useEffect(() => {
		// Das Menü nutzt den menu-State, um Seitenwechsel vorzunehmen.
		// Problem: Von außerhalb des Menüs kann man nicht auf den State zugreifen
		//
		// => Das Menü bekommt nicht mit, wenn die Seite über einen internen Link gewechselt wird (wie hireMe auf Home)
		// => Die Ursprungsseite (im Beispiel: Home) kann nicht mehr annavigiert werden, da sich der User laut State noch auf der ursprünglichen Seite befindet
		//
		// Workaround: Löse beim Klicken auf interne Links einen Override aus, der den State manuell auf den korrekten Zustand aktualisiert
		//
		// Schönere Lösung: Entwickle externes Menüitem, das anstelle von <Link> nicht eigenständig die Seite wechselt, so dass hinterher via
		// window.location.pathname der State zurechtgebogen werden muss. Stattdessen sollte das externe Menüitem (genau wie das normale MenuItem) ein Objekt übergeben,
		// mit dem menuDispatch regulär getriggert wird, wodurch erst der Seitenwechsel ausgelöst wird.

		if (!override) {
			setLocation(menu.to);
		} else if (override) {
			const changedMenuItem = menuItems.find(
				(item) => item.to === window.location.pathname
			);

			menuDispatch({ action: changedMenuItem.title, id: changedMenuItem.id });
			override = false;
		}
	}, [menu, override]);

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

export function overrideMenu() {
	override = true;
}

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
