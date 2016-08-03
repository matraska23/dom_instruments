//===================================
// Constructor
//===================================
console.log('Example #1. Constructor');
console.group();
console.dir(
	Cr('div', 'ex1_wrap', 'hello world')
);
/*
`Cr('div', 'ex1_wrap')` Create Tag <div class="ex1_wrap">hello world</div> as root element of chain
Arguments:
1 - tag name 
2 - class name (optional)
3 - text content (optional)
*/
Cr('div', 'ex1_wrap').prop('title', 'text on hover', )
console.groupEnd();
//===================================
// Properties
//===================================
console.log('Example #2. Properties');
console.group();
console.dir(
	Cr('label', 'ex2_label').prop('title', 'text on hover')
);
console.dir(
	Cr('input', 'ex2_checkbox').prop('type', 'checkbox', 'checked', true);
);
/*
prop() method configure element properties.
Each odd argument - name of element property, each even argument - value of elemnt property.
*/
console.groupEnd();
//===================================
// Data attributes
//===================================
console.log('Example #3. Add data attribute to node');
console.group();
console.dir(
	Cr('div').data('id', 'unique identifier')
);
/*
`data('id', 'unique identifier')` create attribute `data-id` with value `unique identifier`
*/
console.groupEnd();
//===================================
// Nested elements
//===================================
console.log('Example #4. Adding nested elements');
console.group();
console.dir(
	Cr('div').add(
		Cr('span', 'ex4_first'),
		Cr('span', 'ex4_second'),
		Cr('div', 'ex4_wrap').add(
			Cr('div', 'ex4_inner')
		),
		document.createElement('table') // DOM element can be inserted too
	)
);
/*
add() method insert all elements from arguments at parent element
*/
console.groupEnd();
//===================================
// Fragment
//===================================
console.log('Example #5. Create DocumentFragment');
console.group();
console.dir(
	Cr.fr(
		Cr('span', 'ex4_first'),
		Cr('span', 'ex4_second'),
		Cr('div', 'ex4_wrap').add(
			Cr('div', 'ex4_inner')
		),
		document.createElement('table') // DOM element can be inserted too
	)
);
/*
Cr.fr() - create DocumentFragment with nested elements from arguments
*/
console.groupEnd();
//===================================
// Binding node
//===================================
console.log('Example #6. Collect references on elements');
console.group();
var 	controls = {};

console.dir(
	Cr.fr(
		Cr('span', 'ex4_first').alias('first', controls),
		Cr('span', 'ex4_second'),
		Cr('div', 'ex4_wrap').add(
			Cr('div', 'ex4_inner').alias('inner', controls)
		),
		document.createElement('table') // DOM element can be inserted too
	)
);
console.dir(controls);
/*
`alias(name, collection)` method store reference on DOM element at collection object by name property
*/
//===================================
// Generate nodes by list
//===================================
console.log('Example #7. Adding collection of nodes ');
console.group();

var collection = [
	{
		country: 'Russia',
		capital: 'Moscow'
	}, {
		country: 'Germany',
		capital: 'Berlin'
	}, {
		country: 'France',
		capital: 'Paris'
	}, {
		country: 'Grate Britain',
		capital: 'London'
	}
];
console.dir(
	Cr.list(collection, function(item, i){
		// i - index of item
		return Cr('div').add(
			Cr('span', 'ex7_country', item.country),
			Cr('span', 'ex7_capital', item.capital)
		);
	});
);
/*
Cr.list() method work with arrays and plain objects
*/
console.groupEnd();