param(
    [Parameter(Mandatory=$false)]
    [string]$BotToken = "",
    
    [Parameter(Mandatory=$false)]
    [string]$ChatId = ""
)

if ([string]::IsNullOrEmpty($BotToken) -or [string]::IsNullOrEmpty($ChatId)) {
    Write-Host "Uso: .\test-telegram.ps1 -BotToken 'TOKEN' -ChatId 'ID'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Probando Bot de Telegram..." -ForegroundColor Cyan

$mensaje = "Hola! Tu bot de Telegram esta funcionando correctamente para el Taller 4."
$url = "https://api.telegram.org/bot$BotToken/sendMessage"

$params = @{
    chat_id = $ChatId
    text = $mensaje
}

try {
    Write-Host "Enviando mensaje de prueba..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $params
    
    if ($response.ok) {
        Write-Host "Mensaje enviado exitosamente!" -ForegroundColor Green
        Write-Host "Message ID: $($response.result.message_id)" -ForegroundColor White
        Write-Host "Chat ID: $($response.result.chat.id)" -ForegroundColor White
        Write-Host ""
        Write-Host "Tu bot esta listo para usar en n8n" -ForegroundColor Green
    } else {
        Write-Host "Error en la respuesta del API" -ForegroundColor Red
        Write-Host ($response | ConvertTo-Json -Depth 5)
    }
    
} catch {
    Write-Host "Error al enviar mensaje:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifica: Bot Token, Chat ID, o inicia conversacion con el bot (/start)" -ForegroundColor Yellow
}
