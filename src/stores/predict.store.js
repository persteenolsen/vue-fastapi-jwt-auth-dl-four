// predict.store.js
import { defineStore } from 'pinia';
import { fetchWrapperPredict } from '@/helpers'; // legacy wrapper (login + API)

const baseUrl = `${import.meta.env.VITE_API_URL}/predict`;

export const usePredictStore = defineStore({
  id: 'predict',
  state: () => ({
    result: null,
    loading: false,
    error: null
  }),
  actions: {
    /**
     * Send house features to FastAPI /predict endpoint.
     * Input: object of numeric features matching your model.
     */
    async predict(input) {
      this.loading = true;
      this.result = null;
      this.error = null;

      try {
        // fetchWrapper automatically adds JWT from authStore
        const res = await fetchWrapperPredict.post(baseUrl, input, { json: true });

        // Assign the predicted value from the API response
        // Adjust the key based on your FastAPI return: "predicted_price", "prediction", or "result"
        this.result = res.predicted_price ?? res.prediction ?? res.result;

      } catch (err) {
        this.error = err.message || err;
      } finally {
        this.loading = false;
      }
    }
  }
});