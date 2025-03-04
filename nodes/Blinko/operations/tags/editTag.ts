import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Edit a tag in Blinko
 */
export async function editTag(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	// Get tag ID
	const tagId = this.getNodeParameter('tagId', i) as number;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	
	// Check which fields need to be updated
	const results: IDataObject[] = [];
	
	// Update sort order if provided (do this first)
	if (updateFields.sortOrder !== undefined) {
		const endpoint = 'tags.updateTagOrder';
		const body = {
			'0': {
				json: {
					id: tagId,
					sortOrder: updateFields.sortOrder as number,
				},
			},
		};
		
		// Make the API request
		const response = await this.helpers.httpRequest({
			method: 'POST',
			baseURL: apiBaseUrl,
			url: `/api/trpc/${endpoint}?batch=1`,
			body,
			...requestOptions,
		});
		
		if (Array.isArray(response) && response.length > 0 && response[0].result) {
			results.push({ field: 'sortOrder', success: true, data: response[0].result.data });
		}
	}
	
	// Update icon if provided (do this second)
	if (updateFields.icon !== undefined) {
		const endpoint = 'tags.updateTagIcon';
		const body = {
			'0': {
				json: {
					id: tagId,
					icon: updateFields.icon as string,
				},
			},
		};
		
		// Make the API request
		const response = await this.helpers.httpRequest({
			method: 'POST',
			baseURL: apiBaseUrl,
			url: `/api/trpc/${endpoint}?batch=1`,
			body,
			...requestOptions,
		});
		
		if (Array.isArray(response) && response.length > 0 && response[0].result) {
			results.push({ field: 'icon', success: true, data: response[0].result.data });
		}
	}
	
	// Update name if provided (do this last because it may change the tag ID)
	if (updateFields.name !== undefined) {
		// We need to get the tag's full name to extract just the name part
		// Using batch=1 format for the fullTagNameById endpoint
		const batchInput = {
			'0': {
				json: {
					id: tagId,
				},
			},
		};
		
		let oldName = '';
		
		// Try to get the tag's full name
		try {
			const fullTagNameResponse = await this.helpers.httpRequest({
				method: 'GET',
				baseURL: apiBaseUrl,
				url: `/api/trpc/tags.fullTagNameById?batch=1&input=${encodeURIComponent(JSON.stringify(batchInput))}`,
				...requestOptions,
			});
			
			// Check if response is valid
			if (!Array.isArray(fullTagNameResponse) || fullTagNameResponse.length === 0) {
				throw new Error(`Failed to retrieve tag with ID ${tagId}`);
			}
			
			// Check if there's an error in the response
			if (fullTagNameResponse[0].error) {
				throw new Error(`Tag with ID ${tagId} not found`);
			}
			
			// Extract the tag name from the full tag name
			if (fullTagNameResponse[0].result && 
				fullTagNameResponse[0].result.data && 
				fullTagNameResponse[0].result.data.json) {
				// The full tag name is in format "#tagname" or "#parent/tagname"
				const fullTagName = fullTagNameResponse[0].result.data.json as string;
				// Extract the last part after the last '/' or just remove the '#' if there's no '/'
				const lastSlashIndex = fullTagName.lastIndexOf('/');
				if (lastSlashIndex !== -1) {
					oldName = fullTagName.substring(lastSlashIndex + 1);
				} else {
					oldName = fullTagName.substring(1); // Remove the '#' prefix
				}
			} else {
				throw new Error(`Failed to extract tag name from response for ID ${tagId}`);
			}
		} catch (error) {
			// Handle the error and provide a more user-friendly message
			if (error instanceof Error) {
				throw new Error(`Error retrieving tag: ${error.message}`);
			} else {
				throw new Error('An unknown error occurred while retrieving tag information');
			}
		}
		
		// Now that we have the old name, update the tag name
		const endpoint = 'tags.updateTagName';
		const body = {
			'0': {
				json: {
					id: tagId,
					oldName,
					newName: updateFields.name as string,
				},
			},
		};
		
		// Make the API request to update name
		const response = await this.helpers.httpRequest({
			method: 'POST',
			baseURL: apiBaseUrl,
			url: `/api/trpc/${endpoint}?batch=1`,
			body,
			...requestOptions,
		});
		
		if (Array.isArray(response) && response.length > 0 && response[0].result) {
			results.push({ field: 'name', success: true, data: response[0].result.data });
		}
	}
	
	// Return the combined results
	return { 
		success: results.length > 0,
		updates: results,
	};
}
