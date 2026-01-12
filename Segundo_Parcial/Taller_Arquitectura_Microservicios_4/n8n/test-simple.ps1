# Test simple del webhook de n8n

Write-Host "Probando webhook de n8n..." -ForegroundColor Cyan

$body = '{"evento":"test","timestamp":"2025-01-11T10:00:00Z","data":{"mensaje":"Hola n8n"}}'

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -UseBasicParsing
    
    Write-Host "OK - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Detalle: $responseBody" -ForegroundColor Yellow
    }
}
