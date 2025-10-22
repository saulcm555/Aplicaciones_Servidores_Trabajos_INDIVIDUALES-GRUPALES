import { Injectable, HttpException } from '@nestjs/common';
import { CreateDeliveryInput } from './dto/create-delivery.input';
import { UpdateDeliveryInput } from './dto/update-delivery.input';
import axios from 'axios';

@Injectable()
export class DeliveriesService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/deliveries';

  async create(createDeliveryInput: CreateDeliveryInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createDeliveryInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating delivery', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching deliveries', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Delivery #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateDeliveryInput: UpdateDeliveryInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateDeliveryInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating delivery', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting delivery', error.response?.status || 500);
    }
  }
}
