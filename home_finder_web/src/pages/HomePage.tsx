import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
    <main className="max-w-screen">
        <div className="bg-cover h-screen" style={{backgroundImage:"url('home-banner.jpg')"}}>
            <div className="bg-primary/30 h-full w-full flex flex-col items-center justify-between text-gray-50">
                <div></div>
                <section className="text-center font-sans">
                    <h1 className="text-8xl mb-7">Home Finder</h1>
                    <h2 className="text-3xl">Home of Your Homes</h2>
                </section>
                <div className="mb-6">
                    <Link to={"/listing"} className="border-4 rounded-full text-2xl px-12 py-2 font-semibold hover:bg-secondary hover:text-primary">Browse</Link>
                </div>
            </div>
        </div>
        <section className="md:h-screen bg-secondary flex flex-col items-center gap-6 md:flex-row justify-evenly py-8 text-primary">
            <article className="w-5/6 md:w-1/5 border-primary rounded border-y-4 bg-slate-50 h-4/6 p-4 text-center md:self-start hover:shadow-2xl">
                <img src="fast.png" alt="person running with time" />
                <p className="font-semibold">fast</p>
                <p className="font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, dolorum.</p>
            </article>
            <article className="w-5/6 md:w-1/5 border-primary rounded border-y-4 bg-slate-50 h-4/6 p-4 text-center md:self-center hover:shadow-2xl">
                <img src="simple.png" alt="person relaxing" />
                <p className="font-semibold">easy</p>
                <p className="font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, dolorum.</p>
            </article>
            <article className="w-5/6 md:w-1/5 border-primary rounded border-y-4 bg-slate-50 h-4/6 p-4 text-center md:self-end hover:shadow-2xl">
                <img src="coins.png" alt="coins" />
                <p className="font-semibold">free</p>
                <p className="font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, dolorum.</p>
            </article>
        </section>
        <section className="flex flex-col justify-center text-center items-center min-h-80 md:h-96 text-primary py-4">
            <h2 className="font-semibold text-2xl mb-4 text-primary">Looking for a House</h2>
            <p className="w-4/5 md:w-8/12 font-sans font-light text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sit sequi odio autem nemo error deleniti asperiores harum voluptas explicabo provident perferendis maxime rerum esse accusamus quibusdam laborum hic sapiente, velit, id dolorum aut! Itaque quidem error, illum dolores quasi laborum nihil. Totam cum deleniti eius mollitia possimus repellendus ratione.</p>
        </section>
    </main>
    );
}
 
export default HomePage;

