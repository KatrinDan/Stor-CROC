import { useState } from "react";
import { Heart } from "lucide-react";
import "./Product.css";

type Product = {
    id: number;
    name: string;
    price: number;
    emoji: string;
};

export const products: Product[] = [
    {id:1, name: "Wireless Headphones", price: 59.99, emoji: "🎧",},
    {id:2, name:"Smart Watch", price:89.99,emoji:"⌚",},
    {id: 3, name: "Wireless Speaker", price: 49.99, emoji: "🔊",},
    {id: 4, name: "Backpack", price: 39.99, emoji: "🎒",},
    {id: 5, name: "Sunglasses", price: 99.99, emoji: "🕶️",},
    {id: 6, name: "Smartphone", price: 799.99, emoji: "📱",},
];

function Products() {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    const toggleFavorite = (productId: number) => {
        let updatedFavorites: number[];

        if (favorites.includes(productId)) {
            updatedFavorites = favorites.filter((id) => id !== productId);
        } else {
            updatedFavorites = [...favorites, productId];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    const [cart, setCart] = useState<number[]>(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (productId: number) => {
        const product = products.find((item) => item.id === productId);

        if (!product) {
            return;
        }

        const savedCart = localStorage.getItem("cart");
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        cartItems.push(product.id);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        setCart(cartItems);
        alert(`${product.name} added to cart`);
    };

    return (
        <main className="product-page">
            <h1>Products</h1>
            <p className="products-subtitle">
                Choose your favorite products
            </p>
            <div className="products-grid">
                {products.map((product) => (
                    <article
                     className="product-card"
                     key={product.id}>
                        <div className="product-image">
                            {product.emoji}
                        </div>
                        <h2>{product.name}</h2>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <button
                            className={`favorite-button ${favorites.includes(product.id) ? "active" : ""}`}
                            onClick={() => toggleFavorite(product.id)}
                        >
                            <Heart fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                        </button>
                        <button  className="add-to-cart"
                        onClick={() => addToCart(product.id)}>
                            Add to Cart
                        </button>
                    </article>
                ))}
            </div>
            <p className="cart-info">
                items in cart:<strong>{cart.length}</strong>
            </p>
        </main>
    );
}

export default Products;