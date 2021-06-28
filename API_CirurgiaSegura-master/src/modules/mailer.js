const nodemailer = require('nodemailer');

// Configuração de SMTP
const createTransport = (emailChange, passEmailChange) => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailChange,
    pass: passEmailChange,
  },
});

// Dados do email a ser enviado token
const createMail = (emailSource, emailTarget, _html) => ({
  from: emailSource,
  to: emailTarget,
  subject: 'SAUDE APP - Recuperação de Senha',
  html: _html,
});

const getHtml = (token, nome) => `<div class=""> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#eaeaef;">\
 <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family: Open Sans sans-serif;width:100%;max-width:600px;"> \
 <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin-left:10px;margin-right:10px;"> \
 <tbody> <tr> <td align="center" style="padding:20px 20px 20px 20px;font-family: Open Sans, sans-serif;"> \
 <img src="" alt="SAUDE Logo" width="200px" style="display:block" class="CToWUd"> </td> </tr> <tr> \
 <td bgcolor="#ffffff" style="padding:40px 40px 0px 40px;margin:0px;border-top-right-radius:5px;border-top-left-radius:5px;font-family: Open Sans, sans-serif;"> \
 <h1 style="padding:0px;color:#0d0d0d;margin:0;font-size:21px;"> Esqueceu sua senha? Não tem problema! </h1> </td> </tr> <tr> \
 <td bgcolor="#ffffff" style="padding:15px 40px 0px 40px;margin:0px;border-top-right-radius:5px;border-top-left-radius:5px;font-family: Open Sans, sans-serif;"> \
 <hr style="border:0.5px solid #dcdce0"> </td> </tr> <tr> <td bgcolor="#ffffff" style="padding:30px 40px 0px 40px;font-family: Open Sans, sans-serif;"> \
 <p style="padding:0px;color:#5d666f;margin:0;font-size:16px"> \
 <strong>Olá, ${nome}!</strong> <br><br> Você solicitou o cadastro de uma nova senha, para redefini-la copie o codigo de verificação e cole no campo solicitado no aplicativo.</p> \
 <br> </td> </tr> <tr> <td align="center" bgcolor="#ffffff" style="padding:30px 40px 20px 40px;font-family: Open Sans, sans-serif;border-bottom-right-radius:5px;border-bottom-left-radius:5px;"> \
 <p style="height:50px;width:220px;background-color:#18a689;border-radius:10px;text-decoration:none;line-height:50px;display:table;text-align:center;font-weight:bold;font-size:16px;color:white;" alt="TOKEN" target="_blank ">${token}</p> \
 <br><br> </td> </tr> <tr> <td bgcolor="#EAEAEF" style="padding:10px 40px 10px 40px;font-family: Open Sans, sans-serif;"> <p style="padding:0px;color:#5d666f;margin:0;font-size:14px;text-align:center; ">Enviado por desenvolvedores do APP SAÚDE.</p> \
 </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> </div> </div> </div>`;

module.exports = {
  createTransport,
  getHtml,
  createMail,
};
