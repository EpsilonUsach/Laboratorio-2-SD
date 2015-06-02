var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var fs= require('fs');
var port = 7500;
var arreglo = [];
var metodo='';
var noclientes='';
var bandera=0;
var filem = fs.readFileSync('/home/vasco/Escritorio/metodo.txt', 'utf8');
for (i = 0; i < filem.length-1; i += 1) {
	if(filem[i]!='\n' && bandera==0){
		metodo=metodo+filem[i];
	}
	else if(filem[i]=='\n'){
		bandera=1;
	}
	else if(filem[i]!='\n' && bandera==1){
		noclientes=noclientes+filem[i];
	}
}
var clientes=parseFloat(noclientes);
//http://blog.mgechev.com/2012/11/24/javascript-sorting-performance-quicksort-v8/
var mergeSort = (function () {
    function merger(array, start, end) {
        if (Math.abs(end - start) <= 1) {
            return [];
        }
        var middle = Math.ceil((start + end) / 2);

        merger(array, start, middle);
        merger(array, middle, end);

        return merge(array, start, middle, end);
    }

    function merge(array, start, middle, end) {
        var left = [],
            right = [],
            leftSize = middle - start,
            rightSize = end - middle,
            maxSize = Math.max(leftSize, rightSize),
            size = end - start,
            i;

        for (i = 0; i < maxSize; i += 1) {
            if (i < leftSize) {
                left[i] = array[start + i];
            }
            if (i < rightSize) {
                right[i] = array[middle + i];
            }
        }
        i = 0;
        while (i < size) {
            if (left.length && right.length) {
                if (left[0] >= right[0]) {
                    array[start + i] = right.shift();
                } else {
                    array[start + i] = left.shift();
                }
            } else if (left.length) {
                array[start + i] = left.shift();
            } else {
                array[start + i] = right.shift();
            }
            i += 1;
        }
        return array;
    }
    return function (array) {
        return merger(array, 0, array.length);
    }
}());
//http://blog.mgechev.com/2012/11/24/javascript-sorting-performance-quicksort-v8/
var quickSort = (function () {
    function partition(array, left, right) {
        var cmp = array[right - 1],
            minEnd = left,
            maxEnd;
        for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
            if (array[maxEnd] <= cmp) {
                swap(array, maxEnd, minEnd);
                minEnd += 1;
            }
        }
        swap(array, minEnd, right - 1);
        return minEnd;
    }

    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }

    function quickSort(array, left, right) {
        if (left < right) {
            var p = partition(array, left, right);
            quickSort(array, left, p);
            quickSort(array, p + 1, right);
        }
        return array;
    }

    return function (array) {
        return quickSort(array, 0, array.length);
    };
}());

