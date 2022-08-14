module.exports = function (plop) {
	// module generator
	plop.setGenerator('module-sanity', {
		description: 'React component generator with sanity bindings',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'module name please'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'components/{{componentName}}/{{componentName}}.jsx',
				templateFile: 'plop-templates/Module/Module.jsx.hbs'
			},
			{
				type: 'add',
				path: 'components/{{componentName}}/index.js',
				templateFile: 'plop-templates/export.js.hbs'
			},
			{
				type: 'append',
				path: 'queries/modules.js',
				pattern: /\/\/ plopAddModules/g,
				template: '	_type == "{{camelCase componentName}}" => {...},'
			},
			// Create Schema File
			{
				type: 'add',
				path: '../studio/schemas/modules/{{camelCase componentName}}.js',
				templateFile: 'plop-templates/Module/ModuleSchema.js.hbs'
			},
			// Add to ComponentRenderer
			{
				type: 'append',
				path: 'components/ComponentRenderer/ComponentRenderer.jsx',
				pattern: /\/\/ plopImportModules/g,
				template: "import {{componentName}} from 'components/{{componentName}}'",
			},
			{
				type: 'append',
				path: 'components/ComponentRenderer/ComponentRenderer.jsx',
				pattern: /\/\/ plopAddModules/g,
				template: '	{{camelCase componentName}}: {{componentName}},',
			},
			// Add schema import
			{
				type: 'append',
				path: '../studio/schemas/schemas.js',
				pattern: /\/\/ plopImportModules/g,
				template: "import {{camelCase componentName}} from './modules/{{camelCase componentName}}'",
			},
			// Add schema to schema list
			{
				type: 'append',
				path: '../studio/schemas/schemas.js',
				pattern: /\/\/ plopAddModules/g,
				template: '		{{camelCase componentName}},',
			},
			// Add type to moduleContent
			{
				type: 'append',
				path: '../studio/schemas/modules/moduleContent.js',
				pattern: /\/\/ plopAddModules/g,
				template: "		{ type: '{{camelCase componentName}}' },",
			}
		]
	})
	plop.setHelper('toLowerCase', str => str.toLowerCase())
	plop.setHelper('titleCase', str => {
		if (typeof str === 'undefined') {
			return ''
		}

		return (
			str.replace(
				/\w\S*/g,
				txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			)
		)
	})
}
