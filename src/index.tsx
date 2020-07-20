import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import {Provider, teamsTheme} from '@fluentui/react-northstar';
import App from './containers/App';
import translations from './translations';

i18n.init({
	lng: 'en',
	resources: translations
});

const appRoot = document.getElementById('root');

ReactDOM.render(
	<Provider theme={teamsTheme}>
		<App />
	</Provider>,
	appRoot
);
