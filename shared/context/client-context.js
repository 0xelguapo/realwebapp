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
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage("Successfully added client");
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
      setSuccessMessage("Successfully updated client");
      onSuccess();
      return response;
    }
    console.log(response);
  };

  const deleteClients = async (selectedFlatRows) => {
    let response;
    const promises = selectedFlatRows.map((i) => {
      return API.graphql(
        graphqlOperation(mutations.deleteClient, {
          input: { id: i.original.id },
        })
      );
    });
    try {
      response = await Promise.all(promises);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    if (response) {
      setSuccessMessage("Successfully deleted client(s)");
      onSuccess();
      const newArray = clientsArray.filter(
        (item) =>
          !response.some(
            (removedItem) => removedItem.data.deleteClient.id === item.id
          )
      );
      setClientsArray(newArray);
      return response;
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        clientsArray,
        isLoading,
        successStatus,
        successMessage,
        getAllClients,
        addClient,
        updateClient,
        deleteClients,
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
