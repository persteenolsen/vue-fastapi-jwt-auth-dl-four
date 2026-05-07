<template>
  <div class="home">
        
    <!-- ✅ NEW: Welcome message -->
    <p class="welcome" v-if="username">Welcome, {{ username }}!</p>

    <h2>House Price Prediction</h2>

    <div v-if="predictStore.result !== null" class="result">

    <h3>    
    Predicted Price: $ {{ predictStore.result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
    </h3>

    </div>

    <form @submit.prevent="handlePredict">
      <div v-for="(value, key) in inputFeatures" :key="key" class="form-group">
        <label :for="key">{{ key.replace(/_/g, ' ') }}:</label>
        <input
          type="number"
          step="0.1"
          :id="key"
          v-model.number="inputFeatures[key]"
          required
          min="0"
        />
      </div>

      <button type="submit" :disabled="predictStore.loading">
        {{ predictStore.loading ? "Predicting..." : "Predict Price" }}
      </button>
    </form>

    
    <div v-if="predictStore.error" class="error">
      <p>Error: {{ predictStore.error }}</p>
    </div>


  </div>
</template>

<script>
import { reactive } from 'vue';
import { usePredictStore } from '@/stores/predict.store';

import { useAuthStore } from '@/stores'; // ✅ NEW: import auth store

export default {
  name: "Home",
  setup() {
    const predictStore = usePredictStore();

    const authStore = useAuthStore(); // ✅ NEW: get auth store

    // ✅ NEW: reactive username for welcome
    const username = authStore.user?.username || 'Guest';

    // All 7 features as floats and within Pydantic constraints
    const inputFeatures = reactive({
      Gr_Liv_Area: 1500.0,       // 100 < x < 10000
      Overall_Qual: 7.0,         // 0 < x < 10
      Year_Built: 2005.0,        // 1800 < x < 2026
      Garage_Cars: 2.0,          // 0 < x < 10
      Full_Bath: 2.0,            // 0 < x < 10
      Bedroom_AbvGr: 3.0,        // 0 < x < 10
      Lot_Area: 8000.0            // 1000 < x < 50000
    });

    const handlePredict = async () => {
      // Optional: ensure all values are floats
      const payload = {};
      for (const key in inputFeatures) {
        payload[key] = parseFloat(inputFeatures[key]);
      }
      await predictStore.predict(payload);
    };

    return {
      inputFeatures,
      predictStore,
      handlePredict,

      username // ✅ NEW: expose username to template
    };
  }
};
</script>

<style scoped>
.home {
  max-width: 500px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
}

input {
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.result {
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: green;
}

.error {
  margin-top: 1rem;
  color: red;
  font-weight: bold;
}

.welcome {
  color: green;
}

</style>