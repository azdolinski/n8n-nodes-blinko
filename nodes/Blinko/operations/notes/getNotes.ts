import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Get notes from Blinko with optional filtering by type
 */
export async function getNotes(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
	const type = this.getNodeParameter('type', i, -1) as number;

	const queryParams: IDataObject = {};
	const jsonData: IDataObject = {
		searchText: filters.searchText || '',
		tagId: filters.tagId ? parseInt(filters.tagId as string, 10) : null,
		page: 1,
		size: 30,
		orderBy: filters.orderBy || 'desc',
		type,
	};
	
	// Add filters to the query
	if (filters.isArchived !== undefined) {
		jsonData.isArchived = filters.isArchived;
	}
	
	if (filters.withFile !== undefined) {
		jsonData.withFile = filters.withFile;
	}
	
	queryParams.json = jsonData;

	if (!returnAll) {
		const limit = this.getNodeParameter('limit', i) as number;
		(queryParams.json as IDataObject).size = limit;
	}

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/notes.list',
		body: queryParams,
		...requestOptions,
	});

	const data = response.result.data;
	
	return { notes: data };
}
