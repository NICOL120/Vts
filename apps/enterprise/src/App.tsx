import { NetworkGuard } from 'components/network-guard';
import { SnackbarContainer } from 'components/snackbar';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStyle } from 'lib/ui/GlobalStyle';
import { TransactionErrorProvider } from 'chain/components/TransactionErrorProvider';
import { PersonalizationProvider } from 'libs/personalization/PersonalizationProvider';
import { setupErrorMonitoring } from 'errors/errorMonitoring';
import { AppRoutes } from 'navigation/AppRoutes';
import { GlobalErrorBoundary } from 'errors/components/GlobalErrorBoundary';
import { TransactionsProvider } from 'chain/transactions';
import { ThemeProvider } from 'lib/ui/theme/ThemeProvider';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import React Router components

const queryClient = new QueryClient();

const AppProviders = () => {
  return (
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        <GlobalErrorBoundary>
          <main>
            <QueryClientProvider client={queryClient}>
              <NetworkGuard>
                <TransactionsProvider>
                  <TransactionErrorProvider>
                    <SnackbarProvider
                      autoHideDuration={null}
                      content={(key, message) => <SnackbarContainer id={key} message={message} />}
                    >
                      <PersonalizationProvider>
                        <Switch> {/* Gunakan komponen Switch untuk rute */}
                          <Route path="/" component={AppRoutes} />
                        </Switch>
                      </PersonalizationProvider>
                    </SnackbarProvider>
                  </TransactionErrorProvider>
                </TransactionsProvider>
              </NetworkGuard>
            </QueryClientProvider>
          </main>
        </GlobalErrorBoundary>
      </ThemeProvider>
    </Router> 
  );
};

setupErrorMonitoring();

const App = () => {
  return <AppProviders />;
};

export default App;
