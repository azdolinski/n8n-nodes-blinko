import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Delete a tag from Blinko
 */
export async function deleteTag(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	// Get tag ID and deletion options
	const tagId = this.getNodeParameter('tagId', i) as number;
	const withAllNotes = this.getNodeParameter('withAllNotes', i, false) as boolean;
	
	// Determine which endpoint to use based on the option
	const endpoint = withAllNotes ? 'tags.deleteTagWithAllNote' : 'tags.deleteOnlyTag';
	
	// Prepare the request body in batch format
	const body = {
		'0': {
			json: {
				id: tagId,
			},
		},
	};
	
	// Log the request details for debugging
	console.log(`Sending request to: ${apiBaseUrl}/api/trpc/${endpoint}?batch=1`);
	console.log('Request body:', JSON.stringify(body));
	
	// Make the API request
	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: `/api/trpc/${endpoint}?batch=1`,
		body,
		...requestOptions,
	});
	
	// Log the response for debugging
	console.log('Response:', JSON.stringify(response));
	
	// Extract the result from the batch response
	if (Array.isArray(response) && response.length > 0 && response[0].result) {
		return response[0].result.data || { success: true };
	}
	
	// Return the response
	return response;
}
