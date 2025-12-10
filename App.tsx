import React from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Home } from './pages/Home';
import { CarDetails } from './pages/CarDetails';
import { SellerDashboard } from './pages/SellerDashboard';
import { CreateListing } from './pages/CreateListing';
import { Auth } from './pages/Auth';
import { AppRoute } from './types';

// Wrapper to handle scroll on route change
const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => new URL(window.location.href), [window.location.href]);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Mocking scroll restoration manually since HashRouter might differ slightly in behavior depending on environment */}
      <Routes>
        <Route path={AppRoute.HOME} element={<Home />} />
        <Route path={AppRoute.CAR_DETAILS} element={<CarDetails />} />
        <Route path={AppRoute.LOGIN} element={<Auth />} />
        <Route path={AppRoute.SELLER_DASHBOARD} element={<SellerDashboard />} />
        <Route path={AppRoute.CREATE_LISTING} element={<CreateListing />} />
      </Routes>
    </Router>
  );
};

export default App;