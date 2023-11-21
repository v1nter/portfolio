import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

// Ideen:
// 1. Slidereinstellungen via URL-Parameter teilbar machen
// 2. Links eine Auswahl an Default-Konfigurationen anzeigen und durch Klicks auswählbar machen
// 3. Beim Klick auf eine Kachel den RGB-Wert in Zwischenablage speichern, dabei Messagebox-Einblenden (geschmeidig animiert!!!)
// 4. 52 Kacheln gleichmäßig auf ein Raster verteilen (4*13?)
// 5. Slider und Tiles in eigene Komponenten auslagern

export default function Tiles() {
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

	const [formula, setFormula] = useState(startFormula);
	const [colors, setColors] = useState(startColors);
	const [tiles, setTiles] = useState([]);
	const maxTiles = 51;

	useEffect(() => {
		// Lauscht an colors (= Slider) und an formula (= Buttons)
		// Wird ein Slider betätigt, werden iterativ die Farben aller Tiles
		// berechnet, ausgehend vom Startwert, den der Slider vorgibt
		//
		// Für jede Tile wird ein Objekt erzeugt, dass die Werte für die Farbkombination enthält
		// Alle Tile-Objekte werden im newTiles-Array gespeichert, aus dem anschließend
		// der neue tiles-State erzeugt wird.
		//
		// Wird die Formel über die Buttons geändert, wird useEffect ebenfalls getriggert und
		// die Tile-Objekte neu berechnet

		const newTiles = [];

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
			const t = Object.create(newTiles);
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
			newTiles.push(t);
		}

		setTiles(newTiles);
	}, [formula, colors]);

	return (
		<Fragment>
			<Helmet>
				<title>Color Picker</title>
			</Helmet>

			{/* Trick: .color-control-wrapper ist leicht größer als .color-control (padding)
				Dadurch bleibt ein kleiner Rand übrig, der als Gradient durchscheint
				Der Gradient startet mit der ersten Tile und endet mit der letzten => Zwischenwerte werden berechnet */}

			<div
				className="color-control-wrapper"
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
				<div className="color-control">
					{colors.map((obj) => (
						<>
							<label key={obj.color + '-label'} htmlFor={`range-${obj.color}`}>
								{obj.color}
							</label>
							<input
								className="color-slider"
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
												? { color: col.color, value: parseInt(e.target.value) }
												: { color: col.color, value: col.value }
										)
									)
								}
							/>
						</>
					))}

					<button
						className="color-button"
						value={formula.find(({ color }) => color === 'r').color}
						onClick={(e) => changeFormula(e.target.value, formula, setFormula)}
					>
						r {+formula.find(({ color }) => color === 'r').formula}
					</button>

					<button
						className="color-button"
						value={formula.find(({ color }) => color === 'g').color}
						onClick={(e) => changeFormula(e.target.value, formula, setFormula)}
					>
						g {+formula.find(({ color }) => color === 'g').formula}
					</button>

					<button
						className="color-button"
						value={formula.find(({ color }) => color === 'b').color}
						onClick={(e) => changeFormula(e.target.value, formula, setFormula)}
					>
						b {+formula.find(({ color }) => color === 'b').formula}
					</button>
				</div>
			</div>

			{/* Erzeugt mit .map() eine Schleife über das Tiles Array. 
			Das Array enthält Objekte mit jeweils einer Wertekombination für r, g, b, 
			Mit jedem Objekt wird ein Div erzeugt, dass die entsprechende rgb-Hintergrundfarbe besitzt */}

			<div className="color-box">
				{tiles.map((tile) => (
					<div
						style={{
							'--background-color': `rgb(${tile.r},${tile.g},${tile.b})`,
						}}
						className="tile"
						key={tile.id}
						onClick={() => onTileClick(tile)}
					>
						{tile.r} <br /> {tile.g} <br /> {tile.b}
					</div>
				))}
			</div>
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

function onTileClick(tile) {
	// Beim Klick auf eine Tile wird der Farbcode in die Zwischenablage kopiert und eine entsprechende
	// Bestätigung ausgegeben
	console.log(tile);

	// Copy the text inside the text field
	navigator.clipboard.writeText(`rgb(${tile.r},${tile.g},${tile.b})`);
}