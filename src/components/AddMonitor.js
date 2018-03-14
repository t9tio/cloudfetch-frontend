import React from "react";

export default function AddMonitor() {
    return (
        <section className="section">
            <div className="container">
                <progress className="progress is-small" value="15" max="100" />

                <label className="label">Step 1: enter monitor url</label>
                <div className="field is-grouped">
                    <p className="control is-expanded">
                        <input className="input" type="text" placeholder="Url" />
                    </p>
                    <p className="control">
                        <a className="button is-info">Scrap</a>
                    </p>
                </div>

                <div>
                    <div className="field">
                        <label className="label">Step 2: select content to monit</label>
                    </div>
                    {/* <iframe src="" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" width="100%" height="800"></iframe> */}


                </div>

                <div>
                    <div className="field">
                        <label className="label">Step 3: process content</label>
                    </div>
                </div>

                <div>
                    <div className="field">
                        <label className="label">Step 4: choose the monit way</label>
                    </div>
                </div>
            </div>
        </section>
    );
}
