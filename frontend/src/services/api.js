import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function sendMessage(message, conversationHistory = []) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat/message`, {
      message,
      conversationHistory
    })
    return response.data
  } catch (error) {
    console.error('API error:', error)
    throw error
  }
}

export async function searchProducts(query, category = null) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/search`, {
      params: { query, category }
    })
    return response.data
  } catch (error) {
    console.error('Product search error:', error)
    throw error
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Product fetch error:', error)
    throw error
  }
}

export async function checkCompatibility(productId, applianceModel) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/products/compatibility`, {
      productId,
      applianceModel
    })
    return response.data
  } catch (error) {
    console.error('Compatibility check error:', error)
    throw error
  }
}

