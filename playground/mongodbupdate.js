const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
	if(err){
		return console.log('unable to connect');
	} 

	console.log('connected to DB');

	var db = client.db('Users')

	db.collection('Users').findOneAndUpdate(
		{
			_id: new ObjectID('5a4bc76a79954c10f1178f26')
		},
		{
			$set:{
				name:'brian'
			},
			$inc:{
				age: 1
			}
		},
			
		{
			returnOriginal:false
		}).then((res)=>
		{console.log(res)}) 

	client.close();
});