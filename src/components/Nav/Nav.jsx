import { Link } from 'wouter';
import css from './Nav.module.css';

const html = `// &#10148;`;

export default function Nav() {
	return (
		<nav className={css.nav}>
			{/* Hauptnavigation */}
			<ul>
				<li>
					<Link
						to="/"
						className={css.link}
						dangerouslySetInnerHTML={{ __html: `${html} home` }}
					/>
				</li>
				<li>
					<Link
						to="/ColorPicker"
						className={css.link}
						dangerouslySetInnerHTML={{ __html: `${html}  demo` }}
					/>
				</li>
				{/* <li>
					<Link
						to="/techStack"
						className={css.link}
						dangerouslySetInnerHTML={{ __html: `${html}  techStack` }}
					/>
				</li> */}
				<li>
					<Link
						to="/hire-me"
						className={css.link}
						dangerouslySetInnerHTML={{ __html: `${html}  hireMe` }}
					/>
				</li>
			</ul>
		</nav>
	);
}
