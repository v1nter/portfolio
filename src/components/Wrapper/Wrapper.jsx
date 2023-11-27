import ColorPicker from '../ColorPicker/ColorPicker.jsx';
import Nav from '../Nav/Nav.jsx';
import Kontakt from '../Kontakt/Kontakt.jsx';
import Footer from '../Footer/Footer.jsx';
import Start from '../Start/Start.jsx';
import { Route } from 'wouter';

export default function Wrapper() {
	return (
		<div className="site-wrapper">
			<div className="site-header">
				<Nav />
			</div>
			<div className="site-content">
				<Route path="/" component={Start} />
				<Route path="/ColorPicker" component={ColorPicker} />
				<Route path="/hire-me" component={Kontakt} />
			</div>
			<div className="site-footer">
				<Footer />
			</div>
		</div>
	);
}
