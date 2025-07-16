import React, { useState, useEffect, useRef } from 'react';
import "./index.css"

const CartList = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carts] = useState([
        {
            id: 1,
            title: 'Carrello Casa',
            items: [
                { name: 'Smart TV 55"', price: 899 },
                { name: 'Soundbar', price: 299 },
                { name: 'Lampadine Smart', price: 79 },
                { name: 'Router WiFi', price: 159 },
                { name: 'Cavi HDMI', price: 25 }
            ]
        },
        {
            id: 2,
            title: 'Carrello Ufficio',
            items: [
                { name: 'Monitor 4K', price: 459 },
                { name: 'Tastiera Meccanica', price: 129 },
                { name: 'Mouse Wireless', price: 79 }
            ]
        },
        {
            id: 3,
            title: 'Carrello Gaming',
            items: [
                { name: 'Console PS5', price: 499 },
                { name: 'Controller Extra', price: 69 },
                { name: 'Gioco FIFA 24', price: 59 },
                { name: 'Cuffie Gaming', price: 199 }
            ]
        },
        {
            id: 4,
            title: 'Carrello Sport',
            items: [
                { name: 'Smartwatch', price: 399 },
                { name: 'Auricolari Bluetooth', price: 159 }
            ]
        },
        {
            id: 5,
            title: 'Carrello Sport 2',
            items: [
                { name: 'Smartwatch', price: 399 },
                { name: 'Auricolari Bluetooth', price: 159 }
            ]
        },
        {
            id: 6,
            title: 'Carrello Sport 3',
            items: [
                { name: 'Smartwatch', price: 399 },
                { name: 'Auricolari Bluetooth', price: 159 }
            ]
        }
    ]);

    const cartListRef = useRef(null);
    const cartItemsRef = useRef([]);

    // Calcola il totale di un carrello
    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    // Aggiorna il focus e gestisce lo scroll
    const updateFocus = (newIndex) => {
        if (newIndex >= 0 && newIndex < carts.length) {
            setCurrentIndex(newIndex);

            // Scroll automatico per mantenere l'elemento visibile
            const currentItem = cartItemsRef.current[newIndex];
            const container = cartListRef.current;

            if (currentItem && container) {
                const containerRect = container.getBoundingClientRect();
                const itemRect = currentItem.getBoundingClientRect();

                if (itemRect.left < containerRect.left) {
                    container.scrollLeft -= (containerRect.left - itemRect.left) + 20;
                } else if (itemRect.right > containerRect.right) {
                    container.scrollLeft += (itemRect.right - containerRect.right) + 20;
                }
            }
        }
    };

    // Gestione degli eventi tastiera
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    updateFocus(currentIndex - 1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    updateFocus(currentIndex + 1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    console.log('Carrello selezionato:', carts[currentIndex].title);
                    // Qui potresti chiamare una funzione per aprire il carrello
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, carts]);

    // Componente per un singolo elemento del carrello
    const CartItem = ({ item }) => (
        <div className="item">
            <div className="item-name">{item.name}</div>
            <div className="item-price">€{item.price}</div>
        </div>
    );

    // Componente per un singolo carrello
    const Cart = ({ cart, index, isFocused, onClick }) => {
        const total = calculateTotal(cart.items);

        return (
            <div
                ref={el => cartItemsRef.current[index] = el}
                className={`cart-item ${isFocused ? 'focused' : ''}`}
                onClick={() => onClick(index)}
                tabIndex={0}
            >
                <div className="cart-header">
                    <h3 className="cart-title">{cart.title}</h3>
                    <div className="cart-count">
                        {cart.items.length}
                    </div>
                </div>

                <div className="cart-items">
                    {cart.items.map((item, itemIndex) => (
                        <CartItem key={itemIndex} item={item} />
                    ))}
                </div>

                <div className="cart-total">
                    <div className="total-label">Totale:</div>
                    <div className="total-amount">€{total}</div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1>I Tuoi Carrelli</h1>

            <div
                ref={cartListRef}
                className="cart-list"
            >
                {carts.map((cart, index) => (
                    <Cart
                        key={cart.id}
                        cart={cart}
                        index={index}
                        isFocused={index === currentIndex}
                        onClick={updateFocus}
                    />
                ))}
            </div>

            <div className="nav-instructions">
                Usa le frecce ← → per navigare tra i carrelli
            </div>
        </div>
    );
};

export default CartList;