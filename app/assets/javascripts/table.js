/**
 * Create a new Table object
 *
 * @param table - the jQuery table element.
 * @param data  - additional required data.
 *     data.columns - an array of table column names.
 *     data.rowLayout - a function, that given the data of one element
 *         returns the corresponding HTML.
 *     data.pageRoute - a function that returns an API route for loading
 *         loading a page of items. This function should take two
 *         parameter - a limit and an offset.
 *     data.dataAttr - the JSON element name that contains all the data
 *         (as returned by the API).
 */
function Table(table, data) {
	this.table     = table;
	this.tbody     = table.find('tbody');
	
	// Required options
	this.columns   = data.columns;
	this.rowLayout = data.rowLayout;
	this.pageRoute = data.routeFunction;
	this.dataAttr  = data.dataAttr;
	
	// Optional options
	this.afterUpdate = data.afterUpdate;
	
	this.pageSize    = 10;
	this.currentPage = 0;
	this.pages       = 0;
	this.rowCount    = 0;
	this.rowData     = {};
	this.rowElements = {};
	
	this.init();
}

Table.prototype.init = function () {
	this.addPagination();
	this.refresh();
};

Table.prototype.refresh = function () {
	var self = this;
	var url = this.pageRoute(this.pageSize, this.currentPage * this.pageSize);
	
	$.ajax({
		type: "GET",
		url: url,
		dataType: 'json'
	}).success(function(data) {
		var oldRowData = self.rowData;
		self.rowCount = data.count;
		self.pages = Math.ceil(self.rowCount / self.pageSize);

		self.rowData = {};
		for (var i = data[self.dataAttr].length - 1; i >= 0; i--) {
			var row = data[self.dataAttr][i];
			self.rowData[row.id] = row;
		};

		self.updateRows.bind(self)(self.rowData);
		self.updatePagination();
	});
};

Table.prototype.updateRows = function(data) {
	this.rowElements = {};
	this.tbody.html('');
	
	for (var id in data) {
		if (data.hasOwnProperty(id)) {
			this.addRow(data[id]);
		}
	}
	
	if (this.afterUpdate) {
		this.afterUpdate(this.tbody);
	}
};

Table.prototype.addRow = function(data) {
	var row = $(this.rowLayout(data));
	this.rowElements[data.id] = row;
	this.rowData[data.id] = data;
	this.tbody.prepend(row);
};

Table.prototype.updateRow = function (data) {
	this.rowData[data.id] = data;

	var newRow = $(this.rowLayout(data));
	this.rowElements[data.id].replaceWith(newRow);
	this.rowElements[data.id] = newRow;
	
	if (this.afterUpdate) {
		this.afterUpdate(this.tbody);
	}
};

Table.prototype.changePage = function (page) {
	if (page >= 0 && page < this.pages) {
		if (this.currentPage != page) {
			this.currentPage = page;
			this.refresh();
		}
	}
};

Table.prototype.addPagination = function() {
	var self = this;
	
	this.pagination = {};
	
	if (this.pagination.container) {
		this.pagination.container.html('');
		paginationElement = this.pagination;
	} else {
		this.pagination.container = $('<ul class="pagination"></ul>');
	}
	
	var prevBtn    = $('<li><a href="">&laquo; Prev</a></li>');
	var nextBtn    = $('<li><a href="">Next &raquo;</a></li>');
	var middleElem = $('<li></li>');
	var textElem   = $('<span></span>');
	
	middleElem.append(textElem);
	this.pagination.container.append(prevBtn);
	this.pagination.container.append(middleElem);
	this.pagination.container.append(nextBtn);
	
	this.pagination.nextBtn  = nextBtn;
	this.pagination.prevBtn  = prevBtn;
	this.pagination.textElem = textElem;
	
	nextBtn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		self.changePage(self.currentPage + 1);
	});
	
	prevBtn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		self.changePage(self.currentPage - 1);
	});
	
	this.table.after(this.pagination.container);
};

Table.prototype.updatePagination = function() {
	var firstRecord = this.currentPage * this.pageSize + 1;
	if (this.rowCount == 0) {
		firstRecord = 0;
	}
	
	var lastRecord  = firstRecord + this.pageSize - 1;
	if (lastRecord > this.rowCount) {
		lastRecord = this.rowCount;
	}
	
	var pageText = 'Showing ' + firstRecord + '-' + lastRecord + ' of ' + this.rowCount;
	this.pagination.textElem.text(pageText);
	
	this.pagination.nextBtn.toggleClass('disabled', this.currentPage >= (this.pages - 1));
	this.pagination.prevBtn.toggleClass('disabled', this.currentPage <= 0);
};

Table.prototype.getRowData = function (id) {
	return this.rowData[id];
};
