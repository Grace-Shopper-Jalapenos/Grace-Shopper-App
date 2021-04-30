import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';

const ReviewsPerProduct = ({reviews}) => {
    return(
        
        <div>
          <h2>Reviews:</h2>
          <ul>
            {reviews.length ? reviews.map((currReview, revIdx) => {
                  return (
                    <div key={revIdx}>
                      <div>
                        <h4>{currReview.detail}</h4>
                        <h3>Written By: {currReview.user.username}</h3>
                      </div>
                    </div>
                  );
                })
              : "Currently No Reviews"}
          </ul>
        </div>
    )
}

const mapStateToProps = (state,otherProps) => {
    return{
        state,
        otherProps,
        reviews: state.reviews.filter(review => review.productId === otherProps.singleProductId)
    }
}

export default connect(mapStateToProps, null)(ReviewsPerProduct);