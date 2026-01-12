# Script para probar webhooks de n8n
# Encoding: UTF-8

Write-Host "=== Test de Webhooks n8n ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Evento basico
Write-Host "[Test 1] Evento basico" -ForegroundColor Yellow
$body1 = @{
    evento = "test.basico"
    timestamp = (Get-Date -Format "o")
    data = @{
        mensaje = "Hola desde PowerShell"
    }
} | ConvertTo-Json

try {
    $response1 = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body1
    Write-Host "[OK] Respuesta: $($response1.Content)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Simular pedido recibido
Write-Host "[Test 2] Pedido Recibido" -ForegroundColor Yellow
$body2 = @{
    evento = "pedido.recibido"
    timestamp = (Get-Date -Format "o")
    data = @{
        orderId = "TEST-" + (Get-Random -Minimum 1000 -Maximum 9999)
        productId = "PROD-001"
        quantity = 3
        status = "PENDING"
    }
    metadata = @{
        source = "test-script"
        version = "1.0.0"
    }
} | ConvertTo-Json -Depth 5

try {
    $response2 = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body2
    Write-Host "[OK] Respuesta: $($response2.Content)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Simular stock bajo
Write-Host "[Test 3] Stock Bajo (Alerta Critica)" -ForegroundColor Yellow
$body3 = @{
    evento = "producto.stock_bajo"
    timestamp = (Get-Date -Format "o")
    data = @{
        productId = "PROD-001"
        productName = "Laptop HP"
        currentStock = 2
        threshold = 5
        urgencia = "media"
    }
    metadata = @{
        source = "test-script"
        version = "1.0.0"
    }
} | ConvertTo-Json -Depth 5

try {
    $response3 = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body3
    Write-Host "[OK] Respuesta: $($response3.Content)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Simular pedido cancelado
Write-Host "[Test 4] Pedido Cancelado" -ForegroundColor Yellow
$body4 = @{
    evento = "pedido.cancelado"
    timestamp = (Get-Date -Format "o")
    data = @{
        orderId = "TEST-" + (Get-Random -Minimum 1000 -Maximum 9999)
        productId = "PROD-002"
        quantity = 5
        status = "REJECTED"
        reason = "OUT_OF_STOCK"
    }
    metadata = @{
        source = "test-script"
        version = "1.0.0"
    }
} | ConvertTo-Json -Depth 5

try {
    $response4 = Invoke-WebRequest -Uri "http://localhost:5678/webhook/eventos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body4
    Write-Host "[OK] Respuesta: $($response4.Content)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Tests completados" -ForegroundColor Cyan
Write-Host "Ve a n8n (http://localhost:5678) y revisa las ejecuciones en 'Executions'" -ForegroundColor Yellow

