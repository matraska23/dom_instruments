// Cr v. 4 2016/08/03

function Cr(tagName, className, text){
	if(!(this instanceof Cr)){
		return new Cr(tagName, className, text);
	}

	this.el = document.createElement(tagName);
	this.el.textContent = text || '';
	this.el.className = className || '';
}
Cr.prototype.prop = function(){
	for(var i = 0, m = arguments.length; i < m; i += 2){
		if(arguments[i] && arguments[i + 1]){
			this.el[arguments[i]] = arguments[i + 1];
		}
	}
	return this;
};
Cr.prototype.add = function(){
	for(var i = 0, len = arguments.length; i < len; i++){
		this.el.appendChild(arguments[i] instanceof this.constructor ? arguments[i].el : arguments[i]);
	}
	return this;
};
Cr.prototype.with = function(cb){
	cb(this.el);
	return this;
};
Cr.prototype.data = function(key, value){
	this.el.setAttribute('data-' + key, value);

	if(this.el.dataset){
		this.el.dataset[key] = value;	
	}
	return this;
};
Cr.prototype.alias = function(name, co){
	this.name = name;

	if(co){
		co[name] = this.el;
	}
	return this;
};
Cr.fr = function(){
	var 	fr = document.createDocumentFragment();

	for(var i = 0, len = arguments.length; i < len; i++){
		if(arguments[i] instanceof Cr){
			fr.appendChild(arguments[i].el);
		}
	}
	return fr;
};
Cr.list = function(list, callback){
	var 	fr = document.createDocumentFragment(), 
			i, inst;

	for(i in list){
		inst = callback(list[i], i);
		fr.appendChild(inst instanceof Cr ? inst.el : inst);
	}
	return fr;
}
