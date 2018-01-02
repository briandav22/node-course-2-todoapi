const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
	if(err){
		return console.log('unable to connect');
	} 

	console.log('connected to DB');

	var db = client.db('Users')

	// db.collection('Todos').deleteMany({text: 'something to do'}).then((res)=>{
	// 	console.log(res)
	// })

	// db.collection('Todos').deleteOne({text:'eat lunch'}).then((res)=>{
	// 	console.log(res)
	// })

	// db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
	// 	console.log(res)
	// })

	db.collection('Users').deleteMany({name: 'brian'}).then((res)=>{
		console.log(res)
	});

	db.collection('Users').findOneAndDelete({_id: new ObjectID('5a4bc7c270db2e1147810ae7')}).then((res)=>{
		console.log(res)
	});


	client.close();
});