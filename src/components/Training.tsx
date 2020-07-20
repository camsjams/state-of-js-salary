import React, {PureComponent, ReactNode, Fragment} from 'react';
import {Button} from '@fluentui/react-northstar';
import getData from '../utils/getData';
import initialize from '../utils/trainStateOfJs';

type Props = {}

type State = {
	isLearning: boolean;
	isDone: boolean;
	data: DataSet[];
	step: number;
}

const PAGE_SIZE = 5000;

class Training extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLearning: false,
			isDone: false,
			data: [],
			step: 0
		};

		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount(): Promise<void> {
		const data = await getData();
		this.setState({data});
	}

	handleClick(): void {
		this.setState({
			isLearning: true
		});

		const TOTAL = this.state.data.length;
		let step = 0;

		setTimeout(async () => {
			let end = step + PAGE_SIZE;
			while (step < TOTAL) {
				console.debug(`training pieces ${step} - ${end}`);
				await initialize(this.state.data.slice(step, end), end >= TOTAL);
				step = end;
				end += PAGE_SIZE;
			}

			this.setState({
				isLearning: false,
				isDone: false
			});

		}, 100);

	}

	render(): ReactNode {
		return <Fragment>
			{!this.state.isLearning &&
				<Button
					content="Train More"
					onClick={this.handleClick}
				/>}
			{this.state.isDone &&
				<span>Im done</span>}
		</Fragment>;
	}
}

export default Training;
