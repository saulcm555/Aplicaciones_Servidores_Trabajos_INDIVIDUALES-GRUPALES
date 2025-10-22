import { Injectable, HttpException } from '@nestjs/common';
import { CreatePaymentMethodInput } from './dto/create-payment-method.input';
import { UpdatePaymentMethodInput } from './dto/update-payment-method.input';
import axios from 'axios';

@Injectable()
export class PaymentMethodsService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/payment-methods';

  async create(createPaymentMethodInput: CreatePaymentMethodInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createPaymentMethodInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating payment method', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching payment methods', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Payment method #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updatePaymentMethodInput: UpdatePaymentMethodInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updatePaymentMethodInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating payment method', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting payment method', error.response?.status || 500);
    }
  }
}
