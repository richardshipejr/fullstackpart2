const SuccessBanner = ({ show, text }) => {
  if (show) {
    return <h1>Success! {text}</h1>;
  } else {
    return null;
  }
};

export default SuccessBanner;
