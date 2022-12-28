import { useEffect, useRef } from "react";
import { ethers } from "ethers";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}

const useProviderRef = () => {
  const providerRef = useRef<Web3Provider | undefined>();

  useEffect(() => {
    if (!providerRef.current) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      providerRef.current = provider;
    }
  }, []);
};
