

console.log("Client script loaded.");

// a function declaration inside of a callback ... which takes a callback function :O
function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();

    //console.log("xhr", xhr);
    xhr.onload = function() {
        value = this.responseText;
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //console.log('responseText:' + xhr.responseText);

            // callback function
            value = this.responseText;
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url); // localhost:8000/weekdays?format=html
    xhr.send();

}

document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {

    //console.log(currentElement, currentIndex, listObj);
    currentElement.addEventListener("click", function (e) {
        //console.log(e);
        for (let i = 0; i < this.parentNode.childNodes.length; i++) {
            if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                    this.parentNode.childNodes[i].innerHTML = "";
                    break;
                }
            }
        }
    });
});

//  /path-to?key2=value1&key2=value2&key3=value3
/*  { key1: value1, key2: value2, key3: value3 }
 */
// Event listener for JSON format
document.querySelector("#weekdaysJSON").addEventListener("click", function (e) {
    ajaxGET("/weekdays?format=json", function (data) {
        console.log("Before parsing", data);
        let parsedData = JSON.parse(data); // Parse the JSON data
        console.log("After parsing", parsedData);

        // Prepare HTML structure
        let content = '';
        parsedData.forEach((section, index) => {
            content += `<ul id="section${index + 1}">
                <h2>Exotic weapons</h2>
                ${section.map(item => `<li>${item}</li>`).join('')}
            </ul>`;
        });

        // Insert the content into the designated area
        document.getElementById("weekdays-json").innerHTML = content;
    });
});

// Event listener for HTML format
document.querySelector("#weekdaysHTML").addEventListener("click", function (e) {
    ajaxGET("/weekdays?format=html", function (data) {
        console.log(data);
        document.getElementById("weekdays-html").innerHTML = data; // Insert HTML directly
    });
});


// let's wire our ajax call function to an mouse click so we get data
// when the user clicks
document.querySelector("#marker").addEventListener("click", function (e) {
    ajaxGET("/markers", function (data) {
        // this call is JSON so we have to parse it:
        let parsedData = JSON.parse(data);

        // as a table
        let str = "<table>";
        for(let i = 0; i < parsedData.length; i++) {
            let item = parsedData[i];
            str += "<tr><td>" + item["name"] + "</td><td>" + item["location"] + "</td><td>" + item["size"]
                + "</td><td>" + item["Difficulty"]
                + "</td><td>" + item["Requires"] + "</td></tr>";
        }
        str += "</table>";

        // as a sequence of div elements
//        let str = "";
//        for(let i = 0; i < parsedData.length; i++) {
//            let item = parsedData[i];
//            str += "<div><p>" + item["title"] + "</p><p>" + item["lat"]
//              + "</p></div>";
//        }



        document.getElementById("marker-data").innerHTML = str;

        //let d1 = document.createElement("div");
        //d1.innerHTML = str;
        //document.body.appendChild(d1);
        //console.log("after parsing", parsedData);
    });
});


