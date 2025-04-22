import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">
        <Link to="/">B-wiize</Link>
      </h1>
      <div className="space-x-4 hidden md:flex">
        <Link to="/challenges" className="hover:text-teal-400">Challenges</Link>
        <Link to="/education" className="hover:text-teal-400">Éducation</Link>
        <Link to="/rewards" className="hover:text-teal-400">Récompenses</Link>
        <Link to="/news" className="hover:text-teal-400">Actus</Link>
        <Link to="/community" className="hover:text-teal-400">Communauté</Link>
        <Link to="/settings" className="hover:text-teal-400">Paramètres</Link>
      </div>
      {/* Menu mobile minimal */}
      <div className="md:hidden">
        <span className="text-sm">≡</span>
      </div>
    </nav>
  );
}