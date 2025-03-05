export const verifyAccount = (name,verificationUrl) =>{
return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verificación de Cuenta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
        }
        .header {
            background: #4CAF50;
            padding: 15px;
            border-radius: 10px 10px 0 0;
            color: #fff;
            font-size: 20px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
        .btn {
            display: inline-block;
            background: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Verificación de Cuenta</div>
        <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            <p>Gracias por registrarte en nuestro sistema de inventario. Para activar tu cuenta, confirma tu correo electrónico haciendo clic en el siguiente botón:</p>
            <a class="btn" href="${verificationUrl}">Verificar Cuenta</a>
            <p><strong>Este enlace expirará en 1 hora.</strong></p>
            <p>Si no fuiste tú quien solicitó el registro, ignora este correo.</p>
        </div>
        <div class="footer">
            <p>Atentamente,</p>
            <p>El equipo de soporte del Sistema de Inventario</p>
        </div>
    </div>
</body>
</html>

    
    ` 
}