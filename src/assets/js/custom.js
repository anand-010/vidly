// // multiple file upload
// Dropzone.autoDiscover = false;

// function paramNameForSend() {
//     return "userParamName";
// }
// document.addEventListener("DOMContentLoaded", function() {
//     var dropzone = new Dropzone('#demo-upload', {
//         withCredentials: true,
//         acceptedFiles: "video/mp4,video/avi,video/mkv",
//         paramName: paramNameForSend,
//         method: 'post',
//         parallelUploads: 2,
//         thumbnailHeight: 120,
//         thumbnailWidth: 120,
//         maxFilesize: 500,
//         filesizeBase: 1000,
//         thumbnail: function(file, dataUrl) {
//             if (file.previewElement) {
//                 file.previewElement.classList.remove("dz-file-preview");
//                 var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
//                 for (var i = 0; i < images.length; i++) {
//                     var thumbnailElement = images[i];
//                     thumbnailElement.alt = file.name;
//                     thumbnailElement.src = dataUrl;
//                 }
//                 setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
//             }
//         }

//     });
// });
// the hangout meassage area code

// (function(w, d, $) {

//     function getConversation(elem) {

//         return $(elem).closest('.conversation');

//     }

//     $('.conversation .icon.minimize').on('click', function(event) {

//         event.preventDefault();
//         getConversation(this).toggleClass('collapsed');

//     });

//     $('.conversation .icon.close').on('click', function(event) {

//         event.preventDefault();
//         getConversation(this).remove();

//     });

// })(window, document, jQuery));