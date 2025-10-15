-- Script SQL para datos de prueba del Marketplace
-- Ejecutar después de que TypeORM haya creado las tablas

-- ============================================
-- 1. CLIENTS (Clientes)
-- ============================================
INSERT INTO client (client_name, client_email, client_password, phone, address, created_at) VALUES
('Juan Pérez', 'juan@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', '0999111222', 'Av. Principal 123, Quito', NOW()),
('María González', 'maria@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', '0988333444', 'Calle Secundaria 456, Guayaquil', NOW()),
('Carlos Ruiz', 'carlos@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', '0977555666', 'Pasaje Los Andes 789, Cuenca', NOW());

-- ============================================
-- 2. PAYMENT METHODS (Métodos de pago)
-- ============================================
INSERT INTO payment_method (method_name, details_payment) VALUES
('Tarjeta de Crédito', 'Visa, Mastercard, American Express'),
('Tarjeta de Débito', 'Débito bancario'),
('Transferencia Bancaria', 'Transferencia directa'),
('PayPal', 'Pago mediante PayPal'),
('Efectivo', 'Pago contra entrega');

-- ============================================
-- 3. CATEGORIES Y SUBCATEGORIES
-- (Asumiendo que ya existen en tu base de datos)
-- ============================================

-- ============================================
-- 4. PRODUCTS (Productos de ejemplo)
-- (Asumiendo estructura básica)
-- ============================================
-- Nota: Ajusta según tu estructura real de productos

-- ============================================
-- 5. CARTS (Carritos)
-- ============================================
INSERT INTO cart (id_client, status, created_at, updated_at) VALUES
(1, 'active', NOW(), NOW()),
(2, 'active', NOW(), NOW()),
(3, 'completed', NOW(), NOW());

-- ============================================
-- 6. PRODUCT_CART (Productos en carritos)
-- ============================================
-- Nota: Ajusta los id_product según tus productos existentes
INSERT INTO product_cart (id_product, id_cart, quantity, added_at) VALUES
(1, 1, 2, NOW()),
(2, 1, 1, NOW()),
(3, 2, 3, NOW()),
(4, 2, 1, NOW());

-- ============================================
-- 7. ORDERS (Órdenes)
-- ============================================
INSERT INTO "order" (order_date, status, total_amount, delivery_date, id_client, id_cart, id_payment_method, created_at) VALUES
(NOW(), 'pending', 150.50, '2025-10-20', 1, 1, 1, NOW()),
(NOW(), 'processing', 85.75, '2025-10-22', 2, 2, 2, NOW()),
(NOW() - INTERVAL '2 days', 'delivered', 200.00, '2025-10-15', 3, 3, 3, NOW() - INTERVAL '2 days');

-- ============================================
-- 8. PRODUCT_ORDER (Productos en órdenes)
-- ============================================
-- Nota: Ajusta los id_product según tus productos existentes
INSERT INTO product_order (id_order, id_product, price_unit, quantity, subtotal, created_at) VALUES
(1, 1, 50.25, 2, 100.50, NOW()),
(1, 2, 50.00, 1, 50.00, NOW()),
(2, 3, 28.58, 3, 85.75, NOW()),
(3, 4, 100.00, 2, 200.00, NOW());

-- ============================================
-- 9. DELIVERIES (Entregas)
-- ============================================
INSERT INTO delivery (id_product, id_order, delivery_address, city, status, estimated_time, delivery_person, delivery_cost, created_at) VALUES
(NULL, 1, 'Av. Principal 123, Quito', 'Quito', 'pending', NOW() + INTERVAL '2 days', 'Pedro Sánchez', 5.00, NOW()),
(NULL, 2, 'Calle Secundaria 456, Guayaquil', 'Guayaquil', 'in_transit', NOW() + INTERVAL '1 day', 'Laura Martínez', 7.50, NOW()),
(NULL, 3, 'Pasaje Los Andes 789, Cuenca', 'Cuenca', 'delivered', NOW() - INTERVAL '1 day', 'Jorge López', 6.00, NOW() - INTERVAL '3 days');

-- ============================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- ============================================

-- Contar clientes
SELECT COUNT(*) as total_clients FROM client;

-- Contar carritos activos
SELECT COUNT(*) as active_carts FROM cart WHERE status = 'active';

-- Contar órdenes por estado
SELECT status, COUNT(*) as count FROM "order" GROUP BY status;

-- Ver carritos con sus productos
SELECT 
    c.id_cart,
    cl.client_name,
    c.status,
    COUNT(pc.id_product_cart) as total_items
FROM cart c
JOIN client cl ON c.id_client = cl.id_client
LEFT JOIN product_cart pc ON c.id_cart = pc.id_cart
GROUP BY c.id_cart, cl.client_name, c.status;

-- Ver órdenes con detalles
SELECT 
    o.id_order,
    cl.client_name,
    o.order_date,
    o.status,
    o.total_amount,
    pm.method_name as payment_method,
    d.status as delivery_status
FROM "order" o
JOIN client cl ON o.id_client = cl.id_client
JOIN payment_method pm ON o.id_payment_method = pm.id_payment_method
LEFT JOIN delivery d ON o.id_order = d.id_order
ORDER BY o.order_date DESC;

-- ============================================
-- CONSULTAS ÚTILES PARA TESTING
-- ============================================

-- Ver todos los productos en el carrito de un cliente
SELECT 
    c.id_cart,
    cl.client_name,
    pc.id_product,
    pc.quantity,
    pc.added_at
FROM cart c
JOIN client cl ON c.id_client = cl.id_client
JOIN product_cart pc ON c.id_cart = pc.id_cart
WHERE cl.id_client = 1;

-- Ver todos los productos de una orden
SELECT 
    o.id_order,
    po.id_product,
    po.price_unit,
    po.quantity,
    po.subtotal
FROM "order" o
JOIN product_order po ON o.id_order = po.id_order
WHERE o.id_order = 1;

-- Ver delivery de una orden
SELECT 
    d.*,
    o.id_order,
    o.status as order_status
FROM delivery d
JOIN "order" o ON d.id_order = o.id_order
WHERE o.id_order = 1;
