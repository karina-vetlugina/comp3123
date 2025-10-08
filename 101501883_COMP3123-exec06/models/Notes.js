const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const VALID_PRIORITIES = ['HIGH', 'MEDIUM', 'LOW'];

const NoteSchema = new mongoose.Schema(
  {
    noteTitle: {
      type: String,
      required: [true, 'noteTitle is required'],
      trim: true,
      minlength: 1,
      maxlength: 200
    },
    noteDescription: {
      type: String,
      required: [true, 'noteDescription is required'],
      trim: true,
      maxlength: 5000
    },
    priority: {
      type: String,
      enum: VALID_PRIORITIES,
      default: 'LOW'
    },
    dateAdded: {
      type: Date,
      default: () => new Date()
    },
    dateUpdated: {
      type: Date,
      default: () => new Date()
    }
  },
  { versionKey: false }
);

// update timestamps automatically
NoteSchema.pre('save', function (next) {
  this.dateUpdated = new Date();
  if (!this.dateAdded) this.dateAdded = new Date();
  next();
});

NoteSchema.pre('findOneAndUpdate', function (next) {
  this.set({ dateUpdated: new Date() });
  next();
});

// export model
module.exports = mongoose.model('Note', NoteSchema);