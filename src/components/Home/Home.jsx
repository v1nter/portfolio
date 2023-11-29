import { Fragment } from 'react';
import css from './Home.module.css';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

const html = `//&nbsp;&#10148;`;

export default function Home() {
	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Start</title>
			</Helmet>
			<div className={css.home}>
				<div className={css.title}>
					Hi, I'm Sebastian <span className={css.decoration}>Klein</span>!
				</div>
				<div className={css.article}>
					I'm a Webdeveloper and you can{' '}
					<Link
						to="/hire-me"
						className={css.link}
						dangerouslySetInnerHTML={{ __html: `${html}  hireMe` }}
					/>
					.
					<p />
					This side was proudly made with React, Vite, PostCSS, Framer Motion
					and VS Code.
					<p />
					See the source at my{' '}
					<a
						href="https://github.com/v1nter/portfolio"
						target="_blank"
						dangerouslySetInnerHTML={{ __html: `${html}&nbsp;GitHub` }}
					/>
				</div>
				{/* <div className={css.box}></div> */}
			</div>
		</Fragment>
	);
}
