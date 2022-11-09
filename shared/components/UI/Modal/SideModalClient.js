import Script from "next/script";
import { useEffect, useState, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnectionHistory,
  fetchOneClient,
  handleAddClientToGroup,
  handleAddTask,
  handleRemoveClientFromGroup,
  selectClientById,
} from "../../../redux/clients-slice";
import { addTask } from "../../../redux/tasks-slice";
import { CustomDatePicker } from "../DatePicker/CustomDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import CardContainer from "./SideModalCard";
import { phoneFormatRegex } from "../../../utility/phoneFormat";
import { TbArrowAutofitRight } from "react-icons/tb";
import { FiExternalLink, FiPlus, FiMail, FiPhone } from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import ComboBox from "./ComboBox";
import {
  addClientToGroup,
  addGroup,
  fetchGroups,
  removeClientFromGroup,
  selectAllGroups,
} from "../../../redux/groups-slice";
import useGoogleAuth from "../../../hooks/google-hook";
import {
  useGoogleLogin,
  hasGrantedAllScopesGoogle,
  useGoogleOneTapLogin,
  GoogleLogin,
} from "@react-oauth/google";
import { AuthContext } from "../../../context/auth-context";

export default function SideModal({
  previewIsOpen,
  setPreviewIsOpen,
  previewId,
}) {
  const dispatch = useDispatch();
  const selectedClient = useSelector((state) =>
    selectClientById(state, previewId)
  );
  const groups = useSelector(selectAllGroups);
  const groupStatus = useSelector((state) => state.groups.status);

  const clientEmails =
    selectedClient.email?.length > 0 && selectedClient?.email?.split(",");
  const clientPhones =
    selectedClient.phone?.length > 0 && selectedClient?.phone?.split(",");
  const clientProperties = selectedClient?.properties?.items;
  const clientConnections = selectedClient?.connectionHistory?.items
    ?.slice(0)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const clientReminders = selectedClient?.reminder?.items;
  const clientTasks = selectedClient?.tasks?.items;
  const clientGroups = selectedClient.group.items;

  const [activityRadio, setActivityRadio] = useState(0);
  const [date, setDate] = useState(new Date());
  const [connectionTitle, setConnectionTitle] = useState("");
  const [connectionContent, setConnectionContent] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [groupBoxVisible, setGroupBoxVisible] = useState(false);
  const [updatedGroups, setUpdatedGroups] = useState([]);

  const [googleSubmit] = useGoogleAuth();
  const { googleAuthToken, setGoogleAuthToken } = useContext(AuthContext);

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      if (codeResponse.access_token) {
        setGoogleAuthToken(codeResponse.access_token);
        const tokenObject = {
          access: codeResponse.access_token,
          exp: Date.now() + 1000 * 60 * 50,
        };
        localStorage.setItem("google", JSON.stringify(tokenObject));
      } else setGoogleAuthToken(codeResponse.code);
    },
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/calendar",
    auto_select: true,
  });

  useEffect(() => {
    console.log("running");
    const googleObject = JSON.parse(localStorage.getItem("google"));
    if (googleObject && googleObject.exp > Date.now()) {
      setGoogleAuthToken(googleObject.access);
    } else {
      localStorage.removeItem("google");
    }
  }, [setGoogleAuthToken]);

  const createEvent = async () => {
    let timeZone;

    function setTimeZone(input) {
      timeZone = input;
    }

    const googleObject = JSON.parse(localStorage.getItem("google"));
    if (!googleObject || googleObject.exp < Date.now()) {
      loginGoogle();
    } else {
      console.log(new Date(date.getTime()).toISOString());
      console.log(new Date(date.getTime() + 60 * 60000).toISOString());
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://www.googleapis.com/calendar/v3/calendars/primary"
      );
      xhr.setRequestHeader("Authorization", `Bearer ${googleAuthToken}`);
      xhr.onreadystatechange = () => {
        if (xhr.response) {
          setTimeZone(JSON.parse(xhr.response).timeZone);
        }
      };
      xhr.send(null);

      const event = {
        summary: `Contact ${
          selectedClient.firstName + " " + selectedClient?.lastName
        }`,
        start: {
          dateTime: new Date(date.getTime()).toISOString(),
          timeZone: timeZone
        },
        end: {
          dateTime: new Date(date.getTime() + 60 * 60000).toISOString(),
          timeZone: timeZone
        },
        reminders: {
          useDefault: true
        }
      };
      xhr.open(
        "POST",
        "https://www.googleapis.com/calendar/v3/calendars/primary/events"
      );
      xhr.setRequestHeader("Authorization", `Bearer ${googleAuthToken}`);
      xhr.onreadystatechange = () => console.log(xhr.response);
      xhr.send(JSON.stringify(event));
    }
  };

  const updateClientGroups = (allGroups, clientsGroups) => {
    let allGroupsCopy = [...allGroups];
    for (let i = 0; i < allGroupsCopy.length; i++) {
      const allGroupsId = allGroupsCopy[i].id;
      for (let j = 0; j < clientsGroups.length; j++) {
        if (allGroupsId === clientsGroups[j].clientGroupID) {
          allGroupsCopy[i] = {
            ...allGroupsCopy[i],
            inGroup: true,
            clientGroupID: clientsGroups[j].id,
          };
          break;
        } else if (allGroupsId !== clientsGroups[j].clientGroupID) {
          allGroupsCopy[i] = {
            ...allGroupsCopy[i],
            inGroup: false,
            clientGroupID: null,
          };
        }
      }
    }
    return allGroupsCopy;
  };

  const handleCreateGroup = useCallback(
    async (title) => {
      let response = await dispatch(addGroup(title)).unwrap();
      setGroupBoxVisible(false);
      return response;
    },
    [dispatch]
  );

  const handleSubmitConnectionHistory = async (e) => {
    e.preventDefault();
    let connectionDetails = {
      title: connectionTitle,
      content: connectionContent,
      date: date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      clientId: previewId,
    };
    let response = await dispatch(
      addConnectionHistory(connectionDetails)
    ).unwrap();
    if (response) {
      setConnectionTitle("");
      setConnectionContent("");
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    let taskDetails = {
      title: taskTitle,
      content: taskContent,
      date: date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      clientId: previewId,
    };
    let response = await dispatch(addTask(taskDetails)).unwrap();
    dispatch(handleAddTask(response));
  };

  const handleGroupBox = (e) => {
    setGroupBoxVisible(!groupBoxVisible);
  };

  const handleAddToGroup = async (clientGroupID) => {
    let response = await dispatch(
      addClientToGroup({ clientId: previewId, clientGroupID: clientGroupID })
    ).unwrap();
    if (response)
      dispatch(
        handleAddClientToGroup({
          clientId: response.client.id,
          clientGroupID: response.clientGroupID,
          id: response.id,
        })
      );
    setGroupBoxVisible(false);
  };

  const handleRemoveFromGroup = async (clientGroupID) => {
    let response = await dispatch(
      removeClientFromGroup(clientGroupID)
    ).unwrap();
    if (response) {
      dispatch(
        handleRemoveClientFromGroup({
          clientId: response.client.id,
          clientGroupID: response.clientGroupID,
          id: response.id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchOneClient(previewId));
  }, [dispatch, previewId]);

  useEffect(() => {
    const detectEscKey = (e) => {
      if (e.key === "Escape") {
        setPreviewIsOpen(false);
      }
    };
    document.addEventListener("keydown", detectEscKey);
    return () => {
      document.removeEventListener("keydown", detectEscKey);
    };
  }, [setPreviewIsOpen]);

  useEffect(() => {
    const handleFetchGroups = () => {
      dispatch(fetchGroups());
    };
    if (groupStatus !== "succeeded") {
      handleFetchGroups();
    }
  }, [groupBoxVisible, dispatch, groupStatus]);

  useEffect(() => {
    if (groupStatus === "succeeded" && clientGroups) {
      let finalArray = updateClientGroups(groups, clientGroups);
      setUpdatedGroups(finalArray);
    }
  }, [groups, clientGroups, groupStatus, handleCreateGroup]);

  return (
    <>
      {/* <div className="fixed flex flex-col h-screen right-0 w-1/4 bg-slate-100 z-[4] shadow-2xl overflow-auto"> */}
      <button
        className="absolute -left-8 px-2 py-2 bg-slate-50 w-fit rounded hover:bg-slate-100"
        onClick={() => setPreviewIsOpen(false)}
      >
        <TbArrowAutofitRight size={20} color="#6c6c6c" />
      </button>
      <div className="overflow-auto pb-[8rem]">
        <CardContainer>
          <CardContainer.Card>
            <div className="border-b pb-2">
              <h2 className="font-bold text-2xl text-gray-700 mb-0">
                {selectedClient.firstName + " " + selectedClient?.lastName}
              </h2>
              <h4 className="font-semibold text-gray-500">
                {selectedClient.company}
              </h4>
            </div>
            <div className="mt-3 pb-4">
              <p className="text-xs font-medium text-gray-400 tracking-wider">
                NOTES
              </p>
              {selectedClient.notes ? (
                <p className="text-gray-600">{selectedClient.notes}</p>
              ) : (
                <p className="font-light text-gray-300 text-sm mt-1">
                  Add a note...
                </p>
              )}
            </div>

            <div className="border-t py-2">
              <p className="text-xs font-medium text-gray-400 tracking-wider">
                GROUPS
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {clientGroups?.length > 0 ? (
                  updatedGroups.map((group, index) => {
                    if (group.inGroup) {
                      return (
                        <div
                          key={group.id}
                          className="bg-[#e8eef4] mr-2 px-2 rounded text-sm font-medium group flex justify-between"
                        >
                          {group.title}
                          <button
                            className="ml-3 opacity-0 text-sm group-hover:opacity-100 hover:text-gray-500"
                            onClick={() =>
                              handleRemoveFromGroup(group.clientGroupID)
                            }
                          >
                            X
                          </button>
                        </div>
                      );
                    }
                  })
                ) : (
                  <p className="font-light text-gray-300 text-sm mt-1">
                    No groups set up...
                  </p>
                )}
              </div>

              <button
                className="flex items-center font-medium text-sm text-ctablue mt-3"
                onClick={handleGroupBox}
              >
                <FiPlus /> Add to Group
              </button>
              {groupBoxVisible && (
                <ComboBox
                  data={updatedGroups}
                  setGroupBoxVisible={setGroupBoxVisible}
                  inputPlaceholderText="Search by Group Name"
                  handleSubmit={handleAddToGroup}
                  handleCreateGroup={handleCreateGroup}
                />
              )}
            </div>
            <div className="border-t pt-2">
              <button className="flex items-center font-medium text-gray-600">
                View Full Profile <FiExternalLink className="ml-2" />
              </button>
            </div>
          </CardContainer.Card>

          <CardContainer>
            <CardContainer.Card>
              <h2 className="font-bold text-xs text-gray-400 tracking-wider">
                ASSOCIATED PROPERTIES
              </h2>
              {clientProperties?.length > 0 ? (
                clientProperties.map((prop, index) => (
                  <div
                    key={prop.id}
                    className="text-gray-600 border-b py-2 first-of-type:border-b-0 flex items-center"
                  >
                    <div className="mr-1 bg-[#f7f9fb] px-1 py-1 rounded-full border">
                      <BiBuildingHouse />
                    </div>
                    <div>
                      <p className="font-medium">{prop.street}</p>
                      <p>
                        {prop.city}, {prop.state} {prop.zip}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-light text-gray-300 text-sm">
                  No properties set up...
                </p>
              )}
            </CardContainer.Card>
          </CardContainer>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-wider">
              CONTACT INFORMATION
            </h2>
            {clientEmails.length > 0 ? (
              clientEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-500 py-1"
                >
                  <div className="mr-1 bg-[#f7f9fb] px-1 py-1 rounded-full border">
                    <FiMail size={12} />
                  </div>
                  {email}
                </div>
              ))
            ) : (
              <p className="font-light text-gray-300 text-sm mt-1">
                No emails...
              </p>
            )}
            <div className="border-b my-1 border-neutral-200" />
            {clientPhones ? (
              clientPhones.map((phone, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-500 py-1"
                >
                  <div className="mr-1 bg-[#f7f9fb] px-1 py-1 rounded-full border">
                    <FiPhone size={12} />
                  </div>
                  {phoneFormatRegex(phone)}
                </div>
              ))
            ) : (
              <p className="font-light text-gray-300 text-sm mt-1">
                No phone numbers...
              </p>
            )}
          </CardContainer.Card>
        </CardContainer>

        <div className="bg-white w-full py-1 text-center mt-5 border-y border-neutral-200">
          <h3 className="font-semibold">Activities</h3>
        </div>

        <CardContainer>
          <CardContainer.Card>
            <div className="flex items-center">
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  className="w-3"
                  checked={activityRadio === 0}
                  onChange={() => setActivityRadio(0)}
                />
                <span className="ml-1 mr-4 font-medium text-sm">
                  Connection Log
                </span>
              </div>

              {/* Reminder is removed until further ado */}
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  className="w-3"
                  checked={activityRadio === 1}
                  onChange={() => setActivityRadio(1)}
                />
                <span className="ml-1 mr-4 font-medium text-sm">Reminder</span>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  className="w-3"
                  checked={activityRadio === 2}
                  onChange={() => setActivityRadio(2)}
                />
                <span className="ml-1 mr-4 font-medium text-sm">Task</span>
              </div>
            </div>

            {activityRadio === 0 && (
              <div className="flex flex-col mt-3">
                <input
                  type="text"
                  onChange={(e) => setConnectionTitle(e.target.value)}
                  value={connectionTitle}
                  placeholder="Left Voicemail, Reached, Spoke About..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-1 pl-2 mb-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  type="text"
                  placeholder="Optional Description"
                  onChange={(e) => setConnectionContent(e.target.value)}
                  value={connectionContent}
                  className="justify-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-1 pl-2 mb-2 h-14 focus:ring-blue-500 focus:border-blue-500"
                />
                <DatePicker
                  selected={date}
                  onChange={setDate}
                  showTimeSelect={true}
                  customInput={<CustomDatePicker />}
                  dateFormat="MM/dd/yyyy hh:mm aa"
                />
                <button
                  className="mt-3 w-fit inline bg-ctablue text-white text-left px-3 py-1 rounded font-semibold hover:bg-hoverctablue"
                  onClick={handleSubmitConnectionHistory}
                >
                  Log History
                </button>
              </div>
            )}

            {activityRadio === 1 && (
              <div className="flex flex-col mt-3">
                {/* <Script src="https://accounts.google.com/gsi/client" async defer/>
                <div
                  id="g_id_onload"
                  data-client_id="722122786669-rkc7u3no792gnf3emamhqrhdicgte146.apps.googleusercontent.com"
                  data-context="signin"
                  data-ux_mode="popup"
                  data-nonce=""
                  data-auto_select="true"
                  data-itp_support="true"
                ></div>
                <div
                  className="g_id_signin"
                  data-type="standard"
                  data-shape="rectangular"
                  data-text="signin_with"
                  data-size="large"
                  data-logo_alignment="left"
                ></div> */}
                {!googleAuthToken ? (
                  // <GoogleLogin auto_select />
                  <button
                    onClick={() => loginGoogle()}
                    className="bg-ctablue text-white font-medium rounded w-full hover:bg-hoverctablue self-center"
                  >
                    Link Google Calendar
                  </button>
                ) : (
                  <>
                    <h3 className="mt-0 mb-1 text-gray-500 ml-.5">
                      Remind me to contact{" "}
                      <span className="font-bold">
                        {selectedClient.firstName +
                          " " +
                          selectedClient?.lastName +
                          " "}
                      </span>
                      on...
                    </h3>
                    <DatePicker
                      selected={date}
                      onChange={setDate}
                      showTimeSelect={true}
                      customInput={<CustomDatePicker />}
                      dateFormat="MM/dd/yyyy hh:mm aa"
                      minDate={new Date()}
                    />
                    <button
                      className="mt-3 w-fit inline bg-ctablue text-white text-left px-3 py-1 rounded font-semibold hover:bg-hoverctablue"
                      onClick={createEvent}
                    >
                      Create Reminder
                    </button>
                  </>
                )}
              </div>
            )}

            {activityRadio === 2 && (
              <div className="flex flex-col mt-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-1 pl-2 mb-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setTaskTitle(e.target.value)}
                  value={taskTitle}
                />
                <textarea
                  type="text"
                  placeholder="Description"
                  className="justify-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-1 pl-2 mb-2 h-16 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setTaskContent(e.target.value)}
                  value={taskContent}
                />
                <DatePicker
                  selected={date}
                  onChange={setDate}
                  showTimeSelect={true}
                  customInput={<CustomDatePicker />}
                  dateFormat="MM/dd/yyyy hh:mm aa"
                  minDate={new Date()}
                />
                <button
                  className="mt-3 w-fit inline bg-ctablue text-white text-left px-3 py-1 rounded font-semibold hover:bg-hoverctablue"
                  onClick={handleSubmitTask}
                >
                  Create Task
                </button>
              </div>
            )}
          </CardContainer.Card>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-wider">
              CONNECTION HISTORY
            </h2>
            {clientConnections?.length > 0 ? (
              clientConnections.map((c, index) => (
                <div key={c.id} className="flex flex-col py-1">
                  <h5 className="font-medium text-gray-900">{c.title}</h5>
                  <p className="font-light text-sm">{c?.content}</p>
                  <p className="font-light text-sm">{c.date}</p>
                </div>
              ))
            ) : (
              <p className="font-light text-sm text-gray-400">
                No history yet...
              </p>
            )}
          </CardContainer.Card>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-wider">
              REMINDERS
            </h2>
            {clientReminders?.length > 0 ? (
              clientReminders.map((r, index) => (
                <div key={r.id} className="flex flex-col py-1">
                  <h5 className="font-medium text-gray-900">Reminder</h5>
                  <p className="text-xs font-light">
                    {formatDistanceToNowStrict(parseISO(r.date), {
                      addSuffix: true,
                      unit: "day",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-light text-sm text-gray-400">
                No reminders yet...
              </p>
            )}
          </CardContainer.Card>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-widerr">
              TASKS
            </h2>
            {clientTasks?.length ? (
              clientTasks.map((task, index) => (
                <div key={task.id} className="flex flex-col py-1">
                  <h5 className="font-medium text-gray-900">{task.title}</h5>
                  <p className="text-sm font-light">{task.content}</p>
                </div>
              ))
            ) : (
              <p className="font-light text-sm text-gray-400">
                No tasks yet...
              </p>
            )}
          </CardContainer.Card>
        </CardContainer>
        {/* </div> */}
      </div>
    </>
  );
}
