// addDragoverEvent('page-hero');
// addDragoverEvent('page-hero__characters');
// addDragoverEvent('page-hero__logo');
// addDragoverEvent('childrens-wrapper--daytime');
// addDragoverEvent('childrens-wrapper--nighttime');

var map = {};
var onDragOver = function(element, event) {
    event.preventDefault();
    event.stopPropagation();
    element.classList.add('highlight');
    event.dataTransfer.dropEffect = 'link';
}
var onDragLeave = function(element, event) {
    event.preventDefault();
    event.stopPropagation();
    element.classList.remove('highlight');
}
var onDrop = function(element, event) {
    event.preventDefault();
    event.stopPropagation();
    element.classList.remove('highlight');

    var files = event.dataTransfer.files;
    for (var i = 0, file; file = files[i]; i++) {
        if (file.type.match(/image.*/)) {
            var reader = new FileReader();
            console.log('reader', reader.result)
            map[reader] = element;

            reader.onload = function(e) {
                console.log('reader.onload', this)
                if(element.src) element.src = e.target.result;
                if(element.srcset) element.srcset = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        return;
    }
}

function addDragoverEvent(name) {
    var elements = document.getElementsByTagName(name);

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element) {
            element.addEventListener('dragover', onDragOver.bind(element, element));
            element.addEventListener('dragleave', onDragLeave.bind(element, element));
            element.addEventListener('drop', onDrop.bind(element, element));
        }
    }
}

var styles = document.createElement('style');
styles.innerHTML = '.highlight {  border: 4px solid yellow;  background-color: rgba(255, 219, 11, 0.5) !important;}';
document.getElementsByTagName('body')[0].appendChild(styles);

addDragoverEvent('img', document.getElementsByTagName);
