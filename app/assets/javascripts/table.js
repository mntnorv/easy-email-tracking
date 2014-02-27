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
	var url = pageRoute(this.pageSize, this.currentPage);
	
	$.ajax({
		type: "GET",
		url: url,
		dataType: 'json'
	}).success(function(data) {
		this.rowCount = data.count;

		this.rowData = {};
		for (var i = data[this.dataAttr].length - 1; i >= 0; i--) {
			var row = data[this.dataAttr][i];
			this.rowData[row.id] = row;
		};

		this.updateRows(this.rowData);
	});
};

Table.prototype.updateRows = function(data) {
	this.rowElements = {};
	this.tbody.html('');

	for (var i = data.length - 1; i >= 0; i--) {
		this.addRow(data[i]);
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
