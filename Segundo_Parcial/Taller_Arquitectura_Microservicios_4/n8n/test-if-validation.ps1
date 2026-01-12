# Test con datos incompletos (deberia dar error 400)

Write-Host "=== Test de Validacion IF ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Datos completos (deberia pasar)
Write-Host "[Test 1] Datos completos - Deberia pasar" -ForegroundColor Yellow
$bodyOK = '{"evento":"test","data":{"mensaje":"Hola"}}'

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $bodyOK `
        -UseBasicParsing
    
    Write-Host "  [OK] Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Sin campo "evento" (deberia fallar)
Write-Host "[Test 2] Sin campo 'evento' - Deberia fallar (400)" -ForegroundColor Yellow
$bodyFail1 = '{"data":{"mensaje":"Hola"}}'

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $bodyFail1 `
        -UseBasicParsing
    
    Write-Host "  [PROBLEMA] Status: $($response.StatusCode) - Deberia ser 400" -ForegroundColor Yellow
    Write-Host "  Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "  [OK] Status: 400 - Validacion funciona!" -ForegroundColor Green
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "  Respuesta: $responseBody" -ForegroundColor White
    } else {
        Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 3: Sin campo "data" (deberia fallar)
Write-Host "[Test 3] Sin campo 'data' - Deberia fallar (400)" -ForegroundColor Yellow
$bodyFail2 = '{"evento":"test"}'

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $bodyFail2 `
        -UseBasicParsing
    
    Write-Host "  [PROBLEMA] Status: $($response.StatusCode) - Deberia ser 400" -ForegroundColor Yellow
    Write-Host "  Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "  [OK] Status: 400 - Validacion funciona!" -ForegroundColor Green
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "  Respuesta: $responseBody" -ForegroundColor White
    } else {
        Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Tests completados ===" -ForegroundColor Cyan
