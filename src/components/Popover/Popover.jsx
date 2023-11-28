import css from './Popover.module.css';

export default function Popover({ colors }) {
	const r = colors.r;
	const g = colors.g;
	const b = colors.b;

	console.log(colors);

	// const log = colors.map((obj) => obj);
	// console.log(log);

	return (
		<div className={css.popOverContent}>
			Farbe {r} {g} {b} in Zwischenablage kopiert
		</div>
	);
}
