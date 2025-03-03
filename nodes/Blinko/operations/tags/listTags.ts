import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * List tags from Blinko
 */
export async function listTags(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	// Get filters if any
	const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
	const namePrefix = filters.namePrefix as string;

	// Make the API request
	const response = await this.helpers.httpRequest({
		method: 'GET',
		baseURL: apiBaseUrl,
		url: `/api/trpc/tags.list`,
		...requestOptions,
	});

	// Extract tags from the response - the structure is {"result":{"data":{"json":[...tags...]}}}
	let tagsArray: IDataObject[] = [];
	
	if (response?.result?.data?.json && Array.isArray(response.result.data.json)) {
		tagsArray = response.result.data.json;
	}
	
	// Apply name prefix filtering if specified
	if (namePrefix && namePrefix.trim().length > 0) {
		tagsArray = tagsArray.filter((tag: IDataObject) => {
			const tagName = String(tag.name || '');
			return tagName.toLowerCase().includes(namePrefix.toLowerCase());
		});
	}
	
	// Return the tags array wrapped in the expected structure
	return { tags: tagsArray };
}
