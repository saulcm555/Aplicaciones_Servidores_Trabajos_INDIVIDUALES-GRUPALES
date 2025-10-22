import { Injectable, HttpException } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import axios from 'axios';

@Injectable()
export class ClientsService {
  private readonly REST_API_URL = 'http://localhost:3000/api/v1/clients';

  async create(createClientInput: CreateClientInput) {
    try {
      const response = await axios.post(this.REST_API_URL, createClientInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error creating client', error.response?.status || 500);
    }
  }

  async findAll() {
    try {
      const response = await axios.get(this.REST_API_URL);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error fetching clients', error.response?.status || 500);
    }
  }

  async findOne(id: number) {
    try {
      const response = await axios.get(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || `Client #${id} not found`, error.response?.status || 404);
    }
  }

  async update(id: number, updateClientInput: UpdateClientInput) {
    try {
      const response = await axios.patch(`${this.REST_API_URL}/${id}`, updateClientInput);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error updating client', error.response?.status || 500);
    }
  }

  async remove(id: number) {
    try {
      const response = await axios.delete(`${this.REST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Error deleting client', error.response?.status || 500);
    }
  }
}
