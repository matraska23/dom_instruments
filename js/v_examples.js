define(['VLib'], function Vtest(V){
	console.log('script test');
//===========================
// Patterns
//===========================
var $svg = V('svg').attr({
	viewbox: '0 0 300 200',
	width: 300,
	height: 200
})
// Display bitmap image at pattern
$svg.append('defs').
	add('pattern', {
		id: 'close-btn-pattern',
		// patternUnits: "userSpaceOnUse",
		x: 0,
		y: 0,
		width: 16,
		height: 16,
	}).
	add('image', {
		x: 0,
		y: 0,
		width: 16,
		height: 16,
		'xlink:href': 'img/close.png',
	});

// Display bitmap image at image
$svg.append('rect').attr({
		width: 16,
		height: 16,
		x: 20,
		y: 20,
		stroke: '#ccc',
		fill: 'url(#close-btn-pattern)',
	}).
	parent().
	append('image').
	attr('xlink:href', 'https://ru.wikipedia.org/static/images/project-logos/ruwiki.png').
	attr({
		x: 50,
		y: 20,
		width: 135,
		height: 155
	});

document.body.appendChild($svg._root);

//===========================
// Add multi line text
//===========================
document.body.appendChild(
	V.svg('0 0 200 200', 200, 200).
		add('text', {
			x: 13,
			y: 16,
			'font-size': 13,
			fill: '#afafaf',
		}).
		text('hello svg world!').
		parent().
		add('text', {
			x: 30,
			y: 42,
			'font-size': 18,
			fill: '#afafaf',
		}).
		lines('abc\n1234567890\nnew line', 20).
	_root);

//===========================
// Circles Debug
//===========================
document.body.appendChild(
	V.svg('0 0 200 200', 200, 200).
		add('circle', {
			cx: 50,
			cy: 50,
			r: 50,
			stroke: 'red',
			fill: 'orange'
		}).parent().
		add('text', {
			// dx: 50,
			// dy: 50,
			x: 50,
			y: 50,
			fill: '#000',
			'font-size': 36,
			'text-anchor': 'middle',
			'alignment-baseline': 'middle',
			'dominant-baseline': 'middle', // FF not supported alignment-baseline for <text>
		}).text('abc123').
	_root);

//===========================
// Pattern manager
//===========================
function PatternManager(id, $nodeHeap){
	if(!document.getElementById(id)){
		this.container = V('svg').attr({
			id: id
		}).style({
			width: 0,
			height: 0,
			float: 'left',
			overflow: 'hidden',
		});
		$nodeHeap.appendChild(this.container._root);
		this._stack = Object.create(null);
	}else{
		console.warn('Unnable to add new pattern manager width id `%s`, beacause find another node with same id', id)
	}
}
PatternManager.prototype.register = function(id, pattern){
	this._stack[id] = {
		width: pattern.attr('width'),
		height: pattern.attr('height'),
		fill: 'url(#' + id + ')'
	}
	pattern.parent(true).attr('id', id);

	// Where is Id???
	console.log('Register %s', pattern.attr('id'));
	console.dir(pattern);

	// return;
	this.container.append('defs').append(pattern);
};
PatternManager.prototype.get = function(id){
	var attributes = this._stack[id];

	return function(self){
		self.attr(attributes);
	}
}


var patternManager = new PatternManager('pm1', document.getElementById('node-heap'));
patternManager.register('notification-pattern',
	V('pattern').attr({
		x: 0,
		y: 0,
		width: 24,
		height: 24,
	}).append('image').attr({
		x: 0,
		y: 0,
		width: 24,
		height: 24,
		'xlink:href': 'img/notification.png',
	})
);
patternManager.register('user-pattern',
	V('pattern').attr({
		x: 0,
		y: 0,
		width: 24,
		height: 24,
	}).append('image').attr({
		x: 0,
		y: 0,
		width: 24,
		height: 24,
		'xlink:href': 'img/user.png',
	})
);

var i = 2;

while(i-- > 0){
	document.body.appendChild(
		V.svg('0 0 200 200', 200, 200).
			add('rect', {
				x: 10,
				y: 10,
				stroke: '#ccc',
			}).use(patternManager.get('notification-pattern')).parent().
			add('rect', {
				x: 40,
				y: 10,
				stroke: '#ccc',
			}).use(patternManager.get('user-pattern')).
		_root);
}


});