var bubbleSort = (function () {

    function swap(array, i, j) {
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
        return array;
    }

    function bubbleSort(array, end){
      var flag = 1;    
      for(i = 1; (i <= end) && flag; i++){
          flag = 0;
          for (j=0; j < (end -1); j++)
         {
               if (array[j+1] < array[j])      
              { 
                    swap(array,i,j)
                    flag = 1;               
               }
          }
     }
     return array;  
    }

    return function (array) {
        return bubbleSort(array, array.length);
    };
}());
arreglofinal=[]
var ruby='http://192.168.43.138:3000/arreglos.json'
var python='http://localhost:7000/arreglo.json'
var go='http://192.168.43.144:8000'
if(clientes==1){
	http.get(ruby, function(res) {
	    var body = '';
	    res.on('data', function(chunk) {
		body += chunk;
	    });
	    res.on('end', function() {
		var fbResponse = JSON.parse(body)
		var largoruby=fbResponse.length;
		for(i = 0; i < fbResponse.length; i += 1) {
			arreglofinal[i]=fbResponse[i].numero;
		}
		if(metodo=='bubblesort'){
				bubbleSort(arreglofinal);
			}
			else if(metodo=='mergesort'){
				mergeSort(arreglofinal);
			}
			else if(metodo=='quicksort'){
				quickSort(arreglofinal);
			}
			app.get('/arreglo',function(req,res){
			res.json(arreglofinal);
	    });
	}).on('error', function(e) {
	      console.log("Got error: ", e);
	});
});
}
if(clientes==2){
	http.get(python, function(res) {
	    var body = '';
	    res.on('data', function(chunk) {
		body += chunk;
	    });
	    res.on('end', function() {
		var fbResponse = JSON.parse(body)
		var largopython=fbResponse.arreglo.length;
		for(i = 0; i < fbResponse.length; i += 1) {
			arreglofinal[i]=fbResponse.arreglo[i];
		}
		http.get(go, function(res) {
		    var body = '';
		    res.on('data', function(chunk) {
			body += chunk;
		    });
		    res.on('end', function() {
			var fbResponse = JSON.parse(body);
		        var largogo=fbResponse.arreglo.length;
			for(i = 0; i < largogo; i += 1) {
				arreglofinal[i+largopython]=fbResponse.arreglo[i];
			}
			if(metodo=='bubblesort'){
				bubbleSort(arreglofinal);
			}
			else if(metodo=='mergesort'){
				mergeSort(arreglofinal);
			}
			else if(metodo=='quicksort'){
				quickSort(arreglofinal);
			}
			app.get('/arreglo',function(req,res){
			res.json(arreglofinal);
		});
		    });
		}).on('error', function(e) {
		      console.log("Got error: ", e);
		});
	    });
	}).on('error', function(e) {
	      console.log("Got error: ", e);
	});
}
if(clientes==3){
	http.get(ruby, function(res) {
	    var body = '';
	    res.on('data', function(chunk) {
		body += chunk;
	    });
	    res.on('end', function() {
		var fbResponse = JSON.parse(body)
		var largoruby=fbResponse.length;
		for(i = 0; i < fbResponse.length; i += 1) {
			arreglofinal[i]=fbResponse[i].numero;
		}
		http.get(python, function(res) {
		    var body = '';
		    res.on('data', function(chunk) {
			body += chunk;
		    });
		    res.on('end', function() {
			var fbResponse = JSON.parse(body);
		        var largopython=fbResponse.arreglo.length;
			for(i = 0; i < largopython; i += 1) {
				arreglofinal[i+largoruby]=fbResponse.arreglo[i];
			}
			http.get(go, function(res) {
			    var body = '';
			    res.on('data', function(chunk) {
				body += chunk;
			    });
			    res.on('end', function() {
				var fbResponse = JSON.parse(body)
				var largogo=fbResponse.arreglo.length;
				for(i = 0; i < fbResponse.arreglo.length; i += 1) {
					arreglofinal[i+largoruby+largopython]=fbResponse.arreglo[i];
				}
				if(metodo=='bubblesort'){
					bubbleSort(arreglofinal);
				}
				else if(metodo=='mergesort'){
					mergeSort(arreglofinal);
				}
				else if(metodo=='quicksort'){
					quickSort(arreglofinal);
				}
				app.get('/arreglo',function(req,res){
				res.json(arreglofinal);
			    });
			}).on('error', function(e) {
			      console.log("Got error: ", e);
			});
		});
		    });
		}).on('error', function(e) {
		      console.log("Got error: ", e);
		});
	    });
	}).on('error', function(e) {
	      console.log("Got error: ", e);
	});
}
server.listen(port);

console.log('Start Web Services NodeJS in Port ' + port);

//Path de los CSS que utilizarán para el estilo de la página
app.use("/css", express.static(__dirname + '/css'));

//Path de funciones en Javascript que podrían utilizar
app.use("/function", express.static(__dirname + '/function'));
app.use("/js", express.static(__dirname + '/js'));

//Routing
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

io.sockets.on('connection', function (socket) {

	socket.on('initRoom', function (data) {
		socket.join(data.room);
	});

	socket.on('exitRoom', function (data) {
		socket.leave(data.room);
	});

	socket.on('disconnect', function () {
	});
	
	socket.on('broadcast', function (data) {
		socket.broadcast.emit('broadcastCallback', { text:data.text});
	});

	socket.on('multicast', function (data) {
		io.sockets.in(data.room).emit('multicastCallback', {text:data.text});
	});
});
