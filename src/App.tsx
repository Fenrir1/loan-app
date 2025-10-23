import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./context/AppContext";
import PersonalDataForm from "./components/forms/PersonalDataForm";
import AddressWorkForm from "./components/forms/AddressWorkForm";
import LoanParametersForm from "./components/forms/LoanParametersForm";
import ResultPage from "./components/ResultPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PersonalDataForm />} />
              <Route path="/address-work" element={<AddressWorkForm />} />
              <Route path="/loan-parameters" element={<LoanParametersForm />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
