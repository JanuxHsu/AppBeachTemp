var util = require('util');

var Internal = function () {
	this.name = 'InternalError';
	this.message = 'Internal Error';
	this.code = 500;
};

util.inherits(Internal, Error);

var NotFound = function () {
	this.name = 'NotFoundError';
	this.message = 'Not Found';
	this.code = 404;
};

util.inherits(NotFound, Error);

var Database = function () {
	this.name = 'DatabaseError';
	this.message = 'Database Error';
	this.code = 500;
};

util.inherits(Database, Error);

var Parameter = function () {
	this.name = 'ParameterError';
	this.message = 'Invalid Parameters';
	this.code = 400;
};

util.inherits(Parameter, Error);

var Existed = function () {
	this.name = 'ExistedError';
	this.message = 'Object Existed';
	this.code = 400;
};

util.inherits(Existed, Error);

var Server = function () {
	this.name = 'ServerError';
	this.message = 'Server Error';
	this.code = 500;
};

util.inherits(Server, Error);

module.exports = {
	NotFound: NotFound,
	Parameter: Parameter,
	Database: Database,
	Server: Server,
	Existed: Existed,
	Internal: Internal
};
