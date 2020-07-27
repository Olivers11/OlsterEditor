const remote = require('electron').remote;
let posicion = false;
function validar(elemento)
{
    const currentWindow = remote.getCurrentWindow();
    if(elemento.id == 'minimizar')
    {
        remote.BrowserWindow.getFocusedWindow().minimize();
    }
    else if(elemento.id == 'maximizar')
    {

        if(posicion == false)
        {
            posicion = true;
        }
        else
        {
            posicion = false;
        }
        const status = currentWindow.isFullScreen();
        currentWindow.setFullScreen(!status);
        if(posicion)
        {
            document.getElementById('maximizar').innerText = "[ ]";
        }
        else
        {
            document.getElementById('maximizar').innerText = "+";
        }
        
    }
    else
    {
        remote.getCurrentWindow().close()
    }
}




