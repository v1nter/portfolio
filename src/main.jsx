import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import Wrapper from './components/Wrapper/Wrapper.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HelmetProvider>
			<Wrapper />
		</HelmetProvider>
	</StrictMode>
);
