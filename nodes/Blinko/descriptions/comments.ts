import { INodeProperties } from 'n8n-workflow';

export const commentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['comments'],
			},
		},
		options: [
			{
				name: 'Create Comment',
				value: 'createComment',
				description: 'Create a new comment',
				action: 'Create a comment',
			},
			{
				name: 'Get Many',
				value: 'listComments',
				description: 'Get comments for a note',
				action: 'Get comments for a note',
			},
		],
		default: 'listComments',
	},
];

export const commentFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                             comments:listComments                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['listComments', 'createComment'],
			},
		},
		required: true,
		description: 'ID of the note to get comments for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['listComments'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 30,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['listComments'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['listComments'],
			},
		},
		options: [
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'desc',
					},
				],
				default: 'desc',
				description: 'Order of the results',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                             comments:createComment                          */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['createComment'],
			},
		},
		default: '',
		description: 'Content of the comment',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['createComment'],
			},
		},
		options: [
			{
				displayName: 'Parent Comment ID',
				name: 'parentId',
				type: 'number',
				default: 0,
				description: 'ID of the parent comment if this is a reply',
			},
			{
				displayName: 'Guest Name',
				name: 'guestName',
				type: 'string',
				default: '',
				description: 'Name to use for guest comment. Note: When using guest name, the request will be sent without authentication token',
			},
		],
	},
];
