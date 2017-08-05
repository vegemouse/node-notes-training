const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleArguments = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyArguments = {
  describe: 'The body of the note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note.', {
    title: titleArguments,
    body: bodyArguments
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleArguments,
  })
  .command('remove', 'Remove a note', {
    title: titleArguments
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Success! Note added');
    notes.logNote(note);
  } else {
    console.log("Sorry, that title has already been chosen.");
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Note found.");
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }

} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
