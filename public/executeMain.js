document.addEventListener("DOMContentLoaded", function(event) {
});
loadXMLDoc()



// window.onload = loadXMLDoc();

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            //  creat everything needed
               var s = document.getElementsByTagName('script')[0],
                   l = document.head,
                   obj = JSON.parse(this.responseText),
                   assetPath = function (type , path) {
                     if (type == 'js') {
                       return path = 'public/js/' +path;
                     }
                     else {
                       return path = 'public/css/' +path;
                     }
                   },
                   el = document.createElement('script'),
                   li = document.createElement('link');

                   // insert scripts and links, change has needed
		               el.async = true;
		               el.src = assetPath('js',obj['all.min.js']);
		               s.parentNode.insertBefore(el, s);

                   li.type = 'text/css';
                   li.rel = 'stylesheet';
                   li.href = assetPath('css',obj['all.min.css']);

                   l.appendChild(li);


                    // var b = document.getElementsByTagName('body');
                    // b.style.removeProperty('opacity');
                  //  document.getElementById("myDiv").innerHTML = this.responseText;

           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "public/rev-manifest.json", true);
    xmlhttp.send();
}
