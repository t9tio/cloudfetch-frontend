// TODO
// unsbscribe
import React, { Component }from 'React';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import userStore from '../../stores/userStore';
import uiStore from '../../stores/uiStore';
import { plans } from '../../config';

const planProduct = {
    copper: 549517,
    silver: 549518,
    gold: 549519,
}

@observer
class Pricing extends Component {
    // TODO: based on user's state
    @observable hoverPlan = -1;
    @observable coupon = 'prelaunch-coupon';

    updateHoverPlan(i) {
        this.hoverPlan = i;
    }

    updateCoupon(coupon) {
        this.coupon = coupon;
    }

    getValidPlan() {
        const me = userStore.me;
        let validPlan = 'free';
        if (me.nextBillDate && new Date(me.nextBillDate) > new Date()) {
            validPlan = me.plan;
        } 
        return validPlan;
    }

    // TODO: if user has valid plan: tell him to unsubscribe first
    clickChooseBtn({ plan }) {
        
        if (!userStore.me.email) {
            this.activeSignupModal();
            return;
        }

        const validPlan = this.getValidPlan();

        if (validPlan === 'free') {
            window.Paddle.Checkout.open({
                product: planProduct[plan],
                email: userStore.me.email,
                passthrough: userStore.me.id,
                coupon: this.coupon,
                success: '/thankyou',
            }, () => {
            })
        } else {
            alert('To choose new plan, you should unsubscribe current plan first')
        }

    }

    activeSignupModal() {
        uiStore.isSignupModalActive = true;
        uiStore.signupModalHeading = 'Please sign up first';
        uiStore.signupModalRedirect = '/pricing';
    }

