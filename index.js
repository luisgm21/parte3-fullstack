//Importamos dependencias que ya estan estandarizadas
const express=require('express');

//Creamos la app
const app = express();
let fecha= new Date().toISOString();

app.use(express.json());
// una lista de objetos a modo de ejemplo
let notes=[
    {'id': 1,
        'content': 'Hola gente este es una cosa inventada',
        'date': fecha,
        'important': true
    },
    {'id': 2,
        'content': 'Hola gente este es una cosa inventada de twitter',
        'date': fecha,
        'important': true
    },
    {'id': 3,
        'content': 'Hola gente este es una cosa inventada de YT',
        'date': fecha,
        'important': true
    }
];

// Es la forma de configurar un servidor sin express
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
  
// })

//Configuramos la direcciones 
app.get('/',(request,response)=>{
    response.send('<h1>Hello World</h1>');
});
app.get('/api/notes',(req,res)=>{
    res.json(notes);
});
app.get('/api/notes/:id',(req,res)=>{
    let id=Number(req.params.id);
    //vemos el id de la url
    //console.log({id})
    const note=notes.find(notes=>notes.id===id);
    // console.log({note})
    if(note){
        res.json(note);
    }else{
        res.status(404).end();
    }
    
});
app.delete('/api/notes/:id',(req,res)=>{
    let id=Number(req.params.id); 
    // rellenamos a la lista note con todos los valores excepto con el que tenga la id de la url
    notes=notes.filter(notes=>notes.id!=id);
    res.status(204).end();
});

app.post('/api/notes',(req,res)=>{
    const note= req.body;
    // Para verificar si llega aqui la peticion
    //console.log(note)
    // iteramos sobre la lista y obtenemos la id
    if(!note || !note.content){
        return res.status(400).json({
            error: 'note.content is missing'
        }); 
    }
    const ids= notes.map(note => note.id);
    const maxId= Math.max(...ids);

    const newNote={
        id: maxId+1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date().toISOString()     
    };
    //una forma de hacerlo
    //notes=[...notes,newNote]
    notes=notes.concat(newNote);
    res.status(201).json(note);
});
//configuramos el servidor en el puerto 3001 forma de acceder localhost:3001
const PORT = 3001;
app.listen(PORT,()=>{
    // lo operamos como callback para que nos diga de forma precisa si se levanto el servidor 
    console.log(`Server running on port ${PORT}`);
});

