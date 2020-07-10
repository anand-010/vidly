function saveField() {
    $('#replace').replaceWith('<i id="replace" class="fa fa-edit" onclick="editField()"></i>');
    $('#editable').attr('contenteditable', 'false');
    console.log("inside savefield");
}
// Turns the field editable
function editField() {
    $('#replace').replaceWith('<i id="replace" class="fa fa-check" onclick="saveField()"></i>');
    $('#editable').attr('contenteditable', 'true');
    console.log("inside editfield");
}

// Saves the field
// Best area to make a AJAX call