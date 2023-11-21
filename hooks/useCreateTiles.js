import { useState } from 'react';

export default function useCreateTiles(r, g, b, count) {
	const [tiles, setTiles] = useState([]);

	const createTiles = () => create(r, g, b, count, tiles, setTiles);

	return [createTiles, tiles];
}

function create(r, g, b, count, tiles, setTiles) {
	const tile = {
		id: 0,
		r: 0,
		g: 0,
		b: 0,
	};

	for (let i = 0; i <= count; i = i + 1) {
		const t = Object.create(tile);
		t.id = i;
		t.r = r;
		t.g = g;
		t.b = b;
		tiles.push(t);
	}

	setTiles(tiles);
}
