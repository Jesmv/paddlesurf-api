var TabHinchable = require('../models/tabHinchable');
var fs = require('fs');
var path = require('path');
const tabHinchable = require('../models/tabHinchable');

var controller = {
    saveTable: function(req, res){
        var table = new TabHinchable();
        var params = req.body;
        table.name = params.name;
        table.brand = params.brand;
        table.description = params.description;
        table.position = params.position;
        table.image = null;

        table.save((err, tableStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento'});

            if(!tableStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({tabHinchable: tableStored});
        });
    },
    getTable: function(req, res){
        var tabHinchableId = req.params.id;

        if(tabHinchableId == null) return res.status(404).send({message: 'El proyecto no existe'});
        
        TabHinchable.findById(tabHinchableId, (err, tabHinchable) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!tabHinchableId) return res.status(404).send({message: 'El proyecto no existe'});

            return res.status(200).send({ tabHinchable });
        });
    },
    getTables: function(req, res){
        TabHinchable.find({}).exec((err,tabHinchable) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!tabHinchable) return res.status(404).send({message: 'No hay proyectos para mostrar'});

            return res.status(200).send({ tabHinchable });
        }); 
    },
    updateTable: function(req, res){
        var tabHinchableId = req.params.id;
        var tableBody = req.body;

        if(tabHinchableId == null) return res.status(404).send({message: 'El proyecto no existe'});

        TabHinchable.findByIdAndUpdate(tabHinchableId, tableBody,(err, tabHinchable) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!tabHinchableId) return res.status(404).send({message: 'El proyecto no existe'});

            return res.status(200).send({tabHinchable});
        });

    },
    deleteTable: function(req, res){
        var tabHinchableId = req.params.id;

        TabHinchable.findByIdAndDelete(tabHinchableId,(err, tabHinchable) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!tabHinchableId) return res.status(404).send({message: 'El proyecto no existe'});

            return res.status(200).send({tabHinchable: tabHinchable});
        });
    },

    uploadImage: function(req, res){
        var tabHinchableId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

                TabHinchable.findByIdAndUpdate(tabHinchableId, {image: fileName}, {new:true}, (err, tabHinchableUpdate) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

                    if(!tabHinchableUpdate) return res.status(404).send({message: 'El proyecto no existe'});
                    
                    return res.status(200).send({
                        TabHinchable: tabHinchableUpdate
                    });
                });

            }else{
               fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extensión no es vália'});
               }); 
            }

        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }
}

module.exports = controller;