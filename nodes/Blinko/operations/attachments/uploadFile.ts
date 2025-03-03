import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Upload a file to Blinko
 */
export async function uploadFile(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
	const items = this.getInputData();
	const item = items[i];

	if (item.binary === undefined) {
		throw new Error('No binary data exists on item!');
	}

	if (item.binary[binaryPropertyName] === undefined) {
		throw new Error(`Binary property ${binaryPropertyName} does not exist on item!`);
	}

	const binaryData = item.binary[binaryPropertyName];
	const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

	// Upload the file
	const formData = new FormData();
	formData.append('file', new Blob([dataBuffer]), binaryData.fileName || 'file');

	const headers = { ...requestOptions.headers as object };

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/file/upload',
		headers: {
			...headers,
			'Content-Type': 'multipart/form-data',
		},
		body: formData,
	});

	return response;
}
