/* eslint-disable camelcase */
import React, {PureComponent, ReactNode, Fragment} from 'react';
import * as tf from '@tensorflow/tfjs';

// @ts-ignore
import AnimatedNumber from 'animated-number-react';
import i18n from 'i18next';
import styled from 'styled-components';
import {Accordion, Input, RadioGroup, Header} from '@fluentui/react-northstar';
import predict from '../utils/predict';

type Props = {}

type State = {
	[name: string]: number;
}

const DEFAULT_DATA: DataSet = {
	arrow_functions: 1,
	destructuring: 1,
	spread_operator: 1,
	async_await: 1,
	decorators: 1,
	promises: 1,
	proxies: 1,
	array_prototype_flat: 1,
	maps: 1,
	sets: 1,
	typed_arrays: 1,
	fetch: 1,
	i18n: 1,
	local_storage: 1,
	service_workers: 1,
	web_animations: 1,
	web_audio: 1,
	web_components: 1,
	webgl: 1,
	webrtc: 1,
	websocket: 1,
	web_speech: 1,
	webvr: 1,
	pwa: 1,
	wasm: 1,
	building_js_apps_overly_complex: 3,
	enjoy_building_js_apps: 3,
	would_like_js_to_be_main_lang: 3,
	js_moving_in_right_direction: 3,
	js_over_used_online: 3,
	js_ecosystem_changing_to_fast: 3,
	javascript_flavors: 3,
	front_end_frameworks: 3,
	data_layer: 3,
	back_end_frameworks: 3,
	testing: 3,
	mobile_desktop: 3,
	clojurescript: 3,
	elm: 3,
	purescript: 3,
	reason: 3,
	typescript: 3,
	angular: 3,
	ember: 3,
	preact: 3,
	react: 3,
	svelte: 3,
	vuejs: 3,
	apollo: 3,
	graphql: 3,
	mobx: 3,
	redux: 3,
	relay: 3,
	express: 3,
	feathers: 3,
	gatsby: 3,
	koa: 3,
	meteor: 3,
	nextjs: 3,
	nuxt: 3,
	sails: 3,
	ava: 3,
	cypress: 3,
	enzyme: 3,
	jasmine: 3,
	jest: 3,
	mocha: 3,
	puppeteer: 3,
	storybook: 3,
	cordova: 3,
	electron: 3,
	expo: 3,
	ionic: 3,
	nativeapps: 3,
	nwjs: 3,
	reactnative: 3,
	yearsXp: 5
};

const SURVEY_OPINIONS = [
	'building_js_apps_overly_complex',
	'enjoy_building_js_apps',
	'would_like_js_to_be_main_lang',
	'js_moving_in_right_direction',
	'js_over_used_online',
	'js_ecosystem_changing_to_fast'
];

const SURVEY_HAPPINESS = [
	'javascript_flavors',
	'front_end_frameworks',
	'data_layer',
	'back_end_frameworks',
	'testing',
	'mobile_desktop'
];

const SURVEY_FEATURES = [
	'arrow_functions',
	'destructuring',
	'spread_operator',
	'async_await',
	'decorators',
	'promises',
	'proxies',
	'array_prototype_flat',
	'maps',
	'sets',
	'typed_arrays',
	'fetch',
	'i18n',
	'local_storage',
	'service_workers',
	'web_animations',
	'web_audio',
	'web_components',
	'webgl',
	'webrtc',
	'websocket',
	'web_speech',
	'webvr',
	'pwa',
	'wasm'
];

const SURVEY_TOOLS = [
	'clojurescript',
	'elm',
	'purescript',
	'reason',
	'typescript',
	'angular',
	'ember',
	'preact',
	'react',
	'svelte',
	'vuejs',
	'apollo',
	'graphql',
	'mobx',
	'redux',
	'relay',
	'express',
	'feathers',
	'gatsby',
	'koa',
	'meteor',
	'nextjs',
	'nuxt',
	'sails',
	'ava',
	'cypress',
	'enzyme',
	'jasmine',
	'jest',
	'mocha',
	'puppeteer',
	'storybook',
	'cordova',
	'electron',
	'expo',
	'ionic',
	'nativeapps',
	'nwjs',
	'reactnative'
];

const Question = styled.p`
	padding: 0.5em 0;
	font-size: 1.4em;
`;

const formatValue = (value: number): string =>
	Math.round(value).toLocaleString(undefined, {style: 'currency', currency: 'USD'}).split('.00')[0];

