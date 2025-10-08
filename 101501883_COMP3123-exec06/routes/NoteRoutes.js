const noteModel = require('../models/Notes.js');
const express = require('express');
const noteRoutes = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoutes.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        // Extract note data from request
        const { noteTitle, noteDescription, priority } = req.body.content;

        // Create a new note using the model
        const newNote = new noteModel({
            noteTitle,
            noteDescription,
            priority
        });

        // Save to MongoDB
        const savedNote = await newNote.save();

        // Return saved note as response
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({
            message: "Error while creating note",
            error: String(err)
        });
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoutes.get('/notes', async (req, res) => {
    try {
        // Retrieve all notes from MongoDB
        const notes = await noteModel.find({}).sort({ dateUpdated: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving notes",
            error: String(err)
        });
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(400).json({
            message: "Invalid noteId or error retrieving note",
            error: String(err)
        });
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoutes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            { $set: req.body.content },
            { new: true, runValidators: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(400).json({
            message: "Error updating note",
            error: String(err)
        });
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        // optional safety: validate ObjectId format to avoid CastError
        const mongoose = require('mongoose');
        if (!mongoose.isValidObjectId(req.params.noteId)) {
            return res.status(400).json({ message: "Invalid noteId format" });
        }

        // mongoose v8: use findByIdAndDelete (findByIdAndRemove is removed)
        const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json({
            message: "Note deleted successfully",
            deletedId: req.params.noteId
        });
    } catch (err) {
        return res.status(400).json({
            message: "Error deleting note",
            error: String(err)
        });
    }
});

module.exports = noteRoutes;