export async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');

    if (response.status === 200) {
        return response.json();
    }
}

export async function addProduct(data) {
    const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (response.status === 200) {
        return response.json();
    }
}