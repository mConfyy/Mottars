import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, PlusCircle } from 'lucide-react';
import { Button } from './ui';
import { AppRoute } from '../types';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isSellerArea = location.pathname.startsWith('/seller');
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate(AppRoute.HOME);
    setIsMobileMenuOpen(false);
  };

  const NavLink: React.FC<{ to: string, children: React.ReactNode, primary?: boolean }> = ({ to, children, primary = false }) => (
    <Link 
      to={to} 
      onClick={() => setIsMobileMenuOpen(false)}
      className={`text-sm font-medium transition-colors ${primary ? 'text-accent' : 'text-neutral-600 hover:text-primary'}`}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to={AppRoute.HOME} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-accent transition-colors">M</div>
            <span className="text-xl font-bold tracking-tight text-primary">Mottars</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to={AppRoute.HOME}>Buy Car</NavLink>
            <NavLink to={AppRoute.HOME}>Rent Car</NavLink>
            <NavLink to={isAuthenticated ? AppRoute.SELLER_DASHBOARD : AppRoute.LOGIN}>Sell Car</NavLink>
            
            <div className="h-4 w-px bg-neutral-200 mx-2" />
            
            {isAuthenticated ? (
               <div className="flex items-center gap-4">
                 <Link to={AppRoute.SELLER_DASHBOARD} className="text-sm font-medium text-neutral-600 hover:text-primary">Dashboard</Link>
                 <Button variant="ghost" size="sm" onClick={handleLogout} icon={LogOut}>Sign Out</Button>
               </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to={AppRoute.LOGIN} className="text-sm font-medium text-neutral-600 hover:text-primary">Log in</Link>
                <Link to={AppRoute.LOGIN}>
                    <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-neutral-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <NavLink to={AppRoute.HOME}>Buy Car</NavLink>
            <NavLink to={AppRoute.HOME}>Rent Car</NavLink>
            <NavLink to={AppRoute.SELLER_DASHBOARD}>Sell Car</NavLink>
            <hr className="border-neutral-100" />
            {isAuthenticated ? (
                <>
                  <NavLink to={AppRoute.SELLER_DASHBOARD}>Dashboard</NavLink>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout} icon={LogOut}>Sign Out</Button>
                </>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                   <Link to={AppRoute.LOGIN} onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full">Log in</Button></Link>
                   <Link to={AppRoute.LOGIN} onClick={() => setIsMobileMenuOpen(false)}><Button className="w-full">Get Started</Button></Link>
                </div>
            )}
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-xl">M</div>
              <span className="text-xl font-bold">Mottars</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Nigeria's most trusted automotive marketplace. Buy, sell, and rent with confidence.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Marketplace</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-accent transition-colors">Buy a Car</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sell a Car</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Rent a Car</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Car Inspections</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Safety Tips</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Fraud Protection</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>© 2024 Mottars Marketplace. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             {/* Social Icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};