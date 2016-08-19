// V mean SVG // v 1 2016/08/18

function V(tagName){
	if(!(this instanceof arguments.callee)){
		return new arguments.callee(tagName);
	}

	this.el = tagName instanceof SVGElement ? tagName : document.createElementNS("http://www.w3.org/2000/svg", tagName);
	this.root = this.el;
}
V.prototype.append = function(tagName){
	var inst = new V(tagName);
	this.el.appendChild(inst.el);
	inst.root = this.el;
	return inst;
};
V.prototype.node = function(){
	return this.el;
};
V.prototype.attr = function(arg1, arg2){
	if(typeof(arg1) == 'string'){
		this.el.setAttributeNS(null, arg1, arg2);
	}else{
		for(var key in arg1){
			this.el.setAttributeNS(null, key, arg1[key]);
		}
	}
	return this;
};
V.prototype.p = function(propName, value){
	this.el[propName] = value;
	return this;
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

// For collection return another constructor like Collection

// var g = V('g');
// var circle1 = g.append('circle');
// var circle2 = circle1.append('circle'); 