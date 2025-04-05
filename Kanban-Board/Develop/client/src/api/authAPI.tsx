export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    // First check if we got any response at all
    if (!response) {
      throw new Error('No response from server');
    }

    // Handle non-JSON responses
    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error('Failed to parse JSON:', responseText);
      throw new Error('Invalid server response');
    }

    if (!response.ok) {
      throw new Error(responseData.error || 'Login failed');
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};