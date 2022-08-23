////ESTA FUNCION RECIBE LOS DATOS Y LOS MANDA A LAS OTRAS DOS FUNCIONES 
////CREATEDOCANDPDF Y SENDEMAIL
function afterFormSubmit(e) {
  const nombre = e.namedValues['1- Nombre y apellido'][0]
  const email = e.namedValues[' 2- Email para enviar PDF'][0]

  ////MANDO LOS DATOS PARA CREAR EL DOC Y PDFba
  const pdfFile = createDOCandPDF(e);

  ///MANDO LOS DATOS DE NOMBRE, EMAIL Y EL PDF CREADO PARA ENVIAR EMAIL
  sendEmail(email, pdfFile, nombre);
}

////ESTA FUNCION ENVIA EL EMAIL
////SOLAMENTE CAMBIAR LOS DATOS EN COLOR ROJO
function sendEmail(email, pdfFile, nombre) {
  ////TITULO DEL EMAIL
  const asunto = "ASUNTO DEL EMAIL";

  ////CUERPO DEL EMAIL
  const cuerpo =
    `Se adjunta informe de XXXXXXX realizados al paciente ${nombre}.\n
Saludos cordiales,\n
Servicio de Cardiología XXXXXX`;

  GmailApp.sendEmail(email, asunto, cuerpo, {
    attachments: [pdfFile],
    name: 'NOMBRE DE QUIEN ENVIA EMAIL'
  })
}

function createDOCandPDF(e) {
  ////E.NAMEDVALUES = DATOS DEL FORM GUARDADOS COMO DICCIONARIO
  ////E.VALUES = DATOS DEL FORM GUARDADOS COMO ARRAY

  ////VARIABLES PARA GENERAR EL NOMBRE DEL ARCHIVO
  const nombre = e.namedValues['1- Nombre y apellido'][0]
  const fecha = e.namedValues['3- Fecha del procedimiento'][0]
  const tipoestudio = e.namedValues['4- Tipo de estudio'][0]

  ////RUTA DEL ARCHIVO TEMPLATE DE GOOGLE DOCS
  const templateFile = DriveApp.getFileById("1Fx1b_DmVbpzHQtQ2u5zeEtkgbZ7_a-R8NU0IP5U4tpo");

  ////CARPETA DONDE SE GUARDAN LOS INFORMES EN FORMATO GOOGLE DOC
  const docResponseFolder = DriveApp.getFolderById("1kDr2dslj8_bfVjiix1l1jdbSYNt22evY");

  ////CARPETA DONDE SE GUARDAN LOS INFORMES EN FORMATO PDF
  const pdfResponseFolder = DriveApp.getFolderById("1W17Yyq17ZVEk65DG_5QjfxIip5jozxL8");

  ////ACA SE ESTABLECE EL NOMBRE DEL ARCHIVO GOOGLE DOC
  ////COLOCAMOS LAS VARIABLES NOMBRE, FECHA, PREGUNTA 3 Y TITULO DEL TIPO DE ESTUDIO
  const copy = templateFile.makeCopy(nombre + '; ' + fecha + ' ; ' + tipoestudio, docResponseFolder);
  const doc = DocumentApp.openById(copy.getId());

  /////ACA MODIFICAMOS EL NUEVO GOOGLE DOC, REEMPLAZAMOS EL TEXTO ENTRE {{}}
  const body = doc.getBody();


  ///LOOP PARA REEMPLAZAR TODOS LOS TEXTOS CON FORMATO {{NUMERO}} CON EL ORDEN/NRO ASIGNADO EN EL FORM
  for (const [key, value] of Object.entries(e.namedValues)) {
    let str = key
    let match = str.match(/^\d+|^\s\d+/gm);
    let number = parseInt(match)
    if (isNaN(number) == false) {
      if (typeof (value) == 'object') {
        let text = value.join(", ");
        body.replaceText(`{{(${number})}}`, text);
      } else {
        body.replaceText(`{{(${number})}}`, value);
      }
    }
  }

  ///GENERA Y GUARDA EL GOOGLE DOC
  doc.saveAndClose();

  ///GENERO EL PDF A PARTIR DEL GOOGLE DOC
  const blobPDF = copy.getAs(MimeType.PDF);

  ///NOMBRE DEL ARCHIVO PDF
  const pdfFile = pdfResponseFolder.createFile(blobPDF).setName(nombre + '; ' + fecha + ' ; ' + tipoestudio);
  return pdfFile;
}
