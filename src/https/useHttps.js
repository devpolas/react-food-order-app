import { useCallback, useEffect, useState } from "react";

async function requestHttps(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Check Your internet connection");
  }
  return resData;
}

export default function useHttps(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  function clearData() {
    setData(initialValue);
  }

  const sendRequest = useCallback(
    async function sendRequest(orderData) {
      setIsLoading(true);
      try {
        const resData = await requestHttps(url, { ...config, body: orderData });
        setData(resData);
        setIsLoading(false);
      } catch (error) {
        setIsError({ message: error.message || "something going is wrong!" });
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config.method || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    isError,
    sendRequest,
    clearData,
  };
}
