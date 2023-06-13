import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";

export default () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse: CredentialResponse) => {
        credentialResponse.credential
          ? console.log(jwtDecode(credentialResponse.credential))
          : console.log("no credentials");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};
