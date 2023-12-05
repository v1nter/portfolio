import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import CookieConsent from 'react-cookie-consent';

import Wrapper from './components/Wrapper/Wrapper.jsx';
import Landing from './components/Landing/Landing.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HelmetProvider>
			<CookieConsent>
				This website uses cookies to enhance the user experience.
			</CookieConsent>
			<Wrapper />
		</HelmetProvider>
	</StrictMode>
);
