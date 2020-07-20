/* eslint-disable camelcase */
import * as tf from '@tensorflow/tfjs';
import {
	FEATURES,
	CAT_FEATURES,
	VARIABLE_CATEGORY_COUNT
} from '../constants/Models';

const normalize = (tensor: tf.Tensor): tf.Tensor<tf.Rank> =>
	tf.div(
		tf.sub(tensor, tf.min(tensor)),
		tf.sub(tf.max(tensor), tf.min(tensor))
	);

const oneHot = (value: number, categoryCount: number): number[] =>
	Array.from(tf.oneHot(value, categoryCount).dataSync());

export const createDataSets = (data: DataSet[], features: string[], categoricalFeatures: Set<string>, testSize: number):
	tf.Tensor<tf.Rank>[] => {
	const X = data.map((datum) =>
		features.flatMap((feature) => {
			if (categoricalFeatures.has(feature)) {
				return oneHot(!datum[feature] ? 0 : datum[feature], VARIABLE_CATEGORY_COUNT[feature]);
			}

			return !datum[feature] ? 0 : datum[feature];
		})
	);

	const XTensors = normalize(tf.tensor2d(X));

	const y = tf.tensor(data.map((r) => !r.salary ? 0 : r.salary));

	const splitIdx = (1 - testSize) * data.length;

	const [xTrain, xTest] = tf.split(XTensors, [splitIdx, data.length - splitIdx]);
	const [yTrain, yTest] = tf.split(y, [splitIdx, data.length - splitIdx]);

	return [xTrain, xTest, yTrain, yTest];
};

export const learn = async (xTrain: tf.Tensor<tf.Rank>, yTrain: tf.Tensor<tf.Rank>): Promise<tf.Sequential> => {
	const model = tf.sequential();

	model.add(
		tf.layers.dense({
			inputShape: [xTrain.shape[1]],
			units: xTrain.shape[1],
			activation: 'sigmoid'
		})
	);
	model.add(tf.layers.dense({units: 1}));

	model.compile({
		optimizer: tf.train.sgd(0.001),
		loss: 'meanSquaredError',
		metrics: [tf.metrics.meanAbsoluteError]
	});

	await model.fit(xTrain, yTrain, {
		batchSize: 32,
		epochs: 100,
		shuffle: true,
		validationSplit: 0.1
	});

	return model;
};

export default async (data: DataSet[], isLast?: boolean): Promise<void> => {
	// const data = await getData();

	console.log('data loaded');

	const [xTrain, xTest, yTrain, yTest] = createDataSets(
		data,
		FEATURES,
		CAT_FEATURES,
		0.1
	);
	console.log('data created');

	const linearModel = await learn(xTrain, yTrain);

	console.log('data trained');

	if (isLast) {
		const yTestActual = yTest.dataSync();

		// @ts-ignore
		const linearModalPredictions = linearModel.predict(xTest).dataSync();
		const jsonData: {x: number; y: number}[] = [];

		yTestActual.forEach((actual: number, i: number) => {
			jsonData.push({x: actual, y: linearModalPredictions[i]});
		});
		console.log('Sample at end:', JSON.stringify(jsonData));

		linearModel.save('downloads://./stateOfJs-final');
		console.log('data saved');
	}
};
