/* eslint-disable max-len */
import React, {FC, Fragment} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Flex, Segment, Header, List, Image, QuestionCircleIcon} from '@fluentui/react-northstar';
import Predictor from '../components/Predictor';
import Training from '../components/Training';
import cameronImage from '../assets/images/cameron.jpg';
import mediumLogo from '../assets/images/medium-logo.png';
import twitterLogo from '../assets/images/twitter-logo.png';
import githubLogo from '../assets/images/github-logo.png';

const GlobalStyle = createGlobalStyle`
	:root {
		--brand: rgb(98, 100, 167);
		--darkGrey: #333;
	}

	body {
		background-color: var(--brand)
	}
`;

const Foot = styled.footer`
	text-align: center;
	padding: 1em 0 3em;
	background-color: var(--brand);
	color: var(--darkGrey);
`;

const App: FC = () =>
	<Fragment>
		<GlobalStyle />
		<Flex column>
			<Segment
				color="brand"
				inverted>
				<Header
					as="h1"
					content="JavaScript 2020 Salary Tool"
					description={{
						content: 'A theoretical salary calculator',
						as: 'span'
					}}
				/>
				<Header as="h3">
					Derived from&nbsp;
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://2019.stateofjs.com/">The State Of JS 2019
					</a>
						&nbsp;downloadable&nbsp;
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.kaggle.com/sachag/state-of-js-2019">data</a>
						&nbsp;using&nbsp;
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://en.wikipedia.org/wiki/Machine_learning">
						Machine Learning
					</a>
						&nbsp;and&nbsp;
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.tensorflow.org/js/tutorials"
					>Tensorflow.js</a>
				</Header>
			</Segment>
			<Segment>
				{window.location.hash === '#training-camp' && <Training />}
				{window.location.hash !== '#training-camp' && <Predictor />}
			</Segment>
			<Segment
				color="grey"
				inverted>
				<QuestionCircleIcon />
					&nbsp;Please see this&nbsp;
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://medium.com/@cameron.manavian/a-2020-javascript-salary-tool-using-machine-learning-3fa67f0abfba">
					Medium post
				</a> for more information.
			</Segment>
			<Segment
				color="grey"
				inverted>
				<Header
					as="h4"
					color="orange"
					content="Disclaimer"
				/>
				<p>No data is transferred off of this page, the Tensorflow model is loaded into your browser.</p>
				<p>This calculator is not associated with the State of JavaScript organizers or team, and is purely for demonstration purposes.</p>
				<p>The salary displayed above is derived from about 20,000 real answers from the 2019 State of JavaScript survey. <strong>That being said</strong>, sample size, regional difference, survey bias, local cost of living, gender, race, and other factors contributing to an engineer&apos;s salary will create a large margin of error.</p>
			</Segment>
			<Segment
				color="brand"
				styles={{boxShadow: 'none'}}
				inverted>
				<List
					as="div"
					items={[
						{
							key: 'cameron',
							media: <Image src={cameronImage}
								avatar />,
							header: 'By Cameron Manavian',
							headerMedia: 'Author',
							as: 'a'
						},
						{
							key: 'twitter',
							media: <Image src={twitterLogo}
								avatar />,
							header: '@camsjams',
							headerMedia: 'Twitter',
							href: 'https://twitter.com/camsjams',
							target: '_blank',
							rel: 'noopener noreferrer',
							as: 'a'
						},
						{
							key: 'github',
							media: <Image src={githubLogo}
								avatar />,
							header: '@camsjams',
							headerMedia: 'GitHub',
							href: 'https://github.com/camsjams',
							target: '_blank',
							rel: 'noopener noreferrer',
							as: 'a'
						},
						{
							key: 'medium',
							media: <Image src={mediumLogo}
								avatar />,
							header: '@cameron.manavian',
							headerMedia: 'Medium',
							href: 'https://medium.com/@cameron.manavian',
							target: '_blank',
							rel: 'noopener noreferrer',
							as: 'a'
						}
					]} />
			</Segment>
		</Flex>
		<Foot>
			Good Luck, Have Fun!
		</Foot>
	</Fragment>;

export default App;
