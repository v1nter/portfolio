import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Tiles from './components/Tiles.jsx';
import { HelmetProvider } from 'react-helmet-async';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HelmetProvider>
			<Tiles />
		</HelmetProvider>
	</StrictMode>
);
