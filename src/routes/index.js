const express = require('express');
const router = express.Router();

const model = require('../model/tareas')();

router.get('/', (req, res)=>{
    model.find({}, (err, tareas)=>{
        if(err){console.log(err);}

        res.render('index', {
            titulo: 'CRUD MongoDB',
            tareas: tareas
        });

    });
});

router.post('/add', (req, res)=>{
    let body = req.body;
    body.status = false;

    model.create(body, (err, tareas)=>{
        if(err){console.log(err);}
        res.redirect('/');
    });
});

router.get('/hecho/:id', (req,res)=>{
    let id = req.params.id;
    model.findById(id, (err, tareas)=>{
        if(err){console.log(err);}
        tareas.status=!tareas.status;

        tareas.save()
            .then(()=> res.redirect('/'))
    });
});

router.get('/eliminar/:id', (req,res)=>{
    let id = req.params.id;
    model.remove({_id: id}, (err, tareas)=>{
        if(err){console.log(err);}
        res.redirect('/');
    });
});

module.exports = router;