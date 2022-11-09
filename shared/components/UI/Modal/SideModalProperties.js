import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneProperty,
  handleAddPropertyTask,
  handleAddPropertyToGroup,
  handleRemovePropertyFromGroup,
  selectPropertyById,
} from "../../../redux/properties-slice";
import {
  addPropertyGroup,
  addPropertyToGroup,
  fetchPropertyGroups,
  removePropertyFromGroup,
  selectAllPropertyGroups,
} from "../../../redux/propertyGroups-slice";
import { fetchOneClient, selectClientById } from "../../../redux/clients-slice";
import { addTask } from "../../../redux/tasks-slice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePicker } from "../DatePicker/CustomDatePicker";
import CardContainer from "./SideModalCard";
import ComboBox from "./ComboBox";
import { phoneFormatRegex } from "../../../utility/phoneFormat";
import { FiExternalLink, FiPlus, FiMail, FiPhone } from "react-icons/fi";
import { TbArrowAutofitRight } from "react-icons/tb";

export default function SideModalProperties({
  previewIsOpen,
  setPreviewIsOpen,
  previewId,
}) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [groupBoxVisible, setGroupBoxVisible] = useState(false);
  const [updatedGroups, setUpdatedGroups] = useState([]);

  const dispatch = useDispatch();
  const selectedProperty = useSelector((state) =>
    selectPropertyById(state, previewId)
  );
  const selectedOwner = useSelector((state) =>
    selectClientById(state, selectedProperty?.clientId)
  );
  const allPropertyGroups = useSelector(selectAllPropertyGroups);
  const allPropertyGroupsStatus = useSelector(
    (state) => state.propertyGroups.status
  );
  const groupsOfSelectedProperty = selectedProperty.group.items;

  const updatePropertyGroups = (allPropertyGroups, groupsOfProperty) => {
    let allPropertyGroupsCopy = [...allPropertyGroups];
    for (let i = 0; i < allPropertyGroupsCopy.length; i++) {
      const propertyGroupsId = allPropertyGroupsCopy[i].id;
      for (let j = 0; j < groupsOfProperty.length; j++) {
        if (propertyGroupsId === groupsOfProperty[j].propertyGroupID) {
          allPropertyGroupsCopy[i] = {
            ...allPropertyGroupsCopy[i],
            inGroup: true,
            groupsPropertyID: groupsOfProperty[j].id,
          };
          break;
        } else if (propertyGroupsId !== groupsOfProperty[j].propertyGroupID) {
          allPropertyGroups[i] = {
            ...allPropertyGroups[i],
            inGroup: false,
            groupsPropertyID: null,
          };
        }
      }
    }
    return allPropertyGroupsCopy;
  };

  const handleCreatePropertyGroup = useCallback(
    async (title) => {
      let response = await dispatch(addPropertyGroup(title)).unwrap();
      setGroupBoxVisible(false)
      return response;
    },
    [dispatch]
  );

  const handleAddToGroup = async (propertyGroupID) => {
    let response = await dispatch(
      addPropertyToGroup({
        propertyID: previewId,
        propertyGroupID: propertyGroupID,
      })
    ).unwrap();
    if (response) {
      dispatch(
        handleAddPropertyToGroup({
          propertyId: response.property.id,
          propertyGroupID: response.propertyGroupID,
          id: response.id,
        })
      );
    }
    setGroupBoxVisible(false)
  };

  const handleRemoveFromGroup = async (groupsPropertyID) => {
    let response = await dispatch(
      removePropertyFromGroup(groupsPropertyID)
    ).unwrap();
    if (response) {
      dispatch(
        handleRemovePropertyFromGroup({
          propertyId: response.property.id,
          propertyGroupID: response.propertyGroupID,
          id: response.id
        })
      );
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
      propertyId: previewId,
    };
    let response = await dispatch(addTask(taskDetails)).unwrap();
    if (response) {
      dispatch(handleAddPropertyTask(response));
      setTaskTitle("");
      setTaskContent("");
    }
  };

  const handleGroupBox = (e) => {
    setGroupBoxVisible(!groupBoxVisible);
  };

  useEffect(() => {
    dispatch(fetchOneProperty(previewId));
  }, [previewId, dispatch]);

  useEffect(() => {
    if (selectedProperty.clientId) {
      dispatch(fetchOneClient(selectedProperty.clientId));
    }
  }, [dispatch, selectedProperty.clientId]);

  useEffect(() => {
    const handleFetchPropertyGroups = () => {
      dispatch(fetchPropertyGroups());
    };
    if (allPropertyGroupsStatus !== "succeeded") {
      handleFetchPropertyGroups();
    }
  }, [allPropertyGroupsStatus, dispatch]);

  useEffect(() => {
    if (allPropertyGroupsStatus === "succeeded" && groupsOfSelectedProperty) {
      let finalArray = updatePropertyGroups(
        allPropertyGroups,
        groupsOfSelectedProperty
      );
      setUpdatedGroups(finalArray);
    }
  }, [
    allPropertyGroups,
    allPropertyGroupsStatus,
    groupsOfSelectedProperty,
    handleCreatePropertyGroup,
  ]);

  return (
    <>
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
                {selectedProperty.street}
              </h2>
              <h4 className="font-semibold text-gray-500">
                {selectedProperty?.city +
                  ", " +
                  selectedProperty?.state +
                  " " +
                  selectedProperty?.zip}
              </h4>
              <p className="text-gray-500">
                Price: ${Number(selectedProperty?.price).toLocaleString()}
              </p>
            </div>
            <div className="mt-3 pb-4">
              <p className="text-xs font-medium text-gray-400 tracking-wider">
                NOTES
              </p>
              {selectedProperty.note ? (
                <p className="text-gray-600">{selectedProperty.note}</p>
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
              <div className="flex mt-1 flex-wrap gap-1">
                {groupsOfSelectedProperty?.length > 0 ? (
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
                              handleRemoveFromGroup(group.groupsPropertyID)
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
                  handleCreateGroup={handleCreatePropertyGroup}
                />
              )}
            </div>
            {/* <div className="border-t pt-2">
              <button className="flex items-center font-medium text-gray-600">
                View Full Profile <FiExternalLink className="ml-2" />
              </button>
            </div> */}
          </CardContainer.Card>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-wider">
              ASSOCIATED OWNER
            </h2>
            {selectedOwner ? (
              <>
                <div className="border-b py-1">
                  <h3 className="font-semibold text-gray-700">
                    {selectedOwner.firstName + " " + selectedOwner?.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedOwner?.company}
                  </p>
                </div>
                <div className="border-b py-1">
                  {selectedOwner?.email?.split(",").map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-500 py-1"
                    >
                      <div className="mr-1 bg-[#f7f9fb] px-1 py-1 rounded-full border">
                        <FiMail size={12} />
                      </div>
                      {email}
                    </div>
                  ))}
                </div>
                <div className="py-1">
                  {selectedOwner?.phone?.split(",").map((phone, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-500 py-1"
                    >
                      <div className="mr-1 bg-[#f7f9fb] px-1 py-1 rounded-full border">
                        <FiPhone size={12} />
                      </div>
                      {phoneFormatRegex(phone)}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="font-light text-gray-300 text-sm mt-1">
                No owner associated...
              </p>
            )}
          </CardContainer.Card>
        </CardContainer>

        <div className="bg-white w-full py-1 text-center mt-5 border-y border-neutral-200">
          <h3 className="font-semibold">Activities</h3>
        </div>

        <CardContainer>
          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-wider">
              CREATE A TASK
            </h2>
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
                dateFormat="MM/dd/yyyy h:mm"
              />
              <button
                className="mt-3 w-fit inline bg-ctablue text-white text-left px-3 py-1 rounded font-semibold hover:bg-hoverctablue"
                onClick={handleSubmitTask}
              >
                Create Task
              </button>
            </div>
          </CardContainer.Card>

          <CardContainer.Card>
            <h2 className="font-bold text-xs text-gray-400 tracking-widerr">
              TASKS
            </h2>
            {selectedProperty?.tasks?.items?.length > 0 ? (
              selectedProperty.tasks.items.map((task, index) => (
                <div key={task.id} className="flex flex-col py-1">
                  <h5 className="font-medium text-gray-900">{task.title}</h5>
                  <p className="text-sm font-light">{task.content}</p>
                  <p className="text-xs font-light mt-1">{task.date}</p>
                </div>
              ))
            ) : (
              <p className="font-light text-sm text-gray-400">
                No tasks yet...
              </p>
            )}
          </CardContainer.Card>
        </CardContainer>
      </div>
    </>
  );
}