class Predictor extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			predicted: 10
		};

		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	async componentDidMount(): Promise<void> {
		this.model = await tf.loadLayersModel('/data/stateOfJs-final.json');
		this.setState({
			predicted: Math.max(0, predict(DEFAULT_DATA, this.model))
		});
	}

	async componentDidUpdate(): Promise<void> {
		const data = {
			...DEFAULT_DATA,
			...this.state
		};

		this.setState({
			predicted: Math.max(0, predict(data, this.model))
		});
	}

	model: tf.LayersModel

	handleRadioChange(e: {}, data: {name: string; value: number}): void {
		this.setState({
			[data.name]: data.value
		});
	}

	handleYearChange(e: {}, data: {name: string; value: string}): void {
		this.setState({
			[data.name]: parseInt(data.value)
		});
	}

	render(): ReactNode {
		return <Fragment>
			<Header
				color="green"
				as="h2">
				Your estimated salary is:&nbsp;
				<AnimatedNumber
					value={this.state.predicted * 1000}
					formatValue={formatValue}
				/>
			</Header>
			<Header
				as="h3"
				content="Fill Out All That Apply"
			/>
			Total Years of Experience <Input
				name="yearsXp"
				onChange={this.handleYearChange}
				defaultValue="5"
				type="number"
				placeholder="Total years..."
			/>
			<Accordion
				exclusive
				panels={[
					{
						title: <span>
							<strong>Opinions:</strong> For each of the following statements, how much do you agree?
						</span>,
						content: SURVEY_OPINIONS.map((name) =>
							<Fragment key={name}>
								<Question>
									{i18n.t(name)}
								</Question>
								<RadioGroup
									onCheckedValueChange={this.handleRadioChange}
									defaultCheckedValue={3}
									items={[
										{
											name,
											key: name + 'a',
											label: 'Strongly Agree',
											value: 5
										},
										{
											name,
											key: name + 'b',
											label: 'Agree',
											value: 4
										},
										{
											name,
											key: name + 'c',
											label: 'Neutral',
											value: 3
										},
										{
											name,
											key: name + 'd',
											label: 'Disagree',
											value: 2
										},
										{
											name,
											key: name + 'e',
											label: 'Strongly Disagree',
											value: 1
										}
									]} />
							</Fragment>)
					},
					{
						title: <span>
							<strong>Happiness:</strong>&nbsp;
							How happy are you with the current overall state of each category?
						</span>,
						content: SURVEY_HAPPINESS.map((name) =>
							<Fragment key={name}>
								<Question>
									{i18n.t(name)}
								</Question>
								<RadioGroup
									onCheckedValueChange={this.handleRadioChange}
									defaultCheckedValue={3}
									items={[
										{
											name,
											key: name + 'a',
											label: 'Very Happy',
											value: 5
										},
										{
											name,
											key: name + 'b',
											label: 'Happy',
											value: 4
										},
										{
											name,
											key: name + 'c',
											label: 'Neutral',
											value: 3
										},
										{
											name,
											key: name + 'd',
											label: 'Unhappy',
											value: 2
										},
										{
											name,
											key: name + 'e',
											label: 'Very Unhappy',
											value: 1
										}
									]} />
							</Fragment>)
					},
					{
						title: <span>
							<strong>Features:</strong> For each JS feature, have you heard of it and do you use it?
						</span>,
						content: SURVEY_FEATURES.map((name) =>
							<Fragment key={name}>
								<Question>
									{i18n.t(name)}
								</Question>
								<RadioGroup
									onCheckedValueChange={this.handleRadioChange}
									defaultCheckedValue={1}
									items={[
										{
											name,
											key: name + 'nvr',
											label: 'Never Heard of it',
											value: 1
										},
										{
											name,
											key: name + 'know',
											label: 'Know about it',
											value: 2
										},
										{
											name,
											key: name + 'have',
											label: 'Have used it',
											value: 3
										}
									]} />
							</Fragment>)
					},
					{
						title: <span>
							<strong>Tools and Frameworks:</strong>&nbsp;
							For each tool, have you heard of it and do you use it?
						</span>,
						content: SURVEY_TOOLS.map((name) =>
							<Fragment key={name}>
								<Question>
									{i18n.t(name)}
								</Question>
								<RadioGroup
									onCheckedValueChange={this.handleRadioChange}
									defaultCheckedValue={1}
									items={[
										{
											name,
											key: name + 'a',
											label: "I've USED it before, and WOULD use it again",
											value: 5
										},
										{
											name,
											key: name + 'b',
											label: "I've USED it before, and would NOT use it again",
											value: 4
										},
										{
											name,
											key: name + 'c',
											label: "I've HEARD of it, and WOULD like to learn it",
											value: 3
										},
										{
											name,
											key: name + 'd',
											label: "I've HEARD of it, and am NOT interested",
											value: 2
										},
										{
											name,
											key: name + 'e',
											label: "I've never heard of it",
											value: 1
										}
									]} />
							</Fragment>)
					}
				]}
			/>
			<p>
				For brevity, the questions are summarized here, please see&nbsp;
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://2019.stateofjs.com/">The State Of JS 2019
				</a> for more context on each section.
			</p>
		</Fragment>;
	}
}

export default Predictor;
