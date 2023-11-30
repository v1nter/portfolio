import ColorPicker from '../ColorPicker/ColorPicker.jsx';
import HireMe from '../HireMe/HireMe.jsx';
import Footer from '../Footer/Footer.jsx';
import Home from '../Home/Home.jsx';
import { Route } from 'wouter';
import Menu from '../Menu/Menu.jsx';

export default function Wrapper() {
	return (
		<div className="site-wrapper">
			<div className="site-header">
				<Menu />
			</div>
			<div className="site-content">
				<Route path="/" component={Home} />
				<Route path="/ColorPicker" component={ColorPicker} />
				<Route path="/hire-me" component={HireMe} />
			</div>
			<div className="site-footer">
				<Footer />
			</div>
		</div>
	);
}
