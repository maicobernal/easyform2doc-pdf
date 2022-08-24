# easyform2doc-pdf

## Tutorial en español
Bienvenido! Si llegaste hasta acá probablemente buscás alguna forma fácil de crear bases de datos sin saber programación.

## Con este código sencillo podrás:
- Crear un Google Docs a partir de los datos ingresados en un Google Forms
- Tener tus datos ingresados de Google Forms en un Google Spreadsheets
- Automatizar la creación de PDFs de esos documentos creados
- Automatizar el envío de emails con el PDF creado (opcional)

## Links de ejemplo: 
- [Ejemplo de formulario](https://tinyurl.com/37xtzejc)
- [Ejemplo de plantilla](https://tinyurl.com/mpdutz2e)
- [Carpeta de ejemplo](https://drive.google.com/drive/folders/12gPmg-1AJhTfQyQt6ejOZ7-j1E73AbYJ)

## Pasos a seguir:

### 1) Crear una carpeta con los siguientes archivos:
 - El formulario de Google Forms
 - El spreadsheet vinculado al Google Forms
 - Un Google Doc como plantilla desde donde se crearán los archivos nuevos con los datos ingresados
 - Dos carpetas: una donde se guardarán los PDF y otra los DOCs

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-19-50-22.png?raw=true)

### 2) A cada variable del formulario, agregarle al principio un número seguido de un guión. Este número servirá de referencia para la plantilla. [Ejemplo de formulario](https://tinyurl.com/37xtzejc)

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-19-53-19.png?raw=true)

### 3) En la plantilla pondremos entre dos llaves el número que corresponde al Google Forms. [Ejemplo de plantilla](https://tinyurl.com/mpdutz2e)

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-19-57-36.png?raw=true)

### 4) Abrir el spreedsheats y entrar a la sección de Apps Script donde pegaremos el código.
Recuerda tener vinculado tu spreedsheats con el formulario. Sino sabes como hacerlo acá hay un [tutorial](https://youtu.be/3fTvwAJbcmY?t=159)

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-20-08-00.png?raw=true)

Si te aparece un error que no se puede acceder en este momento: fijate de no tener varias sesiones de Google abiertas al mismo tiempo. Solo se puede acceder a Apps Script desde la cuenta que creó el formulario/spreedsheats. 

### 5) Dentro de Apps Script pegaremos el código.
Puede bajarlo de [aquí](https://github.com/maicobernal/easyform2doc-pdf/blob/main/gas-script.js).
Recuerda borrar primero el código que aparece por default. 

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-20-10-17.png?raw=true)

### 6) Pequeñas modificaciones al código:

a) Si no desea incorporar la función de enviar por email el PDF, borre desde la linea 1 hasta la 30 inclusive. 

b) Si desea automatizar el envio de email, ponga el nombre EXACTO que figura en el formulario para las variables EMAIL y NOMBRE (o lo que desee que se envie por mail) reemplazando el texto seleccionado en linea 4 y 5. 
![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-45-27.png?raw=true)

c) Reemplaze el texto que será enviado por email a su gusto. Recuerde reemplazar solo el texto entre comillas y no borrar \n que esta al final de cada oración. El ${nombre} va a escribir el nombre del paciente que se ingrese en el formulario (o de la variable que usted incluyó más arriba).
![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-48-15.png?raw=true)

d) Repita lo mismo para estas variables: Son las que se van a usar para generar el nombre del archivo DOC y PDF. 

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-50-41.png?raw=true)


e) Por ultimo, reemplaze el texto entre comillas de la siguiente forma (vea las imágenes para orientarse):

- templateFile: El ID del archivo plantilla que creó.
- docResponseFolder: El ID de la carpeta donde se guardarán los Google Docs
- pdfRespondeFoldeR: El ID de la carpeta donde se guardarán los PDF

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-51-12.png?raw=true)

Ejemplo de donde sacar el ID de las carpetas: 
![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-54-33.png?raw=true)

Ejemplo de donde sacar el ID de la plantilla:
![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-54-15.png?raw=true)


### 7) Guarde el archivo haciendo click en el botón de guardar:

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-57-29.png?raw=true)

### 8) Vaya a la sección ACTIVADORES y haga click en "Añadir activador" (Botón azul abajo a la izquierda)
![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-21-58-48.png?raw=true)

Ponga la siguiente configuración:

![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-22-00-28.png?raw=true)

Y acepte los permisos que le pedirá Google:
![](https://github.com/maicobernal/easyform2doc-pdf/blob/main/img/2022-08-23-22-05-23.png?raw=true)

### 9) LISTO! 
Pruebe enviar un formulario. Espere unos 30 segundos y aparecerá el DOC y PDF y el email enviado. 

### Consideraciones:
- No hay limite de variables, aunque tenga en cuenta que a más variables más engorroso el llenado del formulario. 
- No importa que los números en el formulario no estén ordenados, lo único que importa es que correspondan con el número asignado en la plantilla. Si usted quiere poner el número 35 entre el 3 y el 4, no hay problema. 
- Si el número del formulario no existe en la plantilla, el código sigue ejecutandose sin problemas. 
- Si la variable no tiene un número al principio, no se incluirá en el DOC ni PDF. 
- Da igual si usa "doble comillas" o 'comillas simples' siempre y cuando abre y cierra con el mismo tipo.
- Tenga cuidado de no copiar las barras / al momento de copiar el ID desde la URL.
- No es obligatorio ingresar un email, si no lo ingreso, el DOC y el PDF se crearán de todos modos. 

Si no funciona el código, lo más probable es que haya un error de tipeo.
Puede consultar los errores en la solapa EJECUCIONES.

Si tiene algún inconveniente no dude en contactarme por esta plataforma o por email a mibernalmd@gmail.com.