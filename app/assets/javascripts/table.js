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
	
	this.pageSize    = 10;
	this.currentPage = 0;
	this.rowCount    = 0;
	this.rowData     = 0;
	this.rowElements = {};
	
	this.init();
}

Table.prototype.init = function () {
	this.refresh();
};

Table.prototype.refresh = function () {
	var self = this;
	var url = this.pageRoute(this.pageSize, this.currentPage);
	
	$.ajax({
		type: "GET",
		url: url,
		dataType: 'json'
	}).success(function(data) {
		self.rowCount = data.count;

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
};

Table.prototype.addRow = function(data) {
	var row = this.rowLayout(data);
	this.rowElements[data.id] = row;
	this.tbody.append(row);
};

Table.prototype.updateRow = function (data) {
	this.rowData[data.id] = data;

	var newRow = this.rowLayout(data);
	this.rowElements[data.id].replaceWith(newRow);
	this.rowElements[data.id] = newRow;
};

Table.prototype.updatePagination = function() {
	var paginationElement;
	
	if (this.pagination) {
		this.pagination.html('');
		paginationElement = this.pagination;
	} else {
		paginationElement = $('<ul class="pagination"></ul>');
	}
	
	var pages = Math.ceil(this.rowCount / this.pageSize);
	
	for (var i = 0; i < pages; i++) {
		paginationElement.append('<li><a href="#">' + (i + 1) + '</a></li>');
	};
	
	this.pagination = paginationElement;
	this.table.after(paginationElement);
};
