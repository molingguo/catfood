import { useNavigate, useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

export { withParams, withNavigation }