import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useCallback, useEffect, useState } from "react";

interface Forecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const WeatherForecast = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [forecasts, setForecasts] = useState<Forecast[]>();

  const populateWeatherData = useCallback(async () => {
    const request = {
      scopes: [import.meta.env.VITE_API_SCOPE],
      account: accounts[0],
    };

    try {
      const response = await instance.acquireTokenSilent(request);

      if (response.accessToken) {
        const res = await fetch("weatherforecast", {
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        });

        console.log("Response status:", res.status); // Log the response status
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server response:", errorText);
        }
        if (res.ok) {
          const data = await res.json();
          console.log("Response data:", data); // Log the response data
          setForecasts(data);
        } else {
          console.error("Failed to fetch weather data");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [instance, accounts]);

  useEffect(() => {
    if (isAuthenticated) {
      populateWeatherData();
    }
  }, [isAuthenticated, populateWeatherData]);

  const contents =
    forecasts === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{" "}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{" "}
          for more details.
        </em>
      </p>
    ) : (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr style={{ color: "black" }}>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody style={{ color: "black" }}>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <h1 id="tabelLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
};

export default WeatherForecast;
