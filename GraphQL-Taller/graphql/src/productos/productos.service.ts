import { Injectable, HttpException } from '@nestjs/common';
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';
import axios from 'axios';

@Injectable()
export class ProductosService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/products';

  async create(createProductoInput: CreateProductoInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createProductoInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating product', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching products', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Product #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateProductoInput: UpdateProductoInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateProductoInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating product', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting product', error.response?.status || 500);
    }
  }
}
