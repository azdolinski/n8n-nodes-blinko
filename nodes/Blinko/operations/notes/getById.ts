import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Get a note by ID from Blinko
 */
export async function getById(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const noteId = this.getNodeParameter('noteId', i) as string;
	const options = this.getNodeParameter('options', i, {}) as IDataObject;

	const queryParams: IDataObject = {};
	const jsonData: IDataObject = {
		id: parseInt(noteId, 10),
	};

	queryParams.json = jsonData;

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/notes.detail',
		body: queryParams,
		...requestOptions,
	});

	// If includeContent is false, remove content from the response
	if (options.includeContent === false && response.result.data) {
		const note = response.result.data;
		const { content, ...noteWithoutContent } = note;
		return noteWithoutContent;
	}

	return response.result.data;
}
