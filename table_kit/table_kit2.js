//===================================
// TableWidget
//===================================	
(function(_env){
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

	// @param {Object} conf
	// @param {Bool} conf.withoutHeader
	function TableWidget(conf, scheme){
		this.$el = Cr('table', 'tabledata_root ' + conf.className);
		this.head = this.$el.append('thead');
		this.body = this.$el.append('tbody');
		
		this.conf = conf || {};
		this.conf.sortDirection = false; // true - by increase, false - by decending; state for click
		this.conf.sortIndex = [];
		this.conf.isFilterable = conf.isFilterable;
		
		if(conf.sortBy){
			this.conf.sortBy = conf.sortBy;
			this.conf.sortMethod = conf.sortMethod.bind(this);
		}
		
		if(scheme){
			this.setScheme(scheme, conf);
		}
		
	};
	TableWidget.prototype.setScheme = function(scheme){
		var 	self = this,
				conf = this.conf;

		this.scheme = scheme;
//		this._sortDirection = false; // true - by increase, false - by decending; state for click
//		this._sortIndex = [];
//		this._isFilterable = conf.isFilterable;
//		if(conf.sortBy){
//			this._sortBy = conf.sortBy;
//			this._sortMethod = conf.sortMethod.bind(this);
//		}
		
		this.empty(this.head.el);
		!this.conf.withoutHeader && this.head.append('tr').add(Cr.list(scheme, function(item){
//			var cell = Cr('td', 'tabledata_c ' + (item.className || '')).add(
//				Cr('span', 'tabledata_c-content', item.title)
//			);
			var cell = item.head();
			
			// Attention support sorting on one property
			if(item.id == conf.sortBy){
				cell.root.classList.add('__sortbtn')
				cell.root.onclick = function(){
					console.log('Change direction');
					conf.sortDirection = !conf.sortDirection;
					self.sort(conf.sortDirection);
					cell.root.classList[conf.sortDirection ? 'add': 'remove']('__reverse');
				}
			} 

			return cell;
		}));
	};
	TableWidget.prototype.render = function(collection){
		this.empty(this.body.el);
		this.conf.sortDirection = false; 
		this.conf.sortIndex.length = 0;
		
		var 	_table = this,
				_isFilterable = this.conf.isFilterable;
		
		this.body.add(Cr.list(collection, function(data){
			var 	_keywords = '';

			var row = Cr('tr').add(Cr.list(this.scheme, function(conf){
				var node = conf.cell(data, _table);
				
				if(conf.nowrap){
					node.style.whiteSpace = 'nowrap';
				}
				
				if(_isFilterable){
					_keywords += keyolize(data[conf.id]).replace(/[^\w\d\s]/g, '');
				}
				return node;
			}));

			if(this.conf.sortBy || this.conf.isFilterable){
				var 	indexItem = {};

				if(this.conf.sortBy){
					indexItem.key = data[this.conf.sortBy];
				}
				if(this.conf.isFilterable){
					indexItem.keywords = _keywords.trim().replace(/\s+/g, '').toLowerCase(); // Property for filtering
				}

				row.alias('row', indexItem);
				this.conf.sortIndex.push(indexItem)
			}

			return row;
		}.bind(this)));
		
	};
	TableWidget.prototype.empty = function(node){
		var 	i = node.childNodes.length;

		while(i-- > 0){
			node.removeChild(node.childNodes[i]);
		}
	};
	TableWidget.prototype.sort = function(direction){
		var 	sortedList = this.conf.sortIndex.sort(this.conf.sortMethod),
				len = sortedList.length; 
		
		for(var i = 0; i < len; i++){
			this.body.root.appendChild(sortedList[i].row);
		}
	};
	TableWidget.prototype.filter = function(query){
		var 	i = this.conf.sortIndex.length,
				query = query.replace(/[^\w\d\s]/g, '').toLowerCase(),
				item;

		while(i-- > 0){
			item = this.conf.sortIndex[i];

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
	TableWidget.prototype.append = function(entity){
//		console.log('[CALL append]');
//		console.dir(entity);
		var 	keywords = '',
				_table = this,
				_isFilterable = this.conf.isFilterable;

		var row = Cr('tr').add(Cr.list(this.scheme, function(conf){
			var node = conf.cell(entity, _table);

			if(conf.nowrap){
				node.root.style.whiteSpace = 'nowrap';
			}

			if(_isFilterable){
				keywords += keyolize(entity[conf.id]).replace(/[^\w\d\s]/g, '');
			}
			return node;
		}));
		
		if(this.conf.sortBy || this.conf.isFilterable){
			var 	indexItem = {};

			if(this.conf.sortBy){
				indexItem.key = entity[this.conf.sortBy];
			}
			if(this.conf.isFilterable){
				indexItem.keywords =  keywords.trim().replace(/\s+/g, '').toLowerCase(); // Property for filtering
			}

			row.alias('row', indexItem);
			this.conf.sortIndex.push(indexItem)
		}
		
		this.body.add(row);
		return row;
	};

_env.TableWidget = TableWidget;
	
}(this))