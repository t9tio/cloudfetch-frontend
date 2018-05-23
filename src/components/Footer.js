import React from "react";

export default function Footer () {
    return (<footer className="footer">
        <div className="container">
            <hr/>
            <div style={{ float:'left'}}>
                Build with <i className="far fa-heart"></i>  by  <a href="https://github.com/timqian"> Tim Qian</a>
            </div>
            <div style={{ float: 'right'}}>
                <a className="button is-white" href="https://join.slack.com/t/cloudfetch/shared_invite/enQtMzY4NDE0MTA0ODgzLTFkY2I4MDgzOGMyYzA1YTM2MmRkMjlmZDRlM2YyMzlhOTE0MDgzMzdiNDg0MzMxMmYwMTRlODg4ZmQxYzU3Yzk"><i className="fab fa-slack"></i></a>
                <a className="button is-white" href="https://user-images.githubusercontent.com/5512552/40399903-53d1ebde-5e72-11e8-98d8-615fc40c09f1.jpeg"><i className="fab fa-weixin"></i></a>
                <a className="button is-white" href="mailto:timqian92@qq.com"><i className="fas fa-envelope"></i></a>
            </div>
        </div>
    </footer>)
}
