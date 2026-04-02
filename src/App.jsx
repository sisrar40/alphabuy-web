import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertProvider } from "./context/AlertContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Landing from "./pages/Landing";
import Entertainment from "./pages/Entertainment";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import ThemeParkBooking from "./pages/ThemeParkBooking";
import CartPage from "./pages/CartPage";
import BookingDetails from "./pages/BookingDetails";
import WalletPage from "./pages/WalletPage";
import UserProfile from "./features/auth/UserProfile";
import OrderHistory from "./features/bookings/OrderHistory";


// Admin Features
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLogin from "./features/auth/LoginPage";
import Dashboard from "./features/dashboard/Dashboard";
import ParksList from "./features/parks/ParksList";
import AddPark from "./features/parks/AddPark";
import MealsList from "./features/meals/MealsList";
import AddMeal from "./features/meals/AddMeal";
import MealDetails from "./features/meals/MealDetails";
import AddAvailableDates from "./features/availability/AddAvailability";
import ManageCoupons from "./features/coupons/CouponManager";
import BookingList from "./features/bookings/BookingList";
import LeadList from "./features/leads/LeadList";
import AdminWalletManager from "./features/wallet/AdminWalletManager";
import UserList from "./features/users/UserList";
import TicketTypesList from "./features/tickets/TicketTypesList";
import AddTicketType from "./features/tickets/AddTicketType";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <Router>
          <Routes>
            {/* Public Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/detail/:id" element={<Details />} />
              <Route path="/booking" element={<ThemeParkBooking />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/booking-details" element={<BookingDetails />} />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute redirectPath="/admin/login">
                    <WalletPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Route>

            {/* Unprotected Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/parks" element={<ParksList />} />
              <Route path="/admin/parks/add" element={<AddPark />} />
              <Route path="/admin/parks/edit/:id" element={<AddPark />} />

              <Route path="/admin/meals" element={<MealsList />} />
              <Route path="/admin/meals/add" element={<AddMeal />} />
              <Route path="/admin/meals/edit/:id" element={<AddMeal />} />
              <Route path="/admin/meals/:id" element={<MealDetails />} />

              <Route path="/admin/dates" element={<AddAvailableDates />} />
              <Route path="/admin/coupons" element={<ManageCoupons />} />

              <Route path="/admin/bookings" element={<BookingList />} />

              <Route path="/admin/leads" element={<LeadList />} />
              <Route path="/admin/wallets" element={<AdminWalletManager />} />
              <Route path="/admin/users" element={<UserList />} />
              
              <Route path="/admin/tickets" element={<TicketTypesList />} />
              <Route path="/admin/tickets/add" element={<AddTicketType />} />
              <Route path="/admin/tickets/edit/:id" element={<AddTicketType />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
