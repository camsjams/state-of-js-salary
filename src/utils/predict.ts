import * as tf from '@tensorflow/tfjs';
import {FEATURES, CAT_FEATURES} from '../constants/Models';
import {createDataSets} from './trainStateOfJs';

export default (data: DataSet, model: tf.LayersModel): number => {
	const XTens = createDataSets([data],
		FEATURES,
		CAT_FEATURES,
		0
	);

	// @ts-ignore
	const linearModalPredictions = model.predict(XTens[0]).dataSync();
	return linearModalPredictions[0];
};
