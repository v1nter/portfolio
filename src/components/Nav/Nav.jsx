import { Link } from 'wouter';
import css from './Nav.module.css';

export default function Nav() {
	return (
		<nav className={css.nav}>
			{/* Hauptnavigation */}
			<ul>
				<li>
					<Link to="/" className={css.link}>
						Start
					</Link>
				</li>
				<li>
					<Link to="/ColorPicker" className={css.link}>
						Demo
					</Link>
				</li>
				<li>
					<Link to="/hire-me" className={css.link}>
						Hire me
					</Link>
				</li>
			</ul>
		</nav>
	);
}
