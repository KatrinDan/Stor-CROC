import "./Home.css";

function Home () { 
    return (
        <main className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to CROC</h1>
                    <p>Discover great products,find your favorites
                        and enjoy shopping with us</p>
                        <a href="/products" className="hero-button">
                        Show now
                        </a>
                </div>
            </section>
            <section className="home-section">
                <h2>Why choose us?</h2>
                <div className="features">
                    <div className="feature-card">
                        <h3>Great products</h3>
                        <p>We offer useful and interesting products for everyone</p>
                    </div>
                    <div className="feature-card">
                        <h3>Favorites</h3>
                        <p>Save products you like and easily find themlater</p>
                    </div>
                    <div className="feature-card">
                        <h3>Easy shopping</h3>
                        <p>Add products to your cart
                        and manage your purchases</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Home;