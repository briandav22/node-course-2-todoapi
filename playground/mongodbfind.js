const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
	if(err){
		return console.log('unable to connect');
	} 

	console.log('connected to DB');

	var db = client.db('Users')

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5a4bc1e731ce1c0c4dfe971a')
	// 	}).toArray().then((docs)=>{
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));

	// }, (err)=>{console.log('unable to fetch', err)
	
	// });

	// db.collection('Todos').find().count().then((count)=>{
	// 	console.log(`todos count: ${count}`)
	// })

	db.collection('Users').find({name: 'brian'}).toArray().then((docs)=>{
		console.log(JSON.stringify(docs,undefined, 2))
	})

	client.close();
});