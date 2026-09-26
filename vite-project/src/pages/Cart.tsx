import { products } from "./Products";
import { ShoppingCart,Trash2,ArrowLeft,CreditCard,Footprints,CheckCircle } from "lucide-react";
import "./Cart.css";
import { useState } from "react";

function Cart() {
  const cartIds: number[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const uniqueCartIds = [...new Set(cartIds)];
  const [showCheckout, setShowCheckout] = useState(false);

  const cartProducts = uniqueCartIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  const getQuantity = (id: number) => cartIds.filter((cartId) => cartId === id).length;

  const total = cartProducts.reduce((sum,product) => sum+product.price*getQuantity(product.id), 0 );

  const decreaseQuantity = (id: number) => {
    const currentCart = [...cartIds];
    const indexToRemove = currentCart.indexOf(id);

    if (indexToRemove !== -1) {
      currentCart.splice(indexToRemove, 1);
      localStorage.setItem("cart", JSON.stringify(currentCart));
      window.location.reload();
    }
  };

  const increaseQuantity = (id: number) => {
    const newCart = [...cartIds, id];
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };

  const removeFromCart = (id: number) => {
    const newCart = cartIds.filter((cartId) => cartId !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };
  const handleCheckoutClick = () => {
   if(cartProducts.length === 0){
    alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
    return;
   }
    setShowCheckout(true);
   }
  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
         <div className="cart-header-content">
          <div className="cart-title-row">
            <span className="cart-title-icon"><ShoppingCart/></span>
            <h1>ShoppingCart</h1></div>
            <p className="cart-subtitle">Review your items and proceed to checkout when you are ready</p></div>
            <div className="cart-items-badge">
              <span className="cart-badge-icon"><ShoppingCart/></span>
              <span className="cart-items-count">{cartIds.length}</span>
              <span>items in your cart</span>
            </div>
        </div>
       <Footprints size={35}/>
          {cartProducts.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet</p>
            <a href="/products" className="continue-shopping">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-products">
              {cartProducts.map((product) => (
                <article className="cart-card" key={product.id}>
                  <div className="cart-product-image">{product.emoji}</div>
                  <div className="cart-product-info">
                    <h2>{product.name}</h2>
                    <p className="cart-product-price">${product.price.toFixed(2)}</p>
                    <span className="cart-product-status"><CheckCircle size={15}/> In stock</span>
                    <div className="cart-actions">
                      <div className="quantity-control">
                        <button className="quantity-control-button" onClick={() => decreaseQuantity(product.id)}>
                          -</button>
                        <span className="quantity">{getQuantity(product.id)}</span>
                        <button className="quantity-control-button" onClick={() => increaseQuantity(product.id)}>
                          +</button>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
              <span> ${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              <div className="summary-line"></div>
              <div className="summary-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button className="checkout-button"
                onClick={handleCheckoutClick}>
                <CreditCard size={20}/>
                Proceed to Checkout 
              </button>
              {showCheckout &&(
              <div className="credit-form">
                <h3>Credit Card<CreditCard/></h3>
                <input type="text" placeholder="Card holder name"/>
                <input type="text" placeholder="Card number"/>
                <div className="card-details">
                  <input type="text" placeholder="MM/YY"/>
                  <input type="text" placeholder="CWW"/>
                </div>
                <button className="pay-button">
                  Pay $ {total.toFixed(2)}
                </button>
              </div>
              )}
              <a href="/products" className="continue-link">
                <ArrowLeft /> Continue Shopping
              </a>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;