import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://fr.openfoodfacts.org/', // Peut être modifié ici si besoin
            timeout: 8000, // Timeout pour éviter les requêtes trop longues
        });
    }
    // Méthode pour effectuer des requêtes GET
    async get(url: string, params?: any) {
        try {
            const response = await this.axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            console.log('tu es passer dans le catch Error AxiosService');
            throw error;
        }
    }
    // Méthode pour effectuer des requêtes GETBy ID
    async getById(url: string, params?: any) {
        try {
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.log('tu es passer dans le catch Error AxiosService');
            throw error;
        }
    }
    // Méthode pour effectuer des requêtes POST (si besoin plus tard)
    async post(url: string, data: any) {
        try {
            const response = await this.axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}