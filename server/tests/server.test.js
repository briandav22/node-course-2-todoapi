const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');



const todos = [
	{	_id: new ObjectID(),
		text: 'first test'
	},
	{	_id: new ObjectID(),
		text: 'second test'
	} 
	]

beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos);		
	}).then(()=>done());
});

describe('POST /TODOs', ()=>{
	it('should create a new todo', (done)=>{
		var text = 'test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text);
			})
		.end((err, res)=> {
			if(err){
				return done(err);
			}

		Todo.find({text}).then((todos)=>{
			expect(todos.length).toBe(1);
			expect(todos[0].text).toBe(text);
			done();
		}).catch((e)=> done(e))

		});
	});

	it('should not create todo with bad data', (done)=>{
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
		.end((err,res)=>{
			if (err){
				return done(err)
			}
		Todo.find().then((todos)=>{
			expect(todos.length).toBe(2);
			done();
		}).catch((e)=> done(e))


		});
	});
});

describe('get /todos', ()=>{
	it('should get all todos', (done)=>{
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res)=>{

				expect(res.body.todos.length).toBe(2);
			})
			.end(done)
	});
});

describe('get /todos/:id', () =>{
	it('should return todos doc', (done)=>{
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done)
	})
	it('should return a 404 if todo not found', (done)=>{
		var hexID = new ObjectID().toHexString();
		request(app)
			.get(`/todos/${hexID}`)
			.expect(404)
			.end(done)

	})

	it('should return 404 for non object ID', (done)=>{
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done)
		//todos/123
	})
});

describe ('delete /todos/:d', ()=>{
	it('should remove a todo', (done)=>{
		var hexID = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexID}`)
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo._id).toBe(hexID)
			})
			.end((err, res)=>{
				if(err){
					return done(err)
				}
				Todo.findById(hexID).then((todo)=>{
					expect(todo).toBe(null);
					done();
				}).catch((e)=> done(e))
				})
				
		
			

	});
	it('should return a 404 if todo not found', (done)=>{
		var hexID = new ObjectID().toHexString();
		request(app)
			.delete(`/todos/${hexID}`)
			.expect(404)
			.end(done)

	});

	it('should return 404 for non object ID', (done)=>{
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done)
});

});