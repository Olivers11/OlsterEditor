const fs = require('fs');
let txt_ = document.getElementById('editor');
const {dialog} = require('electron').remote;
let readline = require('readline');
let item;
const { ENGINE_METHOD_STORE } = require('constants');
let direct, content;

function RetornarExtencion(){
	if(lenguaje == "Python")
	{
		return ".py";
	}
	else if(lenguaje == "javascript")
	{
		return ".js";
	}
	else if(lenguaje == "css")
	{
		return ".css";
	}
	else if(lenguaje == "html")
	{
		return ".html";
	}
	else if(lenguaje == "cpp")
	{
		return ".cpp";
	}
  else
  {
    alert("No hay ninguna descripcion de lenguaje");
    return ".txt";
  }
}

function DeleteFile(route)
{
  fs.unlink(route, (err) => {
    if (err) throw err;
    console.log('Archivo Eliminado Satisfactoriamente');
  });
}


function Escribir(dir, lenguaje)
{
    name = dir+'\\file'+RetornarExtencion();
    DeleteFile(name);
    fs.appendFile(name, editor.getValue(), (err) => {
      if (err) throw err;
      console.log('Archivo Creado Satisfactoriamente');
    });
}


function guardar()
{

    filename = dialog.showSaveDialog({}
    ).then(result => {
      filename = result.filePath;
      if (filename === undefined) {
        alert('Debe colocar un nombre para su archivo');
        return;
      }
      fs.writeFile(filename + RetornarExtencion(), editor.getValue(), (err) => {
        if (err) {
          alert('Error al crear el archivo ' + err.message);
          return
        }
        alert('Archivo creado correctamente');
      })
      alert('Hemos terminado!');
    }).catch(err => {
      alert(err)
    })
}


function Directorio()
{
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        direct = result.filePaths[0];
        document.getElementById('direction').innerText =  direct// `<p>${direct}</p>` ;
      }).catch(err => {
        console.log(err)
      })
    
}

function mostrar()
{
    fs.readdir(direct, function (err, archivos) {
        if (err) {
        onError(err);
        return;
        }
        var tabla = document.getElementById('tabla_');
        tabla.innerHTML = `<input type="submit" value="${archivos[0]}" onclick="Imprimir(this)" id="${direct + '\\' + archivos[0]}" name=""> <br>`;
        for(var i = 1; i < archivos.length; i++)
        {
            var aux = archivos[i];
            if(aux[0] != '~')
            {
                tabla.innerHTML += `<input type="submit" value="${archivos[i]}" onclick="Imprimir(this)" id="${direct + '\\' + archivos[i]}" name=""> <br>`;
            }
           
        }
        });
}

/* LEER FILE */
function Imprimir(iteme)
{
    item = iteme;
    console.log(item.id);
    var name_file = item.id;
    fs.readFile(name_file, 'utf8', (error, datos) => {
        if (error) throw error;
        console.log("El contenido es: ", datos);
        content = datos;
        editor.setValue(content);
    });
}


function convertir(ruta)
{
  nueva = "";
  for(var i = 0; i < ruta.length; i++)
  {
    if(ruta[i] == String.fromCharCode(92))
    {
      nueva += "\\";
    }
    else
    {
      nueva += ruta.charAt(i);
    }
  }
  return nueva;
}

function Run()
{
  
    if(lenguaje == "Python")
    {
      console.log(convertir(item.id));
      var exec = require('child_process').exec;
      exec('start'+ item.id, function (err, stdout, stderr) {
          if (err) {
              throw err;
          }
      });
    }
}

function SaveFile()
{
    DeleteFile(item.id);
    fs.appendFile(item.id, editor.getValue(), (err) => {
      if (err) throw err;
      console.log('Archivo Creado Satisfactoriamente');
    });
}

function Delete()
{
  editor.clearAnnotations();
}
