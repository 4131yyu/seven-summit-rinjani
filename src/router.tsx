import { createBrowserRouter } from "react-router";

import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { HomePage } from "./pages/HomePage";
import { ExplorePage } from "./pages/ExplorePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RoutePlaceholderPage } from "./pages/RoutePlaceholderPage";
import { SignupPage } from "./pages/SignupPage";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ContactPage } from "./pages/ContactPage";
import { BookingWizardPage } from "./pages/BookingWizardPage";
import { BookingHistoryPage } from "./pages/BookingHistoryPage";

export const router = createBrowserRouter([
  {
    Component: AppShell,
    children: [
      { index: true, Component: LandingPage },
      { path: "home", Component: HomePage },
      { path: "explore", Component: ExplorePage },
      { path: "about-us", Component: AboutUsPage },
      { path: "contact", Component: ContactPage },
      { path: "booking-history", Component: BookingHistoryPage },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "signup",
        Component: SignupPage,
      },
      {
        path: "destinations",
        Component: () => <RoutePlaceholderPage title="Galeri destinasi" />,
      },
      {
        path: "destinations/:slug",
        Component: DestinationDetailPage,
      },
      {
        path: "booking/:slug",
        Component: BookingWizardPage,
      },
      {
        path: "checkout",
        Component: CheckoutPage,
      },
      {
        path: "payment/success",
        Component: PaymentSuccessPage,
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
