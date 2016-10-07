function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//===================================
// Test
//===================================
var tk = new TableKit({
	className: 'custom_table',
	// Freeze settings:
	freeze: true,
	freezeColumnWidth: 120,
	freezeWidth: '500px',
	freezeHeight: '100vh',
});
tk.addScheme([{
		id: 'col0',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head1');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col0);
		}
	}, {
		id: 'col1',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head2');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col1);
		}	
	}, {
		id: 'col2',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head3');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col2);
		}	
	}, {
		id: 'col3',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head4');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col3);
		}	
	}, {
		id: 'col4',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head5');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col4);
		}	
	}, {
		id: 'col5',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head6');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col5);
		}	
	}, {
		id: 'col6',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head7');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col6);
		}	
	}, {
		id: 'col7',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head7');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col7);
		}	
	}, {
		id: 'col8',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head8');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col8);
		}	
	}, {
		id: 'col9',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head9');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col9);
		}	
	}, {
		id: 'col10',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head10');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col10);
		}	
	}, {
		id: 'col11',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head11');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col11);
		}	
	}, {
		id: 'col12',
		head: function(){
			return Cr('div', 'tk_head-cell custom_cell', 'Head12');
		},
		body: function(d){
			return Cr('div', 'tk_body-cell custom_cell', d.col12);
		}	
}], {
	sortBy: 'col0', // id of column
	sortMethod: function(a, b){
		var k = this._sortDirection ? 1 : -1;
		return a.key > b.key ? k : a.key < b.key ? -k : 0;
	},
	isFilterable: true,
});

var $wrap = document.getElementById('wrap');

$wrap.appendChild(tk.$el.root);

tk.render(Array.apply(null, {length: 20}).map(function(){
	return {
		col0: getRandomInt(0, 1000000),
		col1: getRandomInt(0, 1000000),
		col2: getRandomInt(0, 1000000),
		col3: getRandomInt(0, 1000000),
		col4: getRandomInt(0, 1000000),
		col5: getRandomInt(0, 1000000),
		col6: getRandomInt(0, 1000000),
		col7: getRandomInt(0, 1000000),
		col8: getRandomInt(0, 1000000),
		col9: getRandomInt(0, 1000000),
		col10: getRandomInt(0, 1000000),
		col11: getRandomInt(0, 1000000),
		col12: getRandomInt(0, 1000000),
	};
}));