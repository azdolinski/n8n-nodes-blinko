import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Create a comment in Blinko
 */
export async function createComment(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const noteId = this.getNodeParameter('noteId', i) as number;
	const content = this.getNodeParameter('content', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

	// Prepare request data
	const jsonData: IDataObject = {
		content,
		noteId,
	};

	// Add optional fields if provided
	if (additionalFields.parentId) {
		jsonData.parentId = parseInt(additionalFields.parentId as string, 10);
	}

	// Create batch request
	const batchData: IDataObject = {
		'0': {
			json: jsonData,
		},
	};

	// Prepare request options with proper User-Agent
	const options: IDataObject = { ...requestOptions };
	if (!options.headers) {
		options.headers = {};
	}

	// Set a proper browser-like User-Agent that Bowser can parse
	(options.headers as IDataObject)['User-Agent'] = 'Mozilla/5.0 (n8n Automation; n8n/1.0) AppleWebKit/537.36 (KHTML, like Gecko) n8n-nodes-blinko/1.0 Safari/537.36';

	// If guestName is provided, add it and remove authentication
	if (additionalFields.guestName) {
		jsonData.guestName = additionalFields.guestName;
		// Remove authorization header when posting as guest
		if (options.headers) {
			delete (options.headers as IDataObject).Authorization;
		}
	}

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/comments.create',
		qs: { batch: 1 },
		body: batchData,
		...options,
	});

	return { success: response[0].result.data.json };
}
