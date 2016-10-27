function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//===================================
// Test
//===================================
var TABLE_CONF = {
	className: 'custom_table',
	sortBy: 'name', // id of column
	sortMethod: function (a, b) {
		var k = this.conf.sortDirection ? 1 : -1;
		return a.key > b.key ? k : a.key < b.key ? -k : 0;
	},
	isFilterable: true,
};
var TABLE_SCHEME = [
	{
		id: 'name',
		head: function(){
			return Cr('td', 'tk_head-cell custom_cell', 'Name');
		},
		cell: function(d){
			return Cr('td', 'tk_body-cell custom_cell', d.name);
		}
	}, {
		id: 'count',
		head: function(){
			return Cr('td', 'tk_head-cell custom_cell', 'Count');
		},
		cell: function(d){
			return Cr('td', 'tk_body-cell custom_cell', d.count);
		}	
	}, {
		id: 'total',
		head: function(){
			return Cr('td', 'tk_head-cell custom_cell', 'Total');
		},
		cell: function(d){
			return Cr('td', 'tk_body-cell custom_cell', d.total);
		}	
	}];

//===================================
// Test
//===================================
var 	tk = new TableWidget(TABLE_CONF),
		$wrap = document.getElementById('wrap'),
		$btn = document.getElementById('btn');

tk.setScheme(TABLE_SCHEME);
$wrap.appendChild(tk.$el.root);
tk.render(Array.apply(null, {length: 5}).map(function(){
	return {
		name: getRandomInt(0, 1000000),
		count: getRandomInt(0, 1000000),
		total: getRandomInt(0, 1000000),
	};
}));

$btn.onclick = function(){
	var row = tk.append({
		name: getRandomInt(0, 1000000),
		count: getRandomInt(0, 1000000),
		total: getRandomInt(0, 1000000),
	});
	
	console.log('Added row');
	console.dir(row);
}