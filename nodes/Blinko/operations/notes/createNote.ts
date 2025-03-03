import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Create a note in Blinko
 */
export async function createNote(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const content = this.getNodeParameter('content', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

	// Przygotuj dane w formacie oczekiwanym przez serwer
	const jsonData: IDataObject = {
		content: content || '',
		type: additionalFields.type !== undefined ? additionalFields.type : 0, // 0 = BLINKO, 1 = NOTE
		isShare: additionalFields.isShare || false,
		isTop: additionalFields.isTop || false,
	};

	// Dodaj tagi jako hashtagi w treści
	if (additionalFields.tags) {
		const tags = (additionalFields.tags as string).split(',');
		const hashTags = tags.map(tag => `#${tag.trim()}`).join(' ');
		jsonData.content += ' ' + hashTags;
	}

	// Extract attachments from attachmentValues if present
	const attachmentsInput = additionalFields.attachments as IDataObject;
	const attachmentValues = attachmentsInput.attachmentValues
		? (attachmentsInput.attachmentValues as IDataObject[])
		: [];

	jsonData.attachments = attachmentValues.map(a => ({
		name: a.name,
		path: a.path,
		size: a.size,
		type: a.type
	}));

	// Simplified batch structure without meta values
	const batchData = {
		"0": {
			json: jsonData
		}
	};

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/notes.upsert?batch=1',
		body: batchData,
		...requestOptions,
	});

	return response[0].result.data;
}
