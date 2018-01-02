// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj)




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
	if(err){
		return console.log('unable to connect');
	} 

	console.log('connected to DB');
	// var db = client.db('Todos')
	// db.collection('Todos').insertOne({
	// 	text: 'something to do',
	// 	completed: false
	// }, (err,result)=>{
	// 	if (err){
	// 		return console.log('unable to insert', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2))

	// });

	// var db = client.db('Users')
	// db.collection('Users').insertOne({
	// 	name: 'brian',
	// 	age: 25,
	// 	location: 'norfolk'

	// }, (err,result)=>{
	// 	if (err){
	// 		return console.log('unable to insert', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))

	// });

	client.close();
});