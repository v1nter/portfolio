import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import css from './ColorPicker.module.css';
import Popover from '../Popover/Popover';
import { AnimatePresence, motion } from 'framer-motion';

// Prioritäten:
// 1. Animiertes Burgermenü
// 2. Kontaktformular
// 3. Colorpicker fertige configs
// 4. Landing Page
// 5. TechStack
// 6. Particle Cloud: https://www.youtube.com/watch?v=F20SxgG5MlM

// Ideen:
// 1. Slidereinstellungen via URL-Parameter teilbar machen
// 2. Links eine Auswahl an Default-Konfigurationen anzeigen und durch Klicks auswählbar machen. Die Defaults sollten schon einen Gradienten anzeigen
// 3. Beim Klick auf eine Kachel den RGB-Wert in Zwischenablage speichern, dabei Messagebox-Einblenden (geschmeidig animiert!!!) (css: popover)
// 4. 52 Kacheln gleichmäßig auf ein Raster verteilen (4*13?)
// 5. Slider und Tiles in eigene Komponenten auslagern

// Weitere Elemente
// 01. Burgermenü vertikal selbstprogrammieren
// 02. Slider mit Kacheln als Menü horizontal
// 03. Demoseite: Deutschlandkarte/API mit Hover und Informationen über Bundesländer (https://www.youtube.com/watch?v=z6PzPTxfgZM)
// 04. Particle Cloud (Startseite als Hintergrund?)
// 05. Gallerie mit eigenen Fotos
// 06. Würfelanimation beim Wechseln der Seite (page transition https://www.youtube.com/watch?v=S4HYwsBRpRs)
// 07. Navigation blurrt beim scrollen über den Content
// 08. Quellcode anzeigen
// 09. Startseite [Enter]
// 10. Hire me
// 11. Responsive Design
// 12. Demoseite: Space Invaders
// 13. Demoseite: Überlappende, schräg stehende Kacheln zum durchsliden mit "Aufstell"-Animation beim Hovern
// 14. Demoseite: Animation Siebdruck/4-Farb-Druck/CMYK-Separation
// 15. Demoseite: Blog/Artikelseite in verschiedenen Styles, umschaltbar durch Klicken oder Scrollen, mit Übergangsanimation (1. Style: passend zum Rest der Seite)
// 16. Demoseite: Alternative Galerie: Wabenstruktur / Hexagone
//     ODER Spiel: Undurchsichtige Wabenstruktur über Foto, bei Klick => Wabe wird hochgeschnippst, dreht sich, wird durchsichtig und enthüllt Teil des Fotos

const startFormula = [
	{ color: 'r', formula: -1 },
	{ color: 'g', formula: 1 },
	{ color: 'b', formula: 1 },
];

const startColors = [
	{ color: 'r', value: 255 },
	{ color: 'g', value: 0 },
	{ color: 'b', value: 0 },
];

