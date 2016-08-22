define(['VLib'], function Vtest(V){

	var $svg = V('svg').attr({
		viewbox: '0 0 500 300',
		width: 500,
		height: 300
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

	document.body.appendChild($svg.root);


	document.body.appendChild(
		V.svg('0 0 500 300', 500, 300).
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
		root);

});

