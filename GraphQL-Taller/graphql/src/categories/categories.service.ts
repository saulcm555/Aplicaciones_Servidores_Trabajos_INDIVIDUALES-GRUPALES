import { Injectable, HttpException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import axios from 'axios';

@Injectable()
export class CategoriesService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/categories';

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createCategoryInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating category', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching categories', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Category #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateCategoryInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating category', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting category', error.response?.status || 500);
    }
  }
}
