import NavigationBar from "./NavigationBar";

interface Props {
  children: React.ReactNode;
}

export const PageLayout = (props: Props) => {
  return (
    <div>
      <NavigationBar />
      <br />
      <h5>
        <center>Welcome to the Entra ID Weatherforecast!</center>
      </h5>
      <br />
      {props.children}
      <br />
    </div>
  );
};

export default PageLayout;
