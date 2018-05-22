import React from "react";

export default function Footer () {
    return (<footer className="footer">
        <div className="container">
            <hr/>
            <div style={{ float:'left'}}>
                Build with <i className="far fa-heart"></i>  by  <a> Tim Qian</a>
            </div>
            <div style={{ float: 'right'}}>
                <a className="button is-white"><i className="fab fa-slack"></i></a>
                <a className="button is-white"><i className="fab fa-weixin"></i></a>
                <a className="button is-white"><i className="fas fa-envelope"></i></a>
            </div>
        </div>
    </footer>)
}
