# n8n - Automatización de Eventos - Taller 4

## 📚 Documentación del Proyecto

- **[CHECKLIST-TRABAJO-PREVIO.md](CHECKLIST-TRABAJO-PREVIO.md)** → Lista de tareas del trabajo previo
- **[INSTRUCCIONES-CREDENCIALES.md](INSTRUCCIONES-CREDENCIALES.md)** → Cómo obtener y configurar credenciales
- **[EXPORTAR-WORKFLOW.md](EXPORTAR-WORKFLOW.md)** → Cómo exportar workflows a JSON

---

## 🚀 Inicio Rápido

### 1. Levantar n8n
```powershell
cd n8n
docker-compose up -d
```

### 2. Acceder a la Interfaz
- **URL**: http://localhost:5678
- **Usuario**: `admin`
- **Password**: `uleam2025`

### 3. Ver logs
```powershell
docker-compose logs -f n8n
```

### 4. Detener
```powershell
docker-compose down
```

---

## 📋 Eventos del Sistema

### Orders Service
| Evento | Descripción | Cuándo se emite |
|--------|-------------|-----------------|
| `pedido.recibido` | Nueva orden creada | Al crear una orden |
| `pedido.confirmado` | Orden confirmada con stock | Cuando hay stock disponible |
| `pedido.cancelado` | Orden cancelada | Cuando no hay stock suficiente |

### Products Service
| Evento | Descripción | Cuándo se emite |
|--------|-------------|-----------------|
| `egreso.creado` | Stock reducido | Cuando se reserva stock |
| `producto.stock_bajo` | Stock crítico | Cuando stock ≤ 5 unidades |

## 🔗 Webhook URL

Los servicios envían eventos a:
```
http://localhost:5678/webhook/eventos
```

## 📊 Estructura de Eventos

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

## 🧪 Probar Manualmente

### Test básico
```powershell
curl http://localhost:5678/webhook/eventos -Method POST -ContentType "application/json" -Body '{"evento":"test","data":{"mensaje":"Hola"}}'
```

### Simular evento de pedido
```powershell
.\test-webhook.ps1
```

## 📝 Workflows a Implementar

### Workflow 1: Notificación en Tiempo Real
**Eventos**: `pedido.recibido`, `pedido.confirmado`, `pedido.cancelado`

**Flujo**:
- Webhook → IF (Validar) → Code (Preparar) → Gemini AI → Telegram

**Objetivo**: Notificar por Telegram con mensaje generado por IA

### Workflow 2: Sincronización Google Sheets
**Eventos**: Todos

**Flujo**:
- Webhook → Code (Transformar) → Google Sheets (Append Row)

**Objetivo**: Registro administrativo de todas las operaciones

### Workflow 3: Alertas Críticas
**Eventos**: `producto.stock_bajo`, `pedido.cancelado`

**Flujo**:
- Webhook → IF (¿Crítico?) → Gemini (Analizar) → Switch (Urgencia) → [Alta: Telegram | Media: Email | Baja: Log]

**Objetivo**: Alertas diferenciadas por nivel de urgencia

## 🔑 Credenciales Necesarias

### Telegram Bot
1. Hablar con @BotFather en Telegram
2. Crear bot: `/newbot`
3. Guardar token de acceso
4. Obtener Chat ID (usar @userinfobot)

### Google Sheets API
1. Ir a Google Cloud Console
2. Crear proyecto
3. Habilitar Google Sheets API
4. Crear credenciales OAuth 2.0

### Gemini API
- Usar la misma API key del API Gateway
- Variable: `GEMINI_API_KEY`

## 📦 Exportar/Importar Workflows

### Exportar
1. Abrir workflow en n8n
2. Click en los tres puntos (⋮)
3. "Download"
4. Guardar en `workflows/`

### Importar
1. Click en "+" → "Import from file"
2. Seleccionar archivo JSON
3. Configurar credenciales

## 🐛 Troubleshooting

### Error: "webhook not registered"
- El workflow no está publicado
- Solución: Click en "Publish"

### Error: Connection refused
- n8n no está corriendo
- Solución: `docker-compose up -d`

### Error: No se reciben eventos
- Verificar que los servicios tengan `N8N_ENABLED=true` en .env
- Verificar que `N8N_WEBHOOK_URL` apunte a `http://localhost:5678/webhook/eventos`
- Ver logs de los servicios: `npm run start:dev`

## 📸 Capturas Requeridas

Para el trabajo previo:
1. ✅ n8n corriendo en localhost:5678
2. ✅ Workflow básico con webhook activo
3. ✅ Ejecución exitosa mostrando datos recibidos
4. ✅ Servicio emitiendo eventos (logs)

## 🎯 Próximos Pasos

1. ✅ Crear bot de Telegram
2. ✅ Configurar Google Sheets API  
3. ✅ Crear Workflow 1: Notificación Tiempo Real
4. ✅ Crear Workflow 2: Sincronización Sheets
5. ✅ Crear Workflow 3: Alertas Críticas
6. ✅ Probar flujo end-to-end completo
7. ✅ Grabar video demostración
