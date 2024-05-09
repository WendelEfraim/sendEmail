require('dotenv').config();
const nodemailer = require('nodemailer');
const formt = require('date-fns')
const fs = require('fs');
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
})

function enviarEmailF(tipo) {         //email financeiro
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.emailSend,
      pass: process.env.senha,
    }
  })

  const filePath = 'C:/Users/Wendel/Desktop/apps/ARQUIVO EXCEL/LISTA.xlsx';
  const fileContent = fs.readFileSync(filePath);
  const attachment = {
    filename: 'lista.xlsx',
    content: fileContent
  }


  const Medicos = process.env.emailReceive1
  const destinatario = tipo === '1' ? process.env.emailReceive2 : Medicos;

  transport.sendMail({
    from: '<>',
    to: destinatario,
    subject: 'AAAAAAAAAAAAAA',
    html: "<h1>Olá</h1>",
    text: 'Lista de teste',
    attachments: [attachment]
  })
    .then((response) => console.log('Email enviado!'))
    .catch((err) => console.log(err))

}

function enviarEmailM(tipo) {              //email medicos
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.emailSend,
      pass: process.env.senha,
    }
  })

  const filePath = 'C:/Users/Wendel/Desktop/apps/ARQUIVO EXCEL/LISTA.xlsx';
  const fileContent = fs.readFileSync(filePath);
  const attachment = {
    filename: 'lista.xlsx',
    content: fileContent
  }

  const day = new Date
  const Medicos = process.env.emailReceive1
  const destinatario = tipo === '1' ? process.env.emailReceive2 : Medicos;

  transport.sendMail({
    from: '<>',
    to: destinatario,
    subject: 'Lista teste',
    text: `Prezados médicos, bom dia! \n Hoje ${formt.format(day,"dd/MM/yyyy")} \n Em anexo lista de pacientes internados da geriatria`,
    attachments: [attachment]
  })
    .then((response) => console.log('Email enviado!'))
    .catch((err) => console.log(err))

}

function fazerPergunta() {
  readline.question('N° 1 = Para Financeiro. // N° 2 = Para Medicos.     Sua resposta = ', (Enviar) => {
    if (Enviar === "1") {
      enviarEmailF(Enviar);
      readline.close();
    }
    if(Enviar === "2"){
      enviarEmailM(Enviar);
      readline.close();
    } else {
      console.log('Não existe esta opção. Por favor, digite 1 ou 2.');
      fazerPergunta(); // Pergunta novamente
    }
  });
}

fazerPergunta();
