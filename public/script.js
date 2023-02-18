const sharejs = require('share');

window.onload = function() {
    let converter = new showdown.Converter();
    let pad = document.getElementById('pad');
    let markdownArea = document.getElementById('markdown');

    pad.addEventListener('keydown', function(e) {
        if(e.key === 'Tab') {
            let start = this.selectionStart;
            let end = this.selectionEnd;
            
            let target = e.target;
            let value = target.value;

            target.value = value.substring(0, start)
                            + "\t"
                            + value.substring(end);
            
            this.selectionStart = this.selectionEnd = start + 1;

            e.preventDefault();
        }
    })

    let previousMarkdownValue;

    const convertTextAreaToMarkdown = function () {
        let markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    }

    const didChangeOccur = function() {
        if(previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    }

    setInterval(() => {
        if(didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    if(document.location.pathname.length > 1){
        let documentName = document.location.pathname
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });
    }

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
}   