import { useState } from 'react';
import css from './Popover.module.css';
import { useEffect } from 'react';

export default function Popover({ colors }) {
	const r = colors.r;
	const g = colors.g;
	const b = colors.b;

	return (
		<div className={css.popOverContent}>
			Farbe {r} {g} {b} in Zwischenablage kopiert
		</div>
	);
}
