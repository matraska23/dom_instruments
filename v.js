// V mean SVG // v2 2016/08/19

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
		this.root = this.el;
	}
	V.prototype.SVG_NS = 'http://www.w3.org/2000/svg';
	V.prototype.XLINK_NS = 'http://www.w3.org/1999/xlink';
	V.prototype.append = function(tagName){
		var inst = new V(tagName);
		this.el.appendChild(inst.el);
		inst.root = this.el;
		return inst;
	};
	V.prototype.add = function(tagName, attributes){
		return this.append(tagName).attr(attributes);
	};
	V.prototype.node = function(){
		return this.el;
	};
	V.prototype.parent = function(){
		if(this.el.parentNode){
			this.el = this.el.parentNode;	
		}
		
		return this;
	};
	// @param {String} arg1 - attribute name
	// @param {String} arg2 - attribute value
	// or
	// @param {Object} arg1 - collection of attributes
	// Attention: NS of property can be determined like 'xlink:href'
	V.prototype.attr = function(arg1, arg2){
		// V.prototype.XLINK_NS
		var key, ns, pos, value;

		if(typeof(arg1) == 'string'){
			key = arg1;
			pos = arg1.indexOf(':');

			if(pos == -1){
				ns = null;
			}else{
				ns = key.substr(0, pos) == 'xlink' && this.XLINK_NS;
				key = key.substr(pos + 1);
			}
			this.el.setAttributeNS(ns, key, arg2);
		}else{
			for(key in arg1){
				pos = key.indexOf(':');
				value = arg1[key];

				if(pos == -1){
					ns = null;
				}else{
					ns = key.substr(0, pos) == 'xlink' && this.XLINK_NS;
					key = key.substr(pos + 1);
				}

				this.el.setAttributeNS(ns, key, value);
			}
		}
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
		if(!collection){
			this.co = this.co || {};
			this.co[name] = this;
		}else{
			collection[name] = this;
		}
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
	}

	if(typeof(define) == 'function'){
		define(function VLib(){
			return V;
		});
	}else{
		_global.V = V;
	}
}(this));
