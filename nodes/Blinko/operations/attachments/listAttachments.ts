import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * List attachments from Blinko
 */
export async function listAttachments(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

	const queryParams: IDataObject = {};
	const jsonData: IDataObject = {
		page: 1,
		size: 30,
		searchText: filters.searchText || '',
	};
	
	if (filters.folder !== undefined) {
		jsonData.folder = filters.folder;
	}
	
	queryParams.json = jsonData;

	if (!returnAll) {
		const limit = this.getNodeParameter('limit', i) as number;
		(queryParams.json as IDataObject).size = limit;
	}

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/attachments.list',
		body: queryParams,
		...requestOptions,
	});

	return response.result.data;
}
