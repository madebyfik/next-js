import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center content-center border">
            <ul className="font-mono text-3xl font-bold text-center mt-5">
                <li className="mb-5"><a href="/edt">Emploi du temps 📖</a></li>
                <li className="mb-5"><a href="#">Menu Crous 🍽</a></li>
            </ul>
        </div>
    );
}
