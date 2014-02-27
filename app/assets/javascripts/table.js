function Table(table, data) {
	this.tbody     = table.find('tbody');
	
	this.columns   = data.columns;
	this.rowLayout = data.rowLayout;
	this.pageRoute = data.routeFunction;
	this.dataAttr  = data.dataAttr;
	
	this.pageSize    = 10;
	this.currentPage = 0;
	this.rows        = 0;
	this.rowData     = 0;
	
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
		this.rows    = data.count;
		this.rowData = data[this.dataAttr];
	});
};

Table.prototype.updateRows = function(data) {
	this.tbody.html('');
};

Table.prototype.addRow = function(data) {
	var row = this.rowLayout(data);
	this.tbody.append(row);
};

Table.prototype.updateRow = function (id, data) {
	var cells = this.tbody.find('[data-id="' + id + '"] > td');
	for (var i = this.columns.length - 1; i >= 0; i--){
		var col = this.columns[i];
		
		if (data[col]) {
			cells.eq(i).text(data[col]);
		} else {
			cells.eq(i).text('');
		}
	};
};
