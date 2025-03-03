import { INodeProperties } from 'n8n-workflow';

export const tagsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tags'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a tag',
				action: 'Delete a tag',
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get all tags',
				action: 'Get all tags',
			},
		],
		default: 'list',
	},
];

export const tagsFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                tags:list                                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Name Prefix',
				name: 'namePrefix',
				type: 'string',
				default: '',
				description: 'Filter tags that start with this prefix (e.g., "A" will return all tags starting with A)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                tags:delete                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the tag to delete',
	},
	{
		displayName: 'Delete Associated Notes',
		name: 'withAllNotes',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['delete'],
			},
		},
		description: 'Whether to also delete all notes associated with this tag',
	},
];
