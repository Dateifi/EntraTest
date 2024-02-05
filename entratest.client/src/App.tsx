import "./App.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import PageLayout from "./components/PageLayout";
import MainContent from "./components/MainContent";

interface Props {
  instance: PublicClientApplication;
}

const App = ({ instance }: Props) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <MainContent />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;
