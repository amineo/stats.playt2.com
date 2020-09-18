import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, createTheme, SoundsProvider, createSounds } from 'arwes';

import { lighten, darken } from 'polished';

const generateColor = (color) => ({
	base: color,
	light: lighten(0.2, color),
	dark: darken(0.2, color)
});

const generateBackground = (color) => ({
	level0: color,
	level1: lighten(0.015, color),
	level2: lighten(0.03, color),
	level3: lighten(0.045, color)
});

export const createAppTheme = (theme = {}) => ({
	...theme,
	color: {
		primary: generateColor('#30fffe'),
		...theme.color
	},
	background: {
		primary: generateBackground('#031212'),
		...theme.background
	}
});

const resources = {
	background: {
		small: '/arwes/img/background-small.jpg',
		medium: '/arwes/img/background-medium.jpg',
		large: '/arwes/img/background-large.jpg',
		xlarge: '/arwes/img/background-xlarge.jpg'
	},
	pattern: '/arwes/img/glow.png'
};

const sounds = {
	shared: {
		volume: 0.6
	},
	players: {
		click: {
			sound: { src: [ '/arwes/sound/click.mp3' ] },
			settings: { oneAtATime: true }
		},
		typing: {
			sound: { src: [ '/arwes/sound/typing.mp3' ] },
			settings: { oneAtATime: true }
		},
		deploy: {
			sound: { src: [ '/arwes/sound/deploy.mp3' ] },
			settings: { oneAtATime: true }
		}
	}
};

// Init App
ReactDOM.render(
	<Router>
		<ThemeProvider theme={createTheme(createAppTheme())}>
			<SoundsProvider sounds={createSounds(sounds)}>
				<App resources={resources} />
			</SoundsProvider>
		</ThemeProvider>
	</Router>,
	document.getElementById('root')
);
