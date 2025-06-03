<?php

namespace Tonitf\Portafolio\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class ContactController
{
    public function sendMessage(Request $request, Response $response): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        
        // Validación básica
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Todos los campos son obligatorios'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }
        
        // Validar email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Email no válido'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }
        
        // Aquí implementarías el envío real del email
        // Por ahora simulamos el envío
        $messageData = [
            'name' => htmlspecialchars($data['name']),
            'email' => htmlspecialchars($data['email']),
            'subject' => isset($data['subject']) ? htmlspecialchars($data['subject']) : 'Consulta desde portafolio',
            'message' => htmlspecialchars($data['message']),
            'type' => isset($data['type']) ? htmlspecialchars($data['type']) : 'general', // general, development, reiki
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        // Simulación de envío de email
        if ($this->sendEmail($messageData)) {
            $response->getBody()->write(json_encode([
                'success' => true,
                'message' => 'Mensaje enviado correctamente. Te contactaré pronto.'
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } else {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
      private function sendEmail(array $data): bool
    {
        try {
            $mail = new PHPMailer(true);

            // Configuración del servidor SMTP (usar variables de entorno)
            $mail->isSMTP();
            $mail->Host       = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = $_ENV['SMTP_USERNAME'] ?? '';
            $mail->Password   = $_ENV['SMTP_PASSWORD'] ?? '';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $_ENV['SMTP_PORT'] ?? 587;

            // Solo enviar si las credenciales están configuradas
            if (empty($_ENV['SMTP_USERNAME']) || empty($_ENV['SMTP_PASSWORD'])) {
                return $this->logMessage($data);
            }

            // Configuración del email
            $mail->setFrom($_ENV['SMTP_FROM'] ?? 'noreply@antoniotroitino.com', 'Portafolio Antonio Troitiño');
            $mail->addAddress($_ENV['CONTACT_EMAIL'] ?? 'antonio@antoniotroitino.com');
            $mail->addReplyTo($data['email'], $data['name']);

            // Contenido
            $mail->isHTML(true);
            $mail->Subject = 'Nuevo mensaje desde el portafolio: ' . $data['subject'];
            
            $htmlBody = $this->generateEmailTemplate($data);
            $mail->Body = $htmlBody;
            $mail->AltBody = $this->generatePlainTextEmail($data);

            $mail->send();
            $this->logMessage($data, true);
            return true;

        } catch (Exception $e) {
            error_log("Error enviando email: {$mail->ErrorInfo}");
            $this->logMessage($data, false);
            return false;
        }
    }

    private function logMessage(array $data, bool $emailSent = null): bool
    {
        $status = $emailSent === null ? 'LOGGED' : ($emailSent ? 'SENT' : 'FAILED');
        
        $logMessage = sprintf(
            "[%s] %s - Mensaje de %s (%s) - Tipo: %s\nAsunto: %s\nMensaje: %s\n---\n",
            $data['timestamp'],
            $status,
            $data['name'],
            $data['email'],
            $data['type'],
            $data['subject'],
            $data['message']
        );
        
        // Crear directorio de logs si no existe
        $logDir = __DIR__ . '/../../logs';
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
        
        file_put_contents($logDir . '/contact.log', $logMessage, FILE_APPEND | LOCK_EX);
        
        return true;
    }

    private function generateEmailTemplate(array $data): string
    {
        $typeLabels = [
            'general' => 'Consulta General',
            'development' => 'Desarrollo Web',
            'reiki' => 'Consulta Reiki'
        ];
        
        $typeLabel = $typeLabels[$data['type']] ?? 'Consulta General';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Nuevo mensaje desde el portafolio</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin: 10px 0; }
                .label { font-weight: bold; color: #555; }
                .value { margin-left: 10px; }
                .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Nuevo mensaje desde el portafolio</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <span class='label'>Nombre:</span>
                        <span class='value'>{$data['name']}</span>
                    </div>
                    <div class='field'>
                        <span class='label'>Email:</span>
                        <span class='value'>{$data['email']}</span>
                    </div>
                    <div class='field'>
                        <span class='label'>Tipo de consulta:</span>
                        <span class='value'>{$typeLabel}</span>
                    </div>
                    <div class='field'>
                        <span class='label'>Asunto:</span>
                        <span class='value'>{$data['subject']}</span>
                    </div>
                    <div class='field'>
                        <span class='label'>Fecha:</span>
                        <span class='value'>{$data['timestamp']}</span>
                    </div>
                    <div class='message-box'>
                        <div class='label'>Mensaje:</div>
                        <div style='margin-top: 10px;'>" . nl2br($data['message']) . "</div>
                    </div>
                </div>
            </div>
        </body>
        </html>";
    }

    private function generatePlainTextEmail(array $data): string
    {
        $typeLabels = [
            'general' => 'Consulta General',
            'development' => 'Desarrollo Web',
            'reiki' => 'Consulta Reiki'
        ];
        
        $typeLabel = $typeLabels[$data['type']] ?? 'Consulta General';
        
        return "
NUEVO MENSAJE DESDE EL PORTAFOLIO

Nombre: {$data['name']}
Email: {$data['email']}
Tipo: {$typeLabel}
Asunto: {$data['subject']}
Fecha: {$data['timestamp']}

Mensaje:
{$data['message']}
        ";
    }
}
