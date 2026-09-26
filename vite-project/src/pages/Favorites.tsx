import { useEffect, useState } from "react";
import { Heart,ShoppingCart } from "lucide-react";
import "./Favorites.css";

type Product = {
  id: number;
  name: string;
  price: number;
  emoji: string;
};

const products: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 79.99, emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 129.99, emoji: "⌚" },
  { id: 3, name: "Wireless Speaker", price: 59.99, emoji: "🔊" },
  { id: 4, name: "BaCKPACK", price: 49.99, emoji: "🎒" },
  { id: 5, name: "Sunglasses", price: 39.99, emoji: "🕶️" },
  { id: 6, name: "Smartphone", price: 699.99, emoji: "📱" },
];

function Favourites() {
  const [favoriteids, setFavoriteids] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (!savedFavorites) {
      return [];
    }

    try {
      const parsedFavorites = JSON.parse(savedFavorites);
      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteids));
  }, [favoriteids]);

  const favoriteProducts = products.filter((product: Product) =>
    favoriteids.includes(product.id)
  );

  const removeFromFavorites = (productid: number) => {
  setFavoriteids((current) =>
    current.filter((id) => id !== productid)
    );
  };

  const addToCart = (productid: number) => {
    const savedCart = localStorage.getItem("cart");
    const cart: number[] = savedCart ? JSON.parse(savedCart) : [];

    if (!cart.includes(productid)) {
      cart.push(productid);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const product = products.find((item) => item.id === productid);

    if (product) {
      alert(`${product.name} added to cart`);
    }
  };

  return (
    <main className="favorites-page">
    <div className="favorites-header">
      <div>
        <p className="favorites-label">
          YOUR COLLECTION
        </p>
        <h1>
          <span><Heart size={20} /></span>Favorites
        </h1>
        <p className="favorites-subtitle">
          Products you love and want to keep close
        </p>
      </div>
      <div className="favorites-count">
        {favoriteProducts.length}
        <span>items</span>
      </div>
    </div>
    {favoriteProducts.length === 0 ? (
      <section className="favorites-empty">
        <div className="empty-icon"><Heart /></div>
        <h2>Your favourites are empty</h2>
        <p>Save products you like and
          they will appear here
        </p>
        <a href="/products" className="shop-button">
        Browse Products</a>
      </section>
    ) : (
      <section className="favorites-grid">
        {favoriteProducts.map((product: Product) => (
          <article className="favorite-card" key={product.id}>
            <div className="favorite-emoji">
              {product.emoji}
            </div>
            <button
              className="favorite-remove"
              onClick={() => removeFromFavorites(product.id)}
              aria-label={`Remove ${product.name} from favorites`}
            >
              <Heart />
            </button>
              <div className="favorite-emoji"></div>
            <div className="favorite-content">
              <h2>{product.name}</h2>
               <div className="favorite-bottom">
                 <strong>$ {product.price.toFixed(2)}</strong>
                 <button className="favorite-cart-button" onClick={() =>
                  addToCart (product.id)
                 }><ShoppingCart/>Add to Cart</button>
                 </div>
            </div>
          </article>
        ))}
      </section>
    )}
    </main>
  );
}

export default Favourites;