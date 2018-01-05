const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID}= require('mongodb')
const {User}= require('./../server/models/user')

var id = '5a4bf759ad273d3a553bc77c1'

if (!ObjectID.isValid(id)) {
	console.log('Id Not Valid')
}

// Todo.find({
// 	_id: id
// }).then((results) => {
// 	console.log(results)
// })

// Todo.findOne({
// 		_id: id
// }).then((results1) => {
// 	console.log(results1)
// })

User.findById(id).then((results2)=>{
	if (!results2){
		return console.log('id not found')
	}
	console.log(results2)
}).catch((e)=> {
	console.log(e)

})

