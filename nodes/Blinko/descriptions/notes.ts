import { INodeProperties } from 'n8n-workflow';

export const notesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['notes'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a note',
				action: 'Create a note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a note',
				action: 'Delete a note',
			},
			{
				name: 'Get',
				value: 'getById',
				description: 'Get a note by ID',
				action: 'Get a note by ID',
			},
			{
				name: 'Get Many',
				value: 'getNotes',
				description: 'Get many notes',
				action: 'Get many notes',
			},
			{
				name: 'Share',
				value: 'share',
				description: 'Share a note',
				action: 'Share a note',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a note',
				action: 'Update a note',
			},
		],
		default: 'create',
	},
];

export const notesFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                notes:create                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'Content of the note',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Tags for the note (comma-separated)',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Blinko',
						value: 0,
					},
					{
						name: 'Note',
						value: 1,
					},
				],
				default: 0,
				description: 'Type of the note (0 = Blinko, 1 = Note)',
			},
			{
				displayName: 'Is Top',
				name: 'isTop',
				type: 'boolean',
				default: false,
				description: 'Whether the note is pinned to top',
			},
			{
				displayName: 'Is Share',
				name: 'isShare',
				type: 'boolean',
				default: false,
				description: 'Whether the note is shared',
			},
			{
				displayName: 'Attachments',
				name: 'attachments',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'attachmentValues',
						displayName: 'Attachment',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the attachment',
							},
							{
								displayName: 'Path',
								name: 'path',
								type: 'string',
								default: '',
								description: 'Path of the attachment',
							},
							{
								displayName: 'Size',
								name: 'size',
								type: 'number',
								default: 0,
								description: 'Size of the attachment in bytes',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'string',
								default: '',
								description: 'MIME type of the attachment',
							},
						],
					},
				],
				description: 'Attachments to add to the note',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                notes:update                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['update'],
			},
		},
		required: true,
		description: 'ID of the note to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				description: 'Content of the note',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Blinko',
						value: 0,
					},
					{
						name: 'Note',
						value: 1,
					},
				],
				default: 0,
				description: 'Type of the note (0 = Blinko, 1 = Note)',
			},
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				description: 'Whether the note is archived',
			},
			{
				displayName: 'Is Top',
				name: 'isTop',
				type: 'boolean',
				default: false,
				description: 'Whether the note is pinned to top',
			},
			{
				displayName: 'Is Share',
				name: 'isShare',
				type: 'boolean',
				default: false,
				description: 'Whether the note is shared',
			},
			{
				displayName: 'Is Recycle',
				name: 'isRecycle',
				type: 'boolean',
				default: false,
				description: 'Whether the note is in recycle bin',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Tags for the note (comma-separated)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                notes:delete                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['delete'],
			},
		},
		required: true,
		description: 'ID of the note to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                notes:getById                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['getById'],
			},
		},
		required: true,
		description: 'ID of the note to get',
	},

	/* -------------------------------------------------------------------------- */
	/*                                notes:getNotes                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['getNotes'],
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
				resource: ['notes'],
				operation: ['getNotes'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 30,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['getNotes'],
			},
		},
		options: [
			{
				name: 'All',
				value: -1,
				description: 'Get all notes (both Blinko and normal notes)',
			},
			{
				name: 'Notes',
				value: 0,
				description: 'Get only normal notes',
			},
			{
				name: 'Blinko',
				value: 1,
				description: 'Get only Blinko notes',
			},
		],
		default: -1,
		description: 'Type of notes to get',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['getNotes'],
			},
		},
		options: [
			{
				displayName: 'Tag ID',
				name: 'tagId',
				type: 'string',
				default: '',
				description: 'Filter notes by tag ID',
			},
			{
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				description: 'Whether to include archived notes',
			},
			{
				displayName: 'With File',
				name: 'withFile',
				type: 'boolean',
				default: false,
				description: 'Whether to include only notes with files',
			},
			{
				displayName: 'Search Text',
				name: 'searchText',
				type: 'string',
				default: '',
				description: 'Text to filter notes by',
			},
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
	/*                                notes:share                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['share'],
			},
		},
		required: true,
		description: 'ID of the note to share',
	},
	{
		displayName: 'Share Note',
		name: 'shareNote',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['share'],
			},
		},
		description: 'Whether to share or unshare the note',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['share'],
				shareNote: [true],
			},
		},
		description: 'Password to protect the shared note',
	},
	{
		displayName: 'Expire Date',
		name: 'expireAt',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['notes'],
				operation: ['share'],
				shareNote: [true],
			},
		},
		description: 'Date when the shared note will expire',
	},
];
