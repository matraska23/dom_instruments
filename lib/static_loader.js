// For IE: not supported document.currentScript
if(typeof(document.currentScript) == 'undefined'){
	// var scripts = document.getElementsByTagName('script');
	// document.currentScript = scripts[scripts.length - 1];
	Object.defineProperty(document, 'currentScript', {
		get: function(){
			var scripts = document.getElementsByTagName('script');
			return scripts[scripts.length - 1];			
		}
	});
}
// Fix Function#name on browsers that do not support it (IE):
if (!(function f() {}).name) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var name = this.toString().match(/^function\s*([^\s(]+)/)[1];
            // For better performance only parse once, and then cache the
            // result through a new accessor for repeated access.
            Object.defineProperty(this, 'name', { value: name });
            return name;
        }
    });
}
//=========================================
// Static loader
//=========================================
(function(_global){
	function appendAfter(after, node){
		if(after.nextSibling){
			after.parentNode.insertBefore(node, after.nextSibling);
		}else{
			after.parentNode.appendChild(node);
		}
		return node;
	};
	
	function StaticLoader(scriptRoot){
		this._currentScript = scriptRoot;
	}
	StaticLoader.prototype.loadScript = function(paths, complete){
		var 	path = paths.shift();
		
		if(path){
			var 	$script = document.createElement('script');

			$script.onload = function(e){
				this._currentScript = e.target;
				this.loadScript(paths, complete); // continue from here
			}.bind(this);

			$script.src = path;
			appendAfter(this._currentScript, $script);
		}else if(complete){
			complete();
		}
	}

	function Deprovider(){
		this.stack = Object.create(null);
		this.dependencies = Object.create(null);
		this.cache = Object.create(null);
	}
	Deprovider.prototype = {
		define: function(){
			var 	dependencies, constructor;

			if(arguments.length == 2){
				dependencies = arguments[0];
				constructor = arguments[1];
			}else{
				constructor = arguments[0];
			}

			if(constructor && constructor.name){
				this.stack[constructor.name] = constructor;
				
				if(Array.isArray(dependencies)){
					this.dependencies[constructor.name] = dependencies;
				}
			}
		},
		require: function(name){
			if(this.cache[name]){
				return this.cache[name];
			}else if(this.stack[name]){
				var 	constr = this.stack[name],
						deps,
						i;

				if(deps = this.dependencies[name]){
					i = deps.length;
					while(i-- > 0){
						deps[i] = this.require(deps[i]);
					}
				}

				return this.cache[name] = constr.apply(null, deps);
			}
		}
	}

	var 	$doc = document.currentScript,
			path = $doc.dataset.main,
			dp = new Deprovider();


	_global.require = dp.require.bind(dp);
	_global.define = dp.define.bind(dp);
	_global.StaticLoader = new StaticLoader($doc);

	_global.StaticLoader.loadScript([path]);
}(this));
