import { Injectable } from '@nestjs/common';
import { CreateSubcategoryProductInput } from './dto/create-subcategory-product.input';
import { UpdateSubcategoryProductInput } from './dto/update-subcategory-product.input';

@Injectable()
export class SubcategoryProductsService {
  create(createSubcategoryProductInput: CreateSubcategoryProductInput) {
    return 'This action adds a new subcategoryProduct';
  }

  findAll() {
    return `This action returns all subcategoryProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategoryProduct`;
  }

  findBySubcategory(subcategoryId: number) {
    return `This action returns all products for subcategory #${subcategoryId}`;
  }

  findByProduct(productId: number) {
    return `This action returns all subcategories for product #${productId}`;
  }

  update(id: number, updateSubcategoryProductInput: UpdateSubcategoryProductInput) {
    return `This action updates a #${id} subcategoryProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcategoryProduct`;
  }
}
