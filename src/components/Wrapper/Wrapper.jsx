import ColorPicker from '../ColorPicker/ColorPicker.jsx';
import Nav from '../Nav/Nav.jsx';
import Kontakt from '../Kontakt/Kontakt.jsx';
import Footer from '../Footer/Footer.jsx';
import Home from '../Home/Home.jsx';
import { Route } from 'wouter';
import Menu from '../Menu/Menu.jsx';
import { createContext } from 'react';

export default function Wrapper() {
	return (
		<div className="site-wrapper">
			<div className="site-header">
				{/* <Nav /> */}
				<Menu />
			</div>
			<div className="site-content">
				<Route path="/" component={Home} />
				<Route path="/ColorPicker" component={ColorPicker} />
				<Route path="/hire-me" component={Kontakt} />
			</div>
			<div className="site-footer">
				<Footer />
			</div>
		</div>
	);
}
