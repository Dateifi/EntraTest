import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Container } from "react-bootstrap";
import WeatherForecast from "./WeatherForecast";

const MainContent = () => {
  /**
   * useMsal is a hook that returns the PublicClientApplication instance.
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
   */
  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <Container>
            <WeatherForecast />
          </Container>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see the weather forecast information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default MainContent;
