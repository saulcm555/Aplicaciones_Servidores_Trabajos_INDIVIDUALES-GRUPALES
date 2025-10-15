import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductCart } from '../../product-carts/entities/product-cart.entity';
import { ProductOrder } from '../../product-orders/entities/product-order.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('increment', { name: 'id_product' })
  id_product: number;

  @Column({ name: 'id_seller', type: 'int', nullable: true })
  id_seller: number;

  @Column({ name: 'id_category', type: 'int', nullable: true })
  id_category: number;

  @Column({ name: 'id_sub_category', type: 'int', nullable: true })
  id_sub_category: number;

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  product_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  // Relaciones
  @OneToMany(() => ProductCart, (productCart) => productCart.product)
  productCarts: ProductCart[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
  productOrders: ProductOrder[];
}
