import { INodeProperties } from 'n8n-workflow';

export const attachmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attachments'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List files',
				action: 'List files',
			},
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload a file',
				action: 'Upload a file',
			},
		],
		default: 'list',
	},
];

export const attachmentFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                attachment:upload                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['attachments'],
				operation: ['upload'],
			},
		},
		description: 'Name of the binary property containing the data to be uploaded',
	},

	/* -------------------------------------------------------------------------- */
	/*                                attachment:list                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['attachments'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['attachments'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['attachments'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Folder',
				name: 'folder',
				type: 'string',
				default: '',
				description: 'Folder to list files from',
			},
			{
				displayName: 'Search Text',
				name: 'searchText',
				type: 'string',
				default: '',
				description: 'Text to search for in file names',
			},
		],
	},
];
