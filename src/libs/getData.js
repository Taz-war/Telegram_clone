export const fetchData = async (page) => {
    const url = `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data?.data?.data; // Adjust based on how you want to use the fetched data
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };