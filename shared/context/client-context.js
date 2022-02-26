import {
  useState,
  createContext,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

const ClientsContext = createContext();

function ClientContextProvider({ children }) {
  const [clientsArray, setClientsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  const getAllClients = useCallback(async () => {
    setIsLoading(true);
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listClients));
    } catch (err) {
      console.log("error getting clients", err);
    }
    if (response) {
      setClientsArray(response.data.listClients.items);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  const onSuccess = () => {
    setSuccessStatus(true);
    setTimeout(() => {
      setSuccessStatus(false);
    }, 4000);
  };

  const addClient = async (formState, clientDetails) => {
    let response;
    let newClientsArray = [];
    if (!formState.inputs.name.value) {
      alert("Required name field is empty, please enter a value");
    } else {
      try {
        response = await API.graphql(
          graphqlOperation(mutations.createClient, { input: clientDetails })
        );
      } catch (err) {
        console.log("error creating client", err);
      }
    }
    if (response) {
      newClientsArray = [response.data.createClient, ...clientsArray];
      setClientsArray(newClientsArray);
      onSuccess();
      return response;
    }
    console.log(response);
  };

  const updateClient = async (clientDetails) => {
    let response;
    let newClientsArray = [];
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, { input: clientDetails })
      );
    } catch (err) {
      console.log("error updating", err);
    }
    if (response) {
      newClientsArray = [response.data.updateClient, ...clientsArray];
      // setClientsArray(newClientsArray);
      onSuccess();
      return response;
    }
    console.log(response);
  };

  const deleteClient = async (clientDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.deleteClient, { input: clientDetails })
      );
    } catch (err) {
      console.log("error deleting", err);
    }
    if (response) {
      onSuccess();
      return response;
    }
    console.log(response);
  };

  return (
    <ClientsContext.Provider
      value={{
        clientsArray,
        isLoading,
        successStatus,
        getAllClients,
        addClient,
        updateClient,
        deleteClient
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

function useClients() {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error("useClients must be used within ClientContextProvider");
  }
  return context;
}

export { useClients, ClientContextProvider };
