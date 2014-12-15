I separate each block in .html file and include it when the script.js load begin. This cause setTimeout function on document.ready, to give content from files load.
U have ur own files including system, so just remove files including and setTimeout in scripts.js, filter.js and rating.js;

About chat at stream page: I separated buttons and chat from chat block in chat_buttons.html and chat.html file, other structure is unique, so I leave it

Tried to structure all scripts, deleted some, modifeid some, I think it'll work. Need to standardize all popups and methods for better code