const APIFetch = async (endpoint) => {
    const response = await fetch(`http://localhost:3999/api/${endpoint}`);
    const data = await response.json();
    return data;
}

export default APIFetch