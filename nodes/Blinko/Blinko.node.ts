import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

// Import operations
import { createNote } from './operations/notes/createNote';
import { deleteNote } from './operations/notes/deleteNote';
import { getById } from './operations/notes/getById';
import { getNotes } from './operations/notes/getNotes';
import { shareNote } from './operations/notes/shareNote';
import { updateNote } from './operations/notes/updateNote';
import { uploadFile } from './operations/attachments/uploadFile';
import { listAttachments } from './operations/attachments/listAttachments';
import { listTags } from './operations/tags/listTags';
import { deleteTag } from './operations/tags/deleteTag';
import { editTag } from './operations/tags/editTag';
import { listComments } from './operations/comments/listComments';
import { createComment } from './operations/comments/createComment';

// Import descriptions
import { description } from './descriptions';

// Import helpers
import { getCredentialsAndBaseUrl } from './helpers';

// Credentials
import { BlinkoApiCredentials } from '../../credentials/BlinkoApi.credentials';


export class Blinko implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Blinko',
		name: 'blinko',
		icon: 'file:blinko.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Blinko API',
		defaults: {
			name: 'Blinko',
		},
		inputs: [{ type: NodeConnectionType.Main }],
		outputs: [{ type: NodeConnectionType.Main }],
		credentials: [
			{
				name: BlinkoApiCredentials.name,
				required: true,
			},
		],
		properties: description,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		let responseData: IDataObject = {};

		// Get credentials and base URL
		const { apiBaseUrl, requestOptions } = await getCredentialsAndBaseUrl.call(this);

		for (let i = 0; i < length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				switch (resource) {
					case 'notes':
						switch (operation) {
							case 'create':
								responseData = await createNote.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'update':
								responseData = await updateNote.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'delete':
								responseData = await deleteNote.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'share':
								responseData = await shareNote.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'getNotes':
								responseData = await getNotes.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'getById':
								responseData = await getById.call(this, i, apiBaseUrl, requestOptions);
								break;
							default:
								throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);
						}
						break;

					case 'attachments':
						switch (operation) {
							case 'upload':
								responseData = await uploadFile.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'list':
								responseData = await listAttachments.call(this, i, apiBaseUrl, requestOptions);
								break;
							default:
								throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);
						}
						break;

					case 'tags':
						switch (operation) {
							case 'list':
								responseData = await listTags.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'delete':
								responseData = await deleteTag.call(this, i, apiBaseUrl, requestOptions);
								break;
							case 'edit':
								responseData = await editTag.call(this, i, apiBaseUrl, requestOptions);
								break;
							default:
								throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);
						}
						break;

					case 'comments':
						if (operation === 'listComments') {
							responseData = await listComments.call(this, i, apiBaseUrl, requestOptions);
						}
						if (operation === 'createComment') {
							responseData = await createComment.call(this, i, apiBaseUrl, requestOptions);
						}
						break;

					default:
						throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported!`);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
