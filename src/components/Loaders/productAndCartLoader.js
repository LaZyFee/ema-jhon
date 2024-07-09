import { getStoredCart } from "../../utilities/fakedb";

export const productAndCartLoader = async () => {

    //get products 
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();

    //get cart
    const savedCart = getStoredCart();
    const initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            addedProduct.quantity = savedCart[id];
            initialCart.push(addedProduct);
        }
    }

    return { products: products, initialCart: initialCart };
}