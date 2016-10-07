// Create keyword list string	
function keyolize(o){
	var s = '';

	if(!Array.isArray(o)){
		var t = typeof(o);

		if(t == 'string' || t == 'number'){
			s += o;
		}else if(t = 'object'){
			for(var key in o){
				if(o.hasOwnProperty){
					if(o.hasOwnProperty(key)){
						s += keyolize(o[key]);
					}
				}else{
					s += keyolize(o[key]);
				}
			}
		}
	}else{
		var i = o.length;
		while(i-- > 0){
			s+= keyolize(o[i]);
		}
	}
	return s;
}
function empty(node){
	var 	i = node.childNodes.length;

	while(i-- > 0){
		node.removeChild(node.childNodes[i]);
	}
};
//===================================
// TableKit
//===================================
function TableKit(conf){
	this.co = {};
	this._conf = conf;
	this.$el = Cr('div', 'tk_wrap ' + conf.className);
	this.$root = this.$el.append('div', 'tk_root');
	this.$body = this.$root.append('div', 'tk_body');
	this.$head = this.$root.append('div', 'tk_head');
}
TableKit.prototype.addScheme = function(scheme, conf){
	var 	_self = this,
			conf = conf || {};
	
	this._scheme = scheme;
	this._sortDirection = false; // true - by increase, false - by decending; state for click
	this._sortIndex = [];
	this._isFilterable = conf.isFilterable;
	
	if(conf.sortBy){
		this._sortBy = conf.sortBy;
		this._sortMethod = conf.sortMethod.bind(this);
	}
	// Render header
	empty(this.$head.el);
	!conf.withoutHeader && this.$head.
		append('div', 'tk_row').
		alias('headRow', this.co).
		add(Cr.list(scheme, function(columnConfig){
			var cell = columnConfig.head().root;
		
			if(columnConfig.id == conf.sortBy){
				cell.classList.add('__sortbtn');
				cell.onclick = function(){
					_self._sortDirection = !_self._sortDirection;
					_self.sort(_self._sortDirection);
					cell.classList[_self._sortDirection ? 'add': 'remove']('__reverse');
				};
			} 
			return cell;
		}));
}

TableKit.prototype.render = function(collection){
	empty(this.$body.el);
	this._sortDirection = false; 
	this._sortIndex.length = 0;
	
	

	this.$body.add(Cr.list(collection, function(rowData){
		var 	keywords = '',
				_table = this;
		
		var row = Cr('div', 'tk_row').add(Cr.list(this._scheme, function(conf){
			var node = conf.body(rowData);
			if(conf.nowrap){
				node.el.style.whiteSpace = 'nowrap';
			}

			if(_table._isFilterable){
				keywords += keyolize(rowData[conf.id]).replace(/[^\w\d\s]/g, '');
			}
			return node.root;
		}));

		if(this._sortBy || this._isFilterable){
			var 	indexItem = {};
			
			if(this._sortBy){
				indexItem.key = rowData[this._sortBy];
			}
			if(this._isFilterable){
				indexItem.keywords = keywords.trim().replace(/\s+/g, '').toLowerCase(); // Property for filtering
			}

			row.alias('row', indexItem);
			this._sortIndex.push(indexItem);
		}
		return row;
		
//		return Cr('div', 'tk_row').add(Cr.list(this._scheme, function(conf){
//			var node = conf.body(rowData);
//			return node.root;
//		})).root;
	}.bind(this)));
	this._fixScrollOffset();
	this._conf.freeze && this._freeze();
}
TableKit.prototype._fixScrollOffset = function(){
	setTimeout(function(){
		var 	tbody = this.$body.el,
				diff = tbody.offsetWidth - tbody.clientWidth;

		this.$head.el.style.paddingRight = diff + 'px';
	}.bind(this), 0);
};
TableKit.prototype._freeze = function(){
	var 	scrollHandler;

	this._resizeListener = this._fixScrollOffset.bind(this);
	window.addEventListener('resize', this._resizeListener);

	if(this._conf.freezeColumnWidth){ // Freeze first column
		this._withSelector('.tk_body-cell:first-child,.tk_head-cell:first-child', function(cell){
			cell.style.position = 'absolute';
			cell.style.left = 0;
		});
		this.$root.el.style.paddingLeft = this._conf.freezeColumnWidth + 'px';	
		scrollHandler = function(e){
			var 	_topOffset = e.target.scrollTop;
			
			
			this.co.headRow.scrollLeft = e.target.scrollLeft;

//			console.log('SCROLL %s', _topOffset);
//			console.dir(e);
//			console.dir(e.target);

			this._withSelector('.tk_body-cell:first-child', function(cell){
				cell.style.marginTop = -_topOffset + 'px';
				// FF fix!!
//				cell.style.paddingTop = _topOffset + 'px';
			});
		};
	}else{
		scrollHandler = function(e){
			var 	_topOffset = (-e.target.scrollTop) + 'px';

			this.co.headRow.scrollLeft = e.target.scrollLeft;
		};
	}
	this.$body.el.onscroll = scrollHandler.bind(this);
	this.$root.el.style.width = this._conf.freezeWidth;
	this.$root.el.style.height = this._conf.freezeHeight;
};
TableKit.prototype._withSelector = function(selector, cb){
	var 	firstCells = this.$root.root.querySelectorAll(selector),
			i = firstCells.length;

	while(i-- > 0){
		cb(firstCells[i]);
	}
};
TableKit.prototype.remove = function(){
	this.$body.el.onscroll = null;
	this._resizeListener && window.removeEventListener('resize', this._resizeListener);
};

TableKit.prototype.sort = function(direction){
	var 	sortedList = this._sortIndex.sort(this._sortMethod),
			len = sortedList.length; 
	
	for(var i = 0; i < len; i++){
		this.$body.el.appendChild(sortedList[i].row);
	}
};
TableKit.prototype.filter = function(query){
	var 	i = this._sortIndex.length,
			query = query.replace(/[^\w\d\s]/g, '').toLowerCase(),
			item;
	
	while(i-- > 0){
		item = this._sortIndex[i];

		if(query){
			if(item.keywords && item.keywords.indexOf(query) != -1){
				item.row.style.display = '';
			}else{
				item.row.style.display = 'none';	
			}
		}else{
			item.row.style.display = '';
		}
	}
};
