/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/no-nesting */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-ignore
import ndjsonStream from 'can-ndjson-stream';

const SURVEY_FEATURE_TO_INT: DataSet = {
	used: 3,
	heard: 2,
	neverheard: 1
};

const SURVEY_TOOL_TO_INT: DataSet = {
	would_use: 5,
	would_not_use: 4,
	interested: 3,
	not_interested: 2,
	never_heard: 1
};

export default async (): Promise<DataSet[]> => {
	const data: DataSet[] = [];
	return await fetch('/data/2019-data.ndjson') // make a fetch request to a NDJSON stream service
		.then((response) =>
			ndjsonStream(response.body) // ndjsonStream parses the response.body
		)
		.then((exampleStream) => {
			const reader = exampleStream.getReader();
			let read: (result: any) => any;
			return reader
				.read()
				.then(read = (result) => {
					if (result.done) {
						return data;
					}

					const userResponse = result.value;
					if (userResponse.user_info.yearly_salary &&
						userResponse.user_info.years_of_experience &&
						userResponse.features &&
						userResponse.opinions &&
						userResponse.happiness &&
						userResponse.tools
					) {
						data.push({
							...Object.keys(userResponse.features).reduce((hash, key) => ({
								...hash,
								[key]: SURVEY_FEATURE_TO_INT[userResponse.features[key]]
							}), {}),
							...userResponse.opinions,
							...userResponse.happiness,
							...Object.keys(userResponse.tools).reduce((hash, key) => ({
								...hash,
								[key]: SURVEY_TOOL_TO_INT[userResponse.tools[key].experience]
							}), {}),
							salary: parseInt(userResponse.user_info.yearly_salary.split('_')[1]),
							yearsXp: parseInt(userResponse.user_info.years_of_experience.split('_')[0])
						});
					}

					return reader.read().then(read);
				});
		});
};
