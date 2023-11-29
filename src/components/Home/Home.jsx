import { Fragment } from 'react';
import css from './Home.module.css';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { overrideMenu } from '../Menu/Menu';

const html = `//&nbsp;&#10148;`;

export default function Home() {
	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Start</title>
			</Helmet>
			<AnimatePresence>
				<motion.div
					className={css.home}
					initial={{ y: 200, opacity: 0, transition: { duration: 0.5 } }}
					animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
					exit={{ y: -200, opacity: 0, transition: { duration: 0.5 } }}
					key={'Home'}
				>
					<div className={css.title}>
						Hi, I'm Sebastian <span className={css.decoration}>Klein</span>!
					</div>
					<div className={css.article}>
						I'm a Webdeveloper and you can{' '}
						<Link
							to="/hire-me"
							onClick={() => overrideMenu()}
							className={css.link}
							dangerouslySetInnerHTML={{ __html: `${html}&nbsp;hireMe` }}
						/>
						{/* <div
						className={css.link}
						dangerouslySetInnerHTML={{ __html: `${html}&nbsp;hireMe` }}
						onClick={() =>
							changeLocation({ id: 1, title: 'home', to: '/', ref: 0 })
						}
					/> */}
						.
						<p />
						This site was proudly made with React, Vite, <br />
						PostCSS, Framer Motion and VS Code.
						<p />
						See the source at my{' '}
						<a
							href="https://github.com/v1nter/portfolio"
							target="_blank"
							dangerouslySetInnerHTML={{ __html: `${html}&nbsp;gitHub` }}
						/>
						.
					</div>
					{/* <div className={css.box}></div> */}
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
