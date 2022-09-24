const express = require('express');
const router = express.Router();

const model = require('../model/task')();

router.get('/', (req, res)=>{
    model.find({}, (err, task)=>{
        if(err){console.log(err);}

        res.render('index', {
            title: 'CRUD MongoDB',
            task: task
        });

    });
});

router.get('/test', (req, res)=>{
    model.find({}, (err, task)=>{
        if(err){console.log(err);}

        res.render('index_b', {
            title: 'CRUD MongoDB',
            task: task
        });

    });
});


router.post('/task', async (req, res)=>{
    let body = req.body;
    body.status = false;
	if(req.body.swtch == 'getData'){
	const task = await model.find({}).exec();
    if (task) { return res.status(200).json(task).end(); } 
	else { return res.status(404).json({ error: 'No data Found' }); }
	}
	
	if(req.body.swtch == 'addData'){
	delete req.body.swtch,req.body.data_id; 
    model.create(req.body, (err, task)=>{
        if(err){console.log(err);}
    return res.status(200).json("added").end()
    })
	}
	
	if(req.body.swtch == 'updateData'){
		let id = req.body.data_id;
		delete req.body.swtch,req.body.data_id;
    model.findById(id, (err, task)=>{
        if(err){console.log(err);}
        task=req.body;
        task.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}

	if(req.body.swtch == 'change_status'){
    model.findById(req.body.uid, (err, task)=>{ 
        if(err){console.log(err);}
        task.status=!task.status;
        task.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}	
	
	if(req.body.swtch == 'del_task'){
	    model.remove({_id: req.body.data_id}, (err, task)=>{
		if(err){return res.status(404).json({ error: 'cannot perform delete'+err })}
        return res.status(200).json("Deleted ").end();
		});
	}	
	
});

router.post('/add', (req, res)=>{
    let body = req.body;
    body.status = false;

    model.create(body, (err, task)=>{
        if(err){console.log(err);}
        res.redirect('/');
    });
});

router.get('/hecho/:id', (req,res)=>{
    let id = req.params.id;
    model.findById(id, (err, task)=>{
        if(err){console.log(err);}
        task.status=!task.status;
        task.save()
            .then(()=> res.redirect('/'))
    });
});

router.get('/eliminar/:id', (req,res)=>{
    let id = req.params.id;
    model.remove({_id: id}, (err, task)=>{
        if(err){console.log(err);}
        res.redirect('/');
    });
});

module.exports = router;