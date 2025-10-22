import { Injectable, HttpException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import axios from 'axios';

@Injectable()
export class OrdersService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/orders';

  async create(createOrderInput: CreateOrderInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createOrderInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating order', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching orders', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Order #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateOrderInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating order', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting order', error.response?.status || 500);
    }
  }
}
