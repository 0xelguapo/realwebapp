import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnectionHistory,
  fetchOneClient,
  handleAddTask,
  selectClientById,
} from "../../../redux/clients-slice";
import { FiExternalLink } from "react-icons/fi";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { phoneFormatRegex } from "../../../utility/phoneFormat";
import { TbArrowAutofitRight } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask } from "../../../redux/tasks-slice";
import CardContainer from "./SideModalCard";


const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
  <button
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-auto py-1 px-2 text-left font-medium focus:ring-blue-500 focus:border-blue-500"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));
CustomDatePicker.displayName = "CustomDatePicker";

export default function SideModal({
  previewIsOpen,
  setPreviewIsOpen,
  previewId,
}) {
  const dispatch = useDispatch();
  const selectedClient = useSelector((state) =>
    selectClientById(state, previewId)
  );
  const clientEmails = selectedClient?.email?.split(",");
  const clientPhones = selectedClient?.phone?.split(",");
  const clientProperties = selectedClient?.properties?.items;
  const clientConnections = selectedClient?.connectionHistory?.items
    ?.slice(0)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const clientReminders = selectedClient?.reminder?.items;
  const clientTasks = selectedClient?.tasks?.items;

  const [activityRadio, setActivityRadio] = useState(0);
  const [date, setDate] = useState(new Date());
  const [addTaskDate, setTaskDate] = useState(false);
  const [connectionTitle, setConnectionTitle] = useState("");
  const [connectionContent, setConnectionContent] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");

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
                    className="text-gray-600 border-b py-2 first-of-type:border-b-0"
                  >
                    <p className="font-medium">{prop.street}</p>
                    <p>
                      {prop.city}, {prop.state} {prop.zip}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-light text-gray-300">
                  No properties set up...
                </p>
              )}
            </CardContainer.Card>
          </CardContainer>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-wider">
              CONTACT INFORMATION
            </h2>
            {clientEmails
              ? clientEmails.map((email, index) => (
                  <p key={index} className="text-gray-600 py-1 font-normal">
                    {email}
                  </p>
                ))
              : "Nothing here"}
            <div className="border-b my-1 border-neutral-200" />
            {clientPhones
              ? clientPhones.map((phone, index) => (
                  <p key={index} className="text-gray-600 py-1 font-normal">
                    {phoneFormatRegex(phone)}
                  </p>
                ))
              : "Nothing here"}
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
              {/* <div className="flex justify-center items-center">
                <input
                  type="radio"
                  className="w-3"
                  checked={activityRadio === 1}
                  onChange={() => setActivityRadio(1)}
                />
                <span className="ml-1 mr-4 font-medium text-sm">Reminder</span>
              </div> */}

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
                  dateFormat="MM/dd/yyyy h:mm"
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
                  dateFormat="MM/dd/yyyy h:mm aa"
                  minDate={new Date()}
                />
                <button className="mt-3 w-fit inline bg-ctablue text-white text-left px-3 py-1 rounded font-semibold hover:bg-hoverctablue">
                  Create Reminder
                </button>
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
                  dateFormat="MM/dd/yyyy h:mm aa"
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