export default function ColorPicker() {
	const [formula, setFormula] = useState(startFormula);
	const [colors, setColors] = useState(startColors);
	const [popover, setPopover] = useState([]);

	// Erzeuge die Tiles
	const tiles = getTiles(colors, formula);

	// Lauscht an popover und blendet das Popover nach einer Zeit wieder aus
	useEffect(() => {
		// Da useEffect an popover lauscht aber auch popover ändert, würde eine
		// Endloschleife entstehen, wenn man nicht als Abbruchbedingung festlegt,
		// dass popover.length > 0 ist
		// => Sobald das Array leer ist, wird popover nicht mehr geändert
		// => useEffect triggert sich nicht mehr selbst
		if (popover.length > 0) {
			const timer = setTimeout(() => {
				console.log('Discarded');
				const discardFirstElement = popover.slice(1);
				setPopover(discardFirstElement);
			}, 3000);

			// Aufräumfunktion
			return () => clearTimeout(timer);
		}
	}, [popover]);

	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Color Picker</title>
			</Helmet>

			{/* Trick: .color-control-wrapper ist leicht größer als .color-control (padding)
				Dadurch bleibt ein kleiner Rand übrig, der als Gradient durchscheint
				Der Gradient startet mit der ersten Tile und endet mit der letzten => Zwischenwerte werden berechnet */}
			{/* <AnimatePresence> */}
			<motion.div
				initial={{ opacity: 0, transition: { duration: 1 } }}
				animate={{ opacity: 1, transition: { duration: 1 } }}
				exit={{ opacity: 0, transition: { duration: 1 } }}
				key={'ColorPicker'}
			>
				<div
					className={css.colorControlWrapper}
					style={{
						'--gradient-starting-color': `${
							tiles[0]
								? `rgb(${tiles[0].r},${tiles[0].g},${tiles[0].b}`
								: 'rgb(0,0,0) '
						})`,
						'--gradient-ending-color': `${
							tiles[51]
								? `rgb(${tiles[51].r},${tiles[51].g},${tiles[51].b}`
								: 'rgb(0,0,0)'
						})`,
					}}
				>
					{/* Slider beeinflussen die States für r, g und b
				Bei einer Änderung wird der State aktualisiert und dadurch
				useEffect getriggert, welches die Kachelfarben neu berechnet */}
					<div className={css.colorControl}>
						{colors.map((obj) => (
							<>
								<label
									key={obj.color + '-control'}
									htmlFor={`range-${obj.color}`}
								>
									{obj.color}
								</label>
								<input
									className={css.colorSlider}
									type="range"
									id={`range-${obj.color}`}
									min="0"
									max="255"
									step="5"
									value={obj.value}
									key={obj.color + '-slider'}
									onChange={(e) =>
										setColors(
											colors.map((col) =>
												col.color === obj.color
													? {
															color: col.color,
															value: parseInt(e.target.value),
													  }
													: { color: col.color, value: col.value }
											)
										)
									}
								/>
							</>
						))}

						<button
							className={css.colorButton}
							value={formula.find(({ color }) => color === 'r').color}
							key={'r'}
							onClick={(e) =>
								changeFormula(e.target.value, formula, setFormula)
							}
						>
							r {+formula.find(({ color }) => color === 'r').formula}
						</button>

						<button
							className={css.colorButton}
							value={formula.find(({ color }) => color === 'g').color}
							key={'g'}
							onClick={(e) =>
								changeFormula(e.target.value, formula, setFormula)
							}
						>
							g {+formula.find(({ color }) => color === 'g').formula}
						</button>

						<button
							className={css.colorButton}
							value={formula.find(({ color }) => color === 'b').color}
							key={'b'}
							onClick={(e) =>
								changeFormula(e.target.value, formula, setFormula)
							}
						>
							b {+formula.find(({ color }) => color === 'b').formula}
						</button>
					</div>
				</div>

				{/* Erzeugt mit .map() eine Schleife über das Tiles Array. 
			Das Array enthält Objekte mit jeweils einer Wertekombination für r, g, b, 
			Mit jedem Objekt wird ein Div erzeugt, dass die entsprechende rgb-Hintergrundfarbe besitzt */}
				<div className={css.colorBox}>
					{tiles.map((tile) => (
						<div
							style={{
								'--tile-color': `rgb(${tile.r},${tile.g},${tile.b})`,
							}}
							className={css.tile}
							key={tile.id}
							onClick={() => {
								setPopover((prevMsg) => [...prevMsg, tile]);
								copyToClipboard(tile.r, tile.g, tile.b);
							}}
						>
							{tile.r} <br /> {tile.g} <br /> {tile.b}
						</div>
					))}
				</div>

				{/* Zeige das Popover Fenster, wenn eine Tile geklickt wird */}
				<AnimatePresence>
					{popover.map((msg) => (
						<Popover
							colors={msg}
							amount={popover.length}
							key={Math.random(msg.id)}
						/>
					))}
				</AnimatePresence>
			</motion.div>
			{/* </AnimatePresence> */}
		</Fragment>
	);
}

function changeFormula(btn, formula, setFormula) {
	// Ändert die Formel für die Farbberechnung von r, g, b

	switch (formula.find(({ color }) => color === btn).formula) {
		// Switch: Wie lautet die aktuelle Formel (-1, 0, +1) von dem Button (= Farbe), der geklickt wurde?
		case -1:
			// Gehe mit .map() durch alle Objekte obj in formula
			// Wenn die Property color: eines Objekts dem geklickten Button entspricht, wird die Formel ausgetauscht
			// Wenn die Property color: eines Objektes NICHt dem geklickten Button entspricht, wird die Formel beibehalten
			// Mit dem neuen Array aus .map() wird der State neu geschrieben
			setFormula(
				formula.map((obj) =>
					obj.color === btn
						? { color: obj.color, formula: 0 }
						: { color: obj.color, formula: obj.formula }
				)
			);
			break;
		case 0:
			setFormula(
				formula.map((obj) =>
					obj.color === btn
						? { color: obj.color, formula: 1 }
						: { color: obj.color, formula: obj.formula }
				)
			);
			break;
		case 1:
			setFormula(
				formula.map((obj) =>
					obj.color === btn
						? { color: obj.color, formula: -1 }
						: { color: obj.color, formula: obj.formula }
				)
			);
			break;
	}
}

function copyToClipboard(r, g, b) {
	navigator.clipboard.writeText(`rgb(${r},${g},${b})`);
}

function getTiles(colors, formula) {
	// Lauscht an colors (= Slider) und an formula (= Buttons)
	// Wird ein Slider betätigt, werden iterativ die Farben aller Tiles
	// berechnet, ausgehend vom Startwert, den der Slider vorgibt
	//
	// Für jede Tile wird ein Objekt erzeugt, dass die Werte für die Farbkombination enthält
	// Alle Tile-Objekte werden im tiles-Array gespeichert, der zurückgegeben wird
	//
	// Wird die Formel über die Buttons geändert, wird ebenfalls ein re-rendering getriggert (weil die Buttons einen State haben) und
	// die Tile-Objekte neu berechnet

	const tiles = [];
	const maxTiles = 51;

	// Lese die Formeln für r, g, b, die über die Buttons eingestellt werden
	const rFormula = formula.find(({ color }) => color === 'r').formula;
	const gFormula = formula.find(({ color }) => color === 'g').formula;
	const bFormula = formula.find(({ color }) => color === 'b').formula;

	// Lese die Werte für r, g, b, die über die Slider eingestellt werden
	const r = colors.find(({ color }) => color === 'r').value;
	const g = colors.find(({ color }) => color === 'g').value;
	const b = colors.find(({ color }) => color === 'b').value;

	for (let i = 0; i <= maxTiles; i = i + 1) {
		// Erzeuge pro Schleifendurchlauf eine neue Tile t
		const t = {};
		t.id = i + 1;

		// Lege die Farbe von t fest.
		// Die Farbe jedes weiteren t ändert sich graduell zu seinem Vorgänger
		// Wenn rformula = 0: r bleibt konstant
		// Wenn rformula = 1: r steigt in Schritten +5
		// Wenn rForumla = -1: r sinkt in Schritten - 5

		t.r = r + i * 5 * rFormula;
		t.g = g + i * 5 * gFormula;
		t.b = b + i * 5 * bFormula;

		// Falls ein Farbcode > 255 oder < 0 ist, setze ihn zurück auf 255 bzw. 0
		t.r >= 255 ? (t.r = 255) : t.r < 0 ? (t.r = 0) : t.r;
		t.g >= 255 ? (t.g = 255) : t.g < 0 ? (t.g = 0) : t.g;
		t.b >= 255 ? (t.b = 255) : t.b < 0 ? (t.b = 0) : t.b;

		// Füge die neu erzeugte Tile t dem Array hinzu
		tiles.push(t);
	}

	return tiles;
}
