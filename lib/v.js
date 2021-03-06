// V mean SVG // v4 2016/09/02

/*
// For collection return another constructor like Collection

// var g = V('g');
// var circle1 = g.append('circle');
// var circle2 = circle1.append('circle'); 
*/
(function(_global){
	function V(tagName){
		if(!(this instanceof V)){
			return new V(tagName);
		}

		this.el = tagName instanceof SVGElement ? tagName : document.createElementNS(this.SVG_NS, tagName);
		this._root = this.el;
	}
	V.prototype.SVG_NS = 'http://www.w3.org/2000/svg';
	V.prototype.XLINK_NS = 'http://www.w3.org/1999/xlink';
	V.prototype.append = function(arg1){
		var inst = !(arg1 instanceof V) ? new V(arg1) : arg1;
		this.el.appendChild(inst._root);
		inst._root = this._root;
		return inst;
	};
	V.prototype.add = function(tagName, attributes){
		return this.append(tagName).attr(attributes);
	};
	V.prototype.node = function(){
		return this.el;
	};
	V.prototype.parent = function(isRoot){
		this.el = !isRoot ? (this.el.parentNode || this.el) : this._root;
		return this;
	};
	// @param {String} arg1 - attribute name
	// @param {String} arg2 - attribute value
	// or
	// @param {Object} arg1 - collection of attributes
	// Attention: NS of property can be determined like 'xlink:href'
	V.prototype.attr = function(arg1, arg2){
		if(typeof(arg1) == 'string'){
			// DEPRICATED
			// this._attr(arg1, arg2);	
			if(arguments.length == 2){
				console.log('set attr %s %s', arg1, arg2);
				this._attr(arg1, arg2);		
			}else{
				return this.el.getAttribute(arg1);
			}
		}else{
			for(var key in arg1){
				this._attr(key, arg1[key]);
			}
		}
		return this;
	};
	V.prototype.style = function(collection){
		for(var key in collection){
			this.el.style[key] = collection[key];
		}
		return this;
	}
	V.prototype._attr = function(key, value){
		var 	pos = key.indexOf(':'),
				ns = pos > -1 ? key.substr(0, pos) == 'xlink' && this.XLINK_NS : null;

		this.el.setAttributeNS(ns, key, value);
		return this;
	};
	V.prototype.p = function(){
		if(arguments.length == 2){
			this.el[arguments[0]] = [arguments[1]];
			return this;
		}else{
			return this.el[arguments[0]];
		}
	}
	V.prototype.alias = function(name, collection){
		var co = collection || this.co || Object.create(null);
		co[name] = this.el;
		return this;
	};
	V.prototype.hide = function(){
		this.el.setAttributeNS(null, 'visibility', 'hidden');
		return this;
	};
	V.prototype.show = function(){
		this.el.setAttributeNS(null, 'visibility', 'visible');
		return this;
	};
	V.prototype.use = function(cb){
		cb(this);
		return this;
	};
	// Set text content of element
	// @param {String} text
	V.prototype.text = function(text){
		this.el.appendChild(document.createTextNode(text));
		return this;
	};
	// Attention: left offset gets from parent's attribute `x`
	// @param {String} text
	// @param {Int} lineHeight
	V.prototype.lines = function(text, lineHeight){
		var 	parts = text.split(/\n/g),
				parentX = this.el.getAttribute('x') || 0,
				pan,
				i = 0;

		for(; i < parts.length; i++){
			pan = document.createElementNS(this.SVG_NS, 'tspan');
			pan.appendChild(document.createTextNode(parts[i]));
			pan.setAttributeNS(null, 'x', parentX);
			pan.setAttributeNS(null, 'dy', lineHeight || this.el.getAttribute('font-size'));
			this.el.appendChild(pan);	
		}
		
		return this;
	};

	//========================================
	// Static methods
	//========================================
	// @param {String} v - viewbox
	// @param {Int} w - width
	// @param {Int} h - height
	V.svg = function(v, w, h){
		return new V('svg').
			_attr('viewbox', v).
			_attr('width', w).
			_attr('height', h);
	}

	if(typeof(define) == 'function'){
		define(function VLib(){
			return V;
		});
	}else{
		_global.V = V;
	}
	
}(this));


/*
getComputedTextLength()
*/