import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5137";

axios.interceptors.response.use(
  (response) => {
    // אם התגובה תקינה (status 200), אנחנו מחזירים אותה כמו שהיא
    return response;
  },
  (error) => {
    // אם יש שגיאה בתגובה, נרשום אותה בלוג
    // בודקים אם יש response - זה אומר שהשגיאה הגיעה מהשרת
    if (error.response) {
      // שגיאה מהשרת, יש response
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      // שגיאה שלא הגיעה מהשרת (לדוג' בעיות רשת)
      console.error("Error: ", error.message);
    }
    
    // מחזירים את השגיאה כדי שלא תפסיק את הביצוע של המערכת
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`);
    return result.data;
  },

  addTask: async (name) => {
    if (!name) {
      console.error("Task name is required!");
      return;
    }
    console.log('addTask', name);
    const result = await axios.post(`/items`, { name });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    if (!id) {
      console.error("Task ID is required!");
      return;
    }

    console.log('setCompleted called with:', { id, isComplete });

    const result = await axios.put(`/items/${id}`, { 
      isComplete 
    });

    return result.data;
  },

  deleteTask: async (id) => {
    if (!id) {
      console.error("Task ID is required for deletion!");
      return;
    }
    console.log('deleteTask', id);
    const result = await axios.delete(`/items/${id}`);
    return result.data;
  }
};
