import React from "react";

export default function Home() {
    return (
        <div>
            <section className="hero is-medium is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">CloudFetch</h1>
                        <h2 className="subtitle">
              Fetch data for you from any website, with any time interval.
                        </h2>
                        <p className="content">
                            {/* Site uptime monit.

      Information collection. */}
                        </p>
                    </div>
                </div>
            </section>
            <section className="hero is-light is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Subscribe and Star</h1>
                        <div align="center">
                            <img width="248" alt="star_and_subscribe" src="https://user-images.githubusercontent.com/5512552/40571841-911e27c0-60d2-11e8-8285-5dd23ff09412.png"/>
                        </div>
                        <h2 className="subtitle">
                            <strong>Subscribed</strong> to get email notification when there&#39;s new contents in a project.<br/><br/>
                            <strong>Star</strong> to bookmark a prject when you are interested but don&#39;t want to get notification email.
                        </h2>
                        <h2 className="subtitle">
                        </h2>
                    </div>
                </div>
            </section>
            <section className="hero is-light">
                <div className="hero-body">
                    <div className="container" >
                        <h1 className="title">Create Fetcher by simple clicks</h1>
                        <h3 className="is-size-5 has-text-weight-semibold">Step 1: Create Project</h3>
                        <div align="center">
                            <img width="269" alt="1_create_project" src="https://user-images.githubusercontent.com/5512552/40571805-fdf11f84-60d1-11e8-86bd-09c5c0c24984.jpeg"/>
                        </div>
                        <br/>
                        <h3 className="is-size-5 has-text-weight-semibold">Step 2: Create Fetchers inside Project</h3>
                        <div align="center">
                            <img width="363" alt="2_create_fetcher" src="https://user-images.githubusercontent.com/5512552/40571806-00d94f1e-60d2-11e8-8914-c50c102df88a.jpeg"/>
                        </div>
                        <br/>
                        <h3 className="is-size-5 has-text-weight-semibold">Step 3: Input url and fetch page content</h3>
                        <div align="center">
                            <img width="800" alt="3_input_url_fetch_content" src="https://user-images.githubusercontent.com/5512552/40571603-5de9f3f6-60ce-11e8-8549-e362ea87cf58.png"/>
                        </div>
                        <br/>
                        <h3 className="is-size-5 has-text-weight-semibold">Step 4: Click parts of the page you interested</h3>
                        <div align="center">
                            <img width="800" alt="4_choose_your_parts" src="https://user-images.githubusercontent.com/5512552/40571545-19d47c0a-60cd-11e8-88b5-e91bb4512ba6.png"/>
                        </div>
                        <br/>
                        <h3 className="is-size-5 has-text-weight-semibold">Step 5: Define how often fetcher will do a fetch</h3>
                        <div align="center">
                            <img width="335" alt="5_define_info" src="https://user-images.githubusercontent.com/5512552/40572011-06ce6424-60d5-11e8-9a52-5b99acdc2bfb.png"/>
                        </div>
                        <br/>
                        <h3 className="is-size-5 has-text-weight-semibold">Step 6: Start the loop</h3>
                        <div align="center">
                            <img width="339" alt="6_start_loop_fetch" src="https://user-images.githubusercontent.com/5512552/40571814-1c8121ec-60d2-11e8-86f4-d0b931da1322.jpeg"/>
                        </div>
                        <br/>
                        <h3 className="is-size-5 has-text-weight-semibold">You made a daily top link fetcher for Hackernews! 🎉🎉</h3>
                    </div>
                </div>
            </section>
        </div>
    );
}
