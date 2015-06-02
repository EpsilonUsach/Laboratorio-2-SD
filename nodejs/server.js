var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var fs= require('fs');
var port = 8080;
var arreglo = [];
var index = 0;
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
var file = fs.readFileSync('/home/vasco/Escritorio/md54.txt', 'utf8');
var numeros=0;
var numero='';
var flotante=0;
for (i = 0; i < file.length; i += 1) {
        if(file[i]!='\n'){
        	numero=numero+file[i];
        }
        else{
                numeros++;
                flotante=parseFloat(numero);
                arreglo[index]=flotante;
		index++;
		numero='';
        }
}
var ultimotrozo=numeros%clientes;
numeros=numeros-ultimotrozo;
trozo=numeros/clientes;
arreglotemp=[];
desp=0;
post=0;
arreglofinal=[]
for (i = 0; i < clientes-1; i += 1) {
	for (j = 0; j < trozo; j += 1) {
		arreglotemp[j]=arreglo[desp];
		desp++;
	}
	arreglofinal[post]=arreglotemp;
	post++;
	arreglotemp=[];
}
for (i = 0; i < trozo+ultimotrozo; i += 1) {
	arreglotemp[i]=arreglo[desp];
	desp++;
}
arreglofinal[post]=arreglotemp;
arreglosorted = { 
		  metodo: metodo,
		  arreglo: arreglofinal
		};
app.get('/arreglo',function(req,res){
	res.json(arreglosorted);
});

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
