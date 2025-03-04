import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';
import { lookup } from 'mime-types';
import FormData from 'form-data';

interface FileUploadResponse {
	filePath: string;
	fileName: string;
	type: string;
	size: number;
}

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
		attachments: [], // Initialize attachments as empty array
	};

	// Dodaj tagi jako hashtagi w treści
	if (additionalFields.tags) {
		const tags = (additionalFields.tags as string).split(',');
		const hashTags = tags.map(tag => `#${tag.trim()}`).join(' ');
		jsonData.content += ' ' + hashTags;
	}

	// Handle multiple file uploads
	const filesInput = additionalFields.files as IDataObject;
	const fileValues = filesInput?.fileValues as IDataObject[] || [];

	// Upload each file first
	const attachments = [];
	for (const fileValue of fileValues) {
		const binaryPropertyName = fileValue.binaryPropertyName as string;
		const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
		
		const fileName = binaryData.fileName || 'file';
		const mimeType = binaryData.mimeType || lookup(fileName) || 'application/octet-stream';
		const fileBuffer = Buffer.from(binaryData.data, 'base64');

		// Create form data
		const form = new FormData();
		form.append('file', fileBuffer, {
			filename: fileName,
			contentType: mimeType,
		});

		// Upload file first
		const uploadResponse = await this.helpers.httpRequest({
			method: 'POST',
			baseURL: apiBaseUrl,
			url: '/api/file/upload',
			headers: {
				...requestOptions.headers as { [key: string]: string },
				...form.getHeaders(),
			},
			body: form,
		}) as FileUploadResponse;

		// Add file info to attachments array
		attachments.push({
			name: uploadResponse.fileName,
			path: uploadResponse.filePath,
			size: uploadResponse.size,
			type: uploadResponse.type,
		});
	}

	// Add attachments to note data
	jsonData.attachments = attachments;

	// Simplified batch structure without meta values
	const batchData = {
		'0': {
			json: jsonData,
		},
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
