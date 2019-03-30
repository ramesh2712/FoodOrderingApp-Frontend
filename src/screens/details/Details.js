
import React, { Component } from 'react';
import './Details.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';

const styles = {};

class Details extends Component {

    constructor() {
        super();
        this.state = {
            restaurantDetail: {},
            locality: ""
        }
    }

    componentWillMount = () => {
        this.callApiToGetResturantDetail()
    }
    callApiToGetResturantDetail = () => {
        let restaurant_id = this.props.match.params.id;
        console.log(this.props.location.categories);
        let xhrPosts = new XMLHttpRequest();
        let that = this

        xhrPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let data = JSON.parse(this.responseText);
                that.setState({
                    restaurantDetail: data
                });
                that.setState({
                    locality:data.address.locality
                })
                console.log(that.state.restaurantDetail);
                console.log(that.state.restaurantDetail.customer_rating);
                console.log(that.state.restaurantDetail.average_price);
                console.log(that.state.restaurantDetail.address.locality);
            }
        });

        xhrPosts.open("GET", this.props.baseUrl + "/restaurant/" + restaurant_id);
        xhrPosts.send();
    }

    render() {
        return (
            <div>
                <Header
                    history={this.props.history}
                    showSearchArea={false} />
                <div className="restaurant-main-container">
                    <div className="restaurant-details-container">
                        <div className="image-container">
                            <img
                                className="restaurant-image"
                                src={this.state.restaurantDetail.photo_URL}
                                alt=""
                            />
                        </div>
                        <div className="information-container">
                            <div className="restaurant-name-container">
                                <div className="restaurant-name">
                                    {this.state.restaurantDetail.restaurant_name}
                                </div>
                            </div>
                            <div className="restaurant-locality-container">
                                <div className="restaurant-locality">
                                    {this.state.locality}
                                </div>
                            </div>

                            <div className="restaurant-categories-container">
                                <div className="restaurant-categories">
                                    {this.props.location.categories}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Details.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);