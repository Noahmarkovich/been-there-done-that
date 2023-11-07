import React from "react";
import { Routes, Route } from "react-router";

import { AppHeader } from "./components/app-header";
import { ProfilePage } from "./pages/profile-page";
import { AddCountry } from "./pages/add-country";
import { CountryPage } from "./pages/country-page";

export function RootCmp() {
  return (
    <div>
      <AppHeader />
      <main>
        <Routes>
          <Route path="/profile/:profileId" element={<ProfilePage />}>
            <Route
              path="/profile/:profileId/add-country"
              element={<AddCountry />}
            />
          </Route>
          <Route
            path="/profile/:profileId/:countryId"
            element={<CountryPage />}
          />
        </Routes>
      </main>
    </div>
  );
}
