import { Injectable, HttpException } from '@nestjs/common';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import axios from 'axios';

@Injectable()
export class InventoriesService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/inventories';

  async create(createInventoryInput: CreateInventoryInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createInventoryInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating inventory', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching inventories', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Inventory #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateInventoryInput: UpdateInventoryInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateInventoryInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating inventory', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting inventory', error.response?.status || 500);
    }
  }
}
