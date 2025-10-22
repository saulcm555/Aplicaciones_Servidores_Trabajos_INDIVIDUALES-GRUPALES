import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductCartsService } from './product-carts.service';
import { ProductCart } from './entities/product-cart.entity';
import { CreateProductCartInput } from './dto/create-product-cart.input';
import { UpdateProductCartInput } from './dto/update-product-cart.input';

@Resolver(() => ProductCart)
export class ProductCartsResolver {
  constructor(private readonly productCartsService: ProductCartsService) {}

  @Mutation(() => ProductCart)
  createProductCart(@Args('createProductCartInput') createProductCartInput: CreateProductCartInput) {
    return this.productCartsService.create(createProductCartInput);
  }

  @Query(() => [ProductCart], { name: 'productCarts' })
  findAll() {
    return this.productCartsService.findAll();
  }

  @Query(() => ProductCart, { name: 'productCart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productCartsService.findOne(id);
  }

  @Query(() => [ProductCart], { name: 'productCartsByCart' })
  findByCart(@Args('cartId', { type: () => Int }) cartId: number) {
    return this.productCartsService.findByCart(cartId);
  }

  @Mutation(() => ProductCart)
  updateProductCart(@Args('updateProductCartInput') updateProductCartInput: UpdateProductCartInput) {
    return this.productCartsService.update(updateProductCartInput.id, updateProductCartInput);
  }

  @Mutation(() => ProductCart)
  removeProductCart(@Args('id', { type: () => Int }) id: number) {
    return this.productCartsService.remove(id);
  }
}
