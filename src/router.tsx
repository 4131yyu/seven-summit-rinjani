import { createBrowserRouter } from "react-router";

import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RoutePlaceholderPage } from "./pages/RoutePlaceholderPage";
import { SignupPage } from "./pages/SignupPage";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";
import { BookingPage } from "./pages/BookingPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";

export const router = createBrowserRouter([
  {
    Component: AppShell,
    children: [
      { index: true, Component: LandingPage },
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
        Component: BookingPage,
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
