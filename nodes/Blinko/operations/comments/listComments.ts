import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Get comments list for a specific note from Blinko
 */
export async function listComments(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const noteId = this.getNodeParameter('noteId', i) as number;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

	// Prepare the batch request data
	const batchData: IDataObject = {};
	
	// Create request item in expected format
	const requestItem: IDataObject = {
		json: {
			noteId,
			page: 1,
			size: 30,
			orderBy: additionalFields.orderBy || 'desc',
		},
	};

	if (!returnAll) {
		const limit = this.getNodeParameter('limit', i) as number;
		(requestItem.json as IDataObject).size = limit;
	}

	// Add item to batch
	batchData['0'] = requestItem;

	const response = await this.helpers.httpRequest({
		method: 'GET',
		baseURL: apiBaseUrl,
		url: '/api/trpc/comments.list',
		qs: {
			batch: 1,
			input: JSON.stringify(batchData)
		},
		...requestOptions,
	});

	const data = response[0].result.data.json;
	
	return { 
		total: data.total,
		comments: data.items,
	};
}
