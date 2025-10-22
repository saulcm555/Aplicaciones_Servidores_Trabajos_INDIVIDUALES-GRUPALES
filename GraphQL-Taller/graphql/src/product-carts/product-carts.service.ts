import { Injectable, HttpException } from '@nestjs/common';
import { CreateProductCartInput } from './dto/create-product-cart.input';
import { UpdateProductCartInput } from './dto/update-product-cart.input';
import axios from 'axios';

@Injectable()
export class ProductCartsService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/product-carts';

  async create(createProductCartInput: CreateProductCartInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createProductCartInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating product cart', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching product carts', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Product cart #${id} not found`, error.response?.status || 404);
    }
  }

  async findByCart(cartId: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/cart/${cartId}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Product carts for cart #${cartId} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateProductCartInput: UpdateProductCartInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateProductCartInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating product cart', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting product cart', error.response?.status || 500);
    }
  }
}
