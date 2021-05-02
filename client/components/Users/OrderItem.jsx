import React, { Component } from "react";

// React Router Imports
import { Link } from "react-router-dom";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yyyy: date.getFullYear().toString(),
        };

        return format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]);
    }

    render() {
        const { id, createdAt, products, updatedAt } = this.props;
        const date = new Date(Date.parse(createdAt.substring(0, 10)));
        const formattedDate = this.formatDate(date, "mm/dd/yyyy");

        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return (
            <div className="order-block">
                <div className="order-info">
                    <div id="order-date" className="order-detail">
                        <p className="detail-title">ORDER PLACED</p>
                        <p>{formattedDate}</p>
                    </div>
                    <div id="order-total" className="order-detail">
                        <p className="detail-title">TOTAL</p>
                        <p>{"$placeholder"}</p>
                    </div>
                </div>
                <div className="order-product-container">
                    {products.map((product) => (
                        <div className="order-product" key={product.id}>
                            <div className="order-product-center">
                                <Link to={`/product/${id}`}>
                                    <img
                                        className="order-img"
                                        src={`${product.imgUrl}`}
                                        alt={`Product ${product.id}`}
                                    />
                                </Link>
                            </div>
                            <div className="order-product-item">
                                <p className="order-item-quantity">
                                    Qty: {product.productsOrders.quantity}
                                </p>
                            </div>
                            <div className="order-product-item">
                                <p className="order-item-quantity">
                                    Price: {formatter.format(product.price)}
                                </p>
                            </div>
                            <div className="order-product-item">
                                <a
                                    href={`/#/product/${product.id}`}
                                    className="order-item-link"
                                >
                                    {product.name}
                                </a>
                                <p className="order-item-artist">
                                    {product.artist
                                        ? product.artist
                                        : "Unknown/Not Found"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default OrderItem;
