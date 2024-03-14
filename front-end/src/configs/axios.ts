import axios from 'axios';
import i18n from 'i18next';
import { toast } from 'react-hot-toast';

import { getCookie } from '@/utils/cookie';

import { apiUrl } from './config';

export const configureAxios = ({ onTokenError, onPaymentError }: { onTokenError: () => void; onPaymentError: () => void }) => {
  axios.interceptors.request.use((config) => {
    const token = getCookie('token');

    config.baseURL = apiUrl;
    config.headers = config.headers || {};

    config.headers.Accept = 'application/json';
    config.headers['Accept-Language'] = i18n.resolvedLanguage || 'fr';
    config.headers['Content-Type'] = 'application/json';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.error || error?.response?.data || error.message;
      if (error?.response?.status !== 402) {
        toast.error(message, {
          duration: 4000,
          position: 'bottom-right'
        });
      }

      if (error?.response?.status === 401) {
        onTokenError();
      } else if (error?.response?.status === 402) {
        onPaymentError();
      }
      return Promise.reject(error?.response?.data);
    }
  );
};
