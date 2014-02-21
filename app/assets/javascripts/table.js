function Table(table, columns) {
	this.body    = table.find('tbody');
	this.columns = columns;
}

Table.prototype.updateRow = function (id, data) {
	var cells = this.body.find('[data-id="' + id + '"] > td');
	for (var i = this.columns.length - 1; i >= 0; i--){
		var col = this.columns[i];
		if (data[col]) {
			cells.eq(i).text(data[col]);
		}
	};
};
