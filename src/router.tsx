import { createBrowserRouter } from "react-router";

import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RoutePlaceholderPage } from "./pages/RoutePlaceholderPage";

export const router = createBrowserRouter([
  {
    Component: AppShell,
    children: [
      { index: true, Component: LandingPage },
      {
        path: "login",
        Component: () => <RoutePlaceholderPage title="Masuk demo" />,
      },
      {
        path: "destinations",
        Component: () => <RoutePlaceholderPage title="Galeri destinasi" />,
      },
      {
        path: "destinations/:slug",
        Component: () => <RoutePlaceholderPage title="Detail destinasi" />,
      },
      {
        path: "booking/:slug",
        Component: () => <RoutePlaceholderPage title="Pemesanan demo" />,
      },
      {
        path: "checkout",
        Component: () => <RoutePlaceholderPage title="Checkout simulasi" />,
      },
      {
        path: "payment/success",
        Component: () => <RoutePlaceholderPage title="Status pembayaran demo" />,
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
