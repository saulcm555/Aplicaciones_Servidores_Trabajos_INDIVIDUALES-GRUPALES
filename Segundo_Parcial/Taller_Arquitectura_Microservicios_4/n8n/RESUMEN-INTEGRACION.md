# 🎯 Resumen de Integración n8n - Taller 4

## ✅ Trabajo Completado

### 1. Infraestructura n8n
- ✅ Docker Compose configurado en `n8n/docker-compose.yml`
- ✅ n8n corriendo en http://localhost:5678
- ✅ Workflow básico creado y funcionando
- ✅ Webhook respondiendo en `/webhook/eventos`

### 2. Backend Integration
- ✅ Variables de entorno configuradas en ambos servicios
- ✅ Orders Service emitiendo eventos a n8n
- ✅ Products Service emitiendo eventos a n8n
- ✅ Manejo de errores implementado

### 3. Eventos Implementados

#### Orders Service → n8n
| Evento | Cuándo | Datos |
|--------|--------|-------|
| `pedido.recibido` | Nueva orden creada | orderId, productId, quantity, status |
| `pedido.confirmado` | Stock reservado exitosamente | orderId, status, productId, quantity |
| `pedido.cancelado` | Sin stock disponible | orderId, status, reason |

#### Products Service → n8n
| Evento | Cuándo | Datos |
|--------|--------|-------|
| `egreso.creado` | Stock reducido | productId, productName, previousStock, newStock |
| `producto.stock_bajo` | Stock ≤ 5 unidades | productId, productName, currentStock, urgencia |

### 4. Archivos Creados/Modificados

```
✅ n8n/docker-compose.yml
✅ n8n/README.md
✅ n8n/test-webhook.ps1
✅ orders-service/.env
✅ orders-service/src/orders/orders.service.ts
✅ products-service/.env
✅ products-service/src/products/products.service.ts
```

---

## 🧪 Cómo Probar

### 1. Verificar que n8n está corriendo
```powershell
cd n8n
docker ps | Select-String "n8n"
```

### 2. Probar webhooks manualmente
```powershell
cd n8n
.\test-webhook.ps1
```

### 3. Iniciar los servicios
```powershell
# Terminal 1 - Orders Service
cd orders-service
npm run start:dev

# Terminal 2 - Products Service  
cd products-service
npm run start:dev
```

### 4. Crear una orden (simula el flujo real)
```powershell
# Esto debería emitir eventos a n8n automáticamente
curl -X POST http://localhost:3002/orders `
  -H "Content-Type: application/json" `
  -d '{"productId":"PROD-ID","quantity":2}'
```

### 5. Ver ejecuciones en n8n
- Ir a http://localhost:5678
- Click en "Executions" (panel izquierdo)
- Revisar los eventos recibidos

---

## 📋 Próximos Pasos (Para la Clase Presencial)

### Paso 1: Crear Bot de Telegram (15 min)
1. Abrir Telegram
2. Buscar @BotFather
3. Enviar `/newbot`
4. Seguir instrucciones
5. Guardar el token
6. Obtener Chat ID con @userinfobot

### Paso 2: Configurar Google Sheets API (15 min)
1. Google Cloud Console
2. Crear proyecto
3. Habilitar Google Sheets API
4. Crear credenciales OAuth 2.0
5. Crear una hoja de cálculo de prueba

### Paso 3: Workflow 1 - Notificación Tiempo Real (30 min)
**Nodos**:
- Webhook (ya existe)
- IF → Validar campos
- Code → Preparar prompt
- HTTP Request → Gemini AI
- Code → Extraer respuesta
- Telegram → Notificar

### Paso 4: Workflow 2 - Sincronización Sheets (20 min)
**Nodos**:
- Webhook
- Code → Transformar datos
- Google Sheets → Append Row

### Paso 5: Workflow 3 - Alertas Críticas (30 min)
**Nodos**:
- Webhook
- IF → ¿Es crítico?
- HTTP Request → Gemini (analizar urgencia)
- Switch → Por nivel
  - Alta → Telegram
  - Media → Email
  - Baja → Log

### Paso 6: Pruebas End-to-End (20 min)
- Crear orden desde API Gateway
- Verificar notificación en Telegram
- Verificar registro en Google Sheets
- Probar alerta de stock bajo

### Paso 7: Video Demo (10 min)
- Grabar flujo completo
- Mostrar n8n workflows
- Mostrar notificaciones
- Mostrar Google Sheets

---

## 🎓 Conceptos Clave Implementados

### Event-Driven Architecture
- Los servicios emiten eventos sin saber quién los consume
- n8n reacciona automáticamente a los eventos
- Desacoplamiento total entre servicios y automatizaciones

### Asynchronous Communication
- Los eventos se envían de forma no bloqueante
- Si n8n no responde, no afecta el flujo principal
- Logs detallados para debugging

### Idempotencia
- Mismo evento puede ser procesado múltiples veces sin problema
- n8n puede tener múltiples workflows escuchando el mismo webhook

---

## 📊 Datos de Ejemplo para Pruebas

### Crear Orden
```json
{
  "productId": "uuid-del-producto",
  "quantity": 2
}
```

### Actualizar Stock (reducir)
```json
{
  "stock": 3
}
```

### Respuesta Esperada en n8n
```json
{
  "evento": "pedido.recibido",
  "timestamp": "2025-01-11T10:00:00Z",
  "data": {
    "orderId": "uuid",
    "productId": "uuid",
    "quantity": 2,
    "status": "PENDING"
  },
  "metadata": {
    "source": "orders-service",
    "version": "1.0.0"
  }
}
```

---

## 🐛 Troubleshooting

### Los servicios no envían eventos a n8n
- Verificar `.env` tiene `N8N_ENABLED=true`
- Verificar `N8N_WEBHOOK_URL=http://localhost:5678/webhook/eventos`
- Reiniciar los servicios

### n8n no recibe los eventos
- Verificar que el workflow esté publicado
- Verificar URL del webhook en el nodo
- Ver logs: `docker-compose logs -f n8n`

### Error "fetch is not defined"
- Node.js < 18 no tiene fetch global
- Solución: Actualizar Node.js o instalar `node-fetch`

---

## 📸 Capturas Requeridas para Entregables

1. ✅ n8n corriendo (dashboard)
2. ✅ Workflow básico activo
3. ✅ Ejecución exitosa en n8n
4. ✅ Logs del servicio emitiendo eventos
5. ⏳ Workflow 1 completo (Telegram)
6. ⏳ Workflow 2 completo (Sheets)
7. ⏳ Workflow 3 completo (Alertas)
8. ⏳ Google Sheet con datos
9. ⏳ Notificación en Telegram
10. ⏳ Flujo end-to-end funcionando

---

## 🎯 Estado Actual

### ✅ Completado (Trabajo Previo)
- [x] n8n instalado y corriendo
- [x] Webhook básico funcionando
- [x] Backend emitiendo eventos
- [x] Script de pruebas
- [x] Documentación

### ⏳ Pendiente (Clase Presencial)
- [ ] Bot de Telegram configurado
- [ ] Google Sheets API configurada
- [ ] Workflow 1: Notificación
- [ ] Workflow 2: Sincronización
- [ ] Workflow 3: Alertas
- [ ] Pruebas end-to-end
- [ ] Video demostración

---

**¡Listo para la clase presencial!** 🚀
