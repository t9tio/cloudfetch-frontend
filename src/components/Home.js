import React from 'react';
import Explore from './Explore';

export default function Home () {
    return (
        <div>
            <section className="hero is-medium is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Craper 
                        </h1>
                        <h2 className="subtitle">
                            Morden data collector/monitor
                        </h2>
                        <p className="content">
                            {/* Site uptime monit.

      Information collection. */}
                        </p>
                    </div>
                </div>
            </section>

            <Explore/>
        </div>
    );
}