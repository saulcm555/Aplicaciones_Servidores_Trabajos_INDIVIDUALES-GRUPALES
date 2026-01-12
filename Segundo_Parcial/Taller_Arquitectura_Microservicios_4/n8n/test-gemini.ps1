param(
    [Parameter(Mandatory=$false)]
    [string]$ApiKey = ""
)

if ([string]::IsNullOrEmpty($ApiKey)) {
    Write-Host "Uso: .\test-gemini.ps1 -ApiKey 'AIzaSyD...'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Probando API de Gemini..." -ForegroundColor Cyan

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$ApiKey"

$prompt = "Genera un mensaje breve y amigable para notificar que se ha creado un nuevo pedido en un sistema de e-commerce. Maximo 2 lineas."

$body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = $prompt
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

try {
    Write-Host "Enviando prompt a Gemini..." -ForegroundColor Yellow
    Write-Host "Prompt: '$prompt'" -ForegroundColor DarkGray
    Write-Host ""
    
    $response = Invoke-RestMethod -Uri $url -Method Post -ContentType "application/json" -Body $body
    
    if ($response.candidates) {
        $texto = $response.candidates[0].content.parts[0].text
        
        Write-Host "Respuesta recibida exitosamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "----------------------------------------" -ForegroundColor DarkGray
        Write-Host "Respuesta de Gemini:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host $texto -ForegroundColor White
        Write-Host "----------------------------------------" -ForegroundColor DarkGray
        Write-Host ""
        Write-Host "Tu API Key de Gemini esta lista para usar en n8n" -ForegroundColor Green
        
    } else {
        Write-Host "No se recibio respuesta valida" -ForegroundColor Red
        Write-Host ($response | ConvertTo-Json -Depth 5)
    }
    
} catch {
    Write-Host "Error al llamar a Gemini:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifica tu API Key o genera una nueva en: https://makersuite.google.com/app/apikey" -ForegroundColor Yellow
}
