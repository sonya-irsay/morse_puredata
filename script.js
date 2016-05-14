var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d",{antialias: true, antialiasSamples: 6});

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var myDotSound;
var myDashSound;

var backgroundTexture;

var alphabet = {
    'a': '. -',    'b': '- . . .',  'c': '- . - .', 'd': '- . .',
    'e': '. ',     'f': '. . - .',  'g': '- - . ',  'h': '. . . .',
    'i': '. .',    'j': '. - - -',  'k': '- . -',  'l': '. - . .',
    'm': '- -',    'n': '- .',    'o': '- - -',  'p': '. - - .',
    'q': '- - . -',  'r': '. - .',   's': '. . .',  't': '-',
    'u': '. . -',   'v': '. . . -',  'w': '. - -',  'x': '- . . -',
    'y': '- . - -',  'z': '- - . .',  ' ': ' ',
    '1': '. - - - -', '2': '. . - - -', '3': '. . . - -', '4': '. . . . -',
    '5': '. . . . .', '6': '- . . . .', '7': '- - . . .', '8': '- - - . .',
    '9': '- - - - .', '0': '- - - - -',
}

function showMessage(ctx, message, font, color, offset){
    offset = offset || 0;
    ctx.font = font || "12px Arial";
    ctx.fillText(message, width-20, 20 + offset);
    ctx.textAlign = 'right';
    //ctx.fillStyle = color || "rgba(0,0,0,1)";
}

myDotSound = document.createElement('audio');
myDotSound.src = "data/dot.mp3";
myDotSound.preload = true;
myDotSound.loop = false;
myDotSound.load();
document.body.appendChild(myDotSound);

myDashSound = document.createElement('audio');
myDashSound.src = "data/dash.mp3";
myDashSound.preload = true;
myDashSound.loop = false;
myDashSound.load();
document.body.appendChild(myDashSound);

$(document).ready(function(){

	function loadJSON(callback) {

	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', 'hey.json', true);
	    xobj.onreadystatechange = function() {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	          // .open will NOT return a value but simply returns undefined in async mode so use a callback
	          callback(xobj.responseText);
	        }
	    }
	    xobj.send(null);
	}

	// Call to function with anonymous callback
	loadJSON(function(response) {
		console.log(response);

	  // Do Something with the response e.g.
	  var jsonresponse = JSON.parse(response);

	  // print all the tweets after Parsing it
	  console.log(jsonresponse['tweets']);


	  for(var i=0; i < jsonresponse['tweets'].length; i++){
	  	var json =  JSON.parse(jsonresponse['tweets'][i]);
	  	var element = '<li>'+json.text+'</li>';

      document.body.onclick = function (e) {
         if (e.ctrlKey) {
            alert("ctr key was pressed during the click");
         }
      }

	  	//$('.tweets').append(element);

			var morse = json.text.split('').map(function(e){     // Replace each character with a morse "letter"
					return alphabet[e.toLowerCase()] || ''; // Lowercase only, ignore unknown characters.
			}).join(' ').replace(/ +/g, ' ');
			//$('.tweets').append('<li>'+morse+'</li>');
			//console.log(morse);

			var res = morse.split(" ");
			console.log(res);

      for (var a=0; a < res.length; a++){
      	(function(a){
      	        setTimeout(function(){
      			if (res[a] == '-'){
              ctx.clearRect(0,0,width,height);
              var x = document.body;
              x.style.backgroundColor = "rgba(0,0,0,1)";
            // setTimeout(function(){
                //DRAW DASH
                ctx.beginPath();
                ctx.fillStyle="rgba(255,255,255,1)";
                ctx.rect(width/2-400,height/2-150,800,300);
                ctx.fill();
      				console.log('dash');
      				myDashSound.play();
              //HASHTAG
              showMessage(ctx, "#nuitdebout","12px Arial","rgba(255,255,255,1)", -5);
            // }, 100);
      			}else{
              ctx.clearRect(0,0,width,height);
              var x = document.body;
              x.style.backgroundColor = "rgba(255,255,255,1)";
                //CIRCLE
                ctx.beginPath();
                ctx.fillStyle="rgba(0,0,0,1)";
                ctx.arc(width/2,height/2,250,0,Math.PI*2,true);
                ctx.closePath();
                ctx.fill();
  				    myDotSound.play();
      				console.log('dot');
              //HASHTAG
              showMessage(ctx, "#nuitdebout","12px Arial","rgba(0,0,0,1)", -5);
      			}
      		}, 100 * a);
      	}(a));
      }
	  }
	});

  //showMessage(ctx, " ","20px Verdana","rgba(255,0,0,1)", -45);
  //showMessage(ctx, "fluid fascination by the hour!","25px Verdana","rgba(255,0,0,1)", -15);

});
