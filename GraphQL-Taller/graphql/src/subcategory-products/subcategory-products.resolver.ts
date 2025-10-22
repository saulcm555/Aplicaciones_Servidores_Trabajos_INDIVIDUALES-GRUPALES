import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcategoryProductsService } from './subcategory-products.service';
import { SubcategoryProduct } from './entities/subcategory-product.entity';
import { CreateSubcategoryProductInput } from './dto/create-subcategory-product.input';
import { UpdateSubcategoryProductInput } from './dto/update-subcategory-product.input';

@Resolver(() => SubcategoryProduct)
export class SubcategoryProductsResolver {
  constructor(private readonly subcategoryProductsService: SubcategoryProductsService) {}

  @Mutation(() => SubcategoryProduct)
  createSubcategoryProduct(@Args('createSubcategoryProductInput') createSubcategoryProductInput: CreateSubcategoryProductInput) {
    return this.subcategoryProductsService.create(createSubcategoryProductInput);
  }

  @Query(() => [SubcategoryProduct], { name: 'subcategoryProducts' })
  findAll() {
    return this.subcategoryProductsService.findAll();
  }

  @Query(() => SubcategoryProduct, { name: 'subcategoryProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subcategoryProductsService.findOne(id);
  }

  @Query(() => [SubcategoryProduct], { name: 'subcategoryProductsBySubcategory' })
  findBySubcategory(@Args('subcategoryId', { type: () => Int }) subcategoryId: number) {
    return this.subcategoryProductsService.findBySubcategory(subcategoryId);
  }

  @Query(() => [SubcategoryProduct], { name: 'subcategoryProductsByProduct' })
  findByProduct(@Args('productId', { type: () => Int }) productId: number) {
    return this.subcategoryProductsService.findByProduct(productId);
  }

  @Mutation(() => SubcategoryProduct)
  updateSubcategoryProduct(@Args('updateSubcategoryProductInput') updateSubcategoryProductInput: UpdateSubcategoryProductInput) {
    return this.subcategoryProductsService.update(updateSubcategoryProductInput.id, updateSubcategoryProductInput);
  }

  @Mutation(() => SubcategoryProduct)
  removeSubcategoryProduct(@Args('id', { type: () => Int }) id: number) {
    return this.subcategoryProductsService.remove(id);
  }
}
