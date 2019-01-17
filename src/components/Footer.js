import React from "react";

function Footer () {
    return <footer className="footer" style={{backgroundColor: 'white'}}>
        <div className="container">
            <hr style={{backgroundColor: '#dbdbdb', height:'1px'}}/>
            <div style={{ float:'left'}}>
            Build with <i className="far fa-heart"></i>  by  <a href="https://twitter.com/tim_qian"> Tim Qian</a>
            </div>
            <div style={{ float: 'right'}}>
                <a className="icon button is-white" href="https://join.slack.com/t/cloudfetch/shared_invite/enQtNTA5NzIyNTU2Mzc1LTIwNzZiODZkNzFiODY0NTM4OWViYjgxN2JkNGY0NzJiYWQzNTcwYzM3NjMwMmE2N2RkMzE0ZGRlYWJkYTY3Yzg"><i className="fab fa-slack"></i></a>
                <a className="icon button is-white" href="https://user-images.githubusercontent.com/5512552/40399903-53d1ebde-5e72-11e8-98d8-615fc40c09f1.jpeg"><i className="fab fa-weixin"></i></a>
                <a className="icon button is-white" href="mailto:timqian92@qq.com"><i className="fas fa-envelope"></i></a>
            </div>
        </div>
    </footer>
}
export default Footer;