const APIFetch = async (endpoint) => {
    const response = await fetch(`https://proseifyy.onrender.com/api/${endpoint}`);
    const data = await response.json();
    return data;
}

export default APIFetch