    render() {
        const validPlan = this.getValidPlan()

        return (
            <div className="section">
                <div className="container">
                    <h1 className="title">Pricing</h1>
                    <div className="control has-icons-left" style={{maxWidth: '200px'}}>
                        <input className="input" type="email" placeholder="Coupon" onChange={(e)=>this.updateCoupon(e.target.value)} value={this.coupon}/>
                        <span className="icon is-small is-left has-text-success">
                            <i className="fas fa-money-bill-wave"></i>
                        </span>
                    </div>
                    <br/>
                    <div className="pricing-table">
                        <div
                            className={`pricing-plan ${this.hoverPlan === 0 ? 'is-active' : ''}`}
                            style={{border:"2px solid whitesmoke"}}
                        >
                            <div className="plan-header">Free</div>
                            <div className="plan-price">
                                <span className="plan-price-amount" style={{color: 'black'}}>
                                    <span className="plan-price-currency">$</span>
                                    {plans.free.price * (this.coupon === 'prelaunch-coupon' ? 0.65 : 1)}
                                </span>
                                /month
                            </div>
                            <div className="plan-items">
                                <div className="plan-item">View any content</div>
                                <div className="plan-item">Subscribe {plans.free.starLimit} fetchers</div>
                                <div className="plan-item">Create {plans.free.fetcherLimit} fetcher</div>
                                <div className="plan-item">-</div>
                            </div>
                            <div className="plan-footer">
                                <button className="button is-fullwidth" disabled="disabled">
                                    {
                                        validPlan === 'free' ?
                                            'Current plan'
                                            :
                                            'Choose'
                                    }
                                </button>
                            </div>
                        </div>

                        <div 
                            className={`pricing-plan ${this.hoverPlan === 1 || validPlan === 'copper' ? 'is-active' : ''}`}
                            style={{border:"2px solid #b8733390"}}
                            onMouseEnter={() => this.updateHoverPlan(1)}
                            onMouseLeave={() => this.updateHoverPlan(-1)}
                        >
                            <div className="plan-header">Copper</div>
                            <div className="plan-price">
                                <span className="plan-price-amount" style={{color: 'black'}}>
                                    <span className="plan-price-currency">$</span>
                                    {(plans.copper.price * (this.coupon === 'prelaunch-coupon' ? 0.65 : 1)).toFixed(2)}
                                </span>
                            /month
                            </div>
                            <div className="plan-items">
                                <div className="plan-item">View any content</div>
                                <div className="plan-item">Subscribe {plans.copper.starLimit} fetchers</div>
                                <div className="plan-item">Create {plans.copper.fetcherLimit} fetchers</div>
                                <div className="plan-item">-</div>
                            </div>
                            <div className="plan-footer">
                                {
                                    validPlan === 'copper' ? 
                                        <a 
                                            className="button is-fullwidth"
                                            style={{backgroundColor:'#b8733390'}}
                                        >Current plan</a>
                                        :
                                        <a 
                                            className="button is-fullwidth"
                                            style={{backgroundColor:'#b8733390'}}
                                            onClick = {() => this.clickChooseBtn({ plan:'copper' })}
                                        >Choose</a>
                                }
                            </div>
                        </div>

                        <div 
                            className={`pricing-plan ${this.hoverPlan === 2 || validPlan === 'silver'? 'is-active' : ''}`}
                            style={{border:"2px solid #c0c0c0"}}
                            onMouseEnter={() => this.updateHoverPlan(2)}
                            onMouseLeave={() => this.updateHoverPlan(-1)}
                        >
                            <div className="plan-header">Silver</div>
                            <div className="plan-price">
                                <span className="plan-price-amount" style={{color: 'black'}}>
                                    <span className="plan-price-currency">$</span>
                                    {(plans.silver.price * (this.coupon === 'prelaunch-coupon' ? 0.65 : 1)).toFixed(2)}
                                </span>
                            /month
                            </div>
                            <div className="plan-items">
                                <div className="plan-item">View any content</div>
                                <div className="plan-item">Subscribe {plans.silver.starLimit} fetchers</div>
                                <div className="plan-item">Create {plans.silver.fetcherLimit} fetchers</div>
                                <div className="plan-item">-</div>
                            </div>
                            <div className="plan-footer">
                                {
                                    validPlan === 'silver' ? 
                                        <a 
                                            className="button is-fullwidth"
                                            style={{backgroundColor:'#c0c0c0'}}
                                        >Current plan</a>
                                        :
                                        <a 
                                            className="button is-fullwidth"
                                            style={{backgroundColor:'#c0c0c0'}}
                                            onClick = {() => this.clickChooseBtn({ plan: 'silver' })}
                                        >Choose</a>
                                }
                            </div>
                        </div>
          
                        <div 
                            className={`pricing-plan ${this.hoverPlan === 3 || validPlan === 'gold' ? 'is-active' : ''}`}
                            style={{border:"2px solid #ffd700"}}
                            onMouseEnter={() => this.updateHoverPlan(3)}
                            onMouseLeave={() => this.updateHoverPlan(-1)}
                        >
                            <div className="plan-header">Gold</div>
                            <div className="plan-price">
                                <span className="plan-price-amount" style={{color: 'black'}}>
                                    <span className="plan-price-currency">$</span>
                                    {(plans.gold.price * (this.coupon === 'prelaunch-coupon' ? 0.65 : 1)).toFixed(2)}
                                </span>
                            /month
                            </div>
                            <div className="plan-items">
                                <div className="plan-item">View any content</div>
                                <div className="plan-item">Subscribe {plans.gold.starLimit} fetchers</div>
                                <div className="plan-item">Create {plans.gold.fetcherLimit} fetcher</div>
                                <div className="plan-item">-</div>
                            </div>
                            <div className="plan-footer">
                                {
                                    validPlan === 'gold' ? 
                                        <a 
                                            className="button is-fullwidth"
                                            style={{backgroundColor:'#ffd700'}}
                                        >Current plan</a>
                                        :
                                        <a 
                                            className="button is-fullwidth"
                                            style={{backgroundColor:'#ffd700'}}
                                            onClick = {() => this.clickChooseBtn({ plan: 'gold' })}
                                        >Choose</a>
                                }
                            </div>
                        </div>
                    </div>
          
                </div>
            </div>
        )
    }
}

module.exports = Pricing;
