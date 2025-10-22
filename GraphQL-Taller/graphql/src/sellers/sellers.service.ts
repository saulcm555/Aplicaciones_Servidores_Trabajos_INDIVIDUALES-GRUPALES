import { Injectable, HttpException } from '@nestjs/common';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import axios from 'axios';

@Injectable()
export class SellersService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/sellers';

  async create(createSellerInput: CreateSellerInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createSellerInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating seller', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching sellers', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Seller #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateSellerInput: UpdateSellerInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateSellerInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating seller', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting seller', error.response?.status || 500);
    }
  }
}
