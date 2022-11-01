import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneProperty,
  selectPropertyById,
} from "../../../redux/properties-slice";
import CardContainer from "./SideModalCard";
import { FiExternalLink, FiPlus, FiMail, FiPhone } from "react-icons/fi";
import { TbArrowAutofitRight } from "react-icons/tb";
import { fetchOneClient, selectClientById } from "../../../redux/clients-slice";
import { phoneFormatRegex } from "../../../utility/phoneFormat";

export default function SideModalProperties({
  previewIsOpen,
  setPreviewIsOpen,
  previewId,
}) {
  const dispatch = useDispatch();
  const selectedProperty = useSelector((state) =>
    selectPropertyById(state, previewId)
  );
  const selectedOwner = useSelector((state) =>
    selectClientById(state, selectedProperty?.clientId)
  );

  useEffect(() => {
    dispatch(fetchOneProperty(previewId));
  }, [previewId, dispatch]);

  useEffect(() => {
    if (selectedProperty.clientId) {
      dispatch(fetchOneClient(selectedProperty.clientId));
    }
  }, [dispatch, selectedProperty.clientId]);

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
              <div className="flex mt-1">
                {selectedProperty.group?.items?.length > 0 ? (
                  selectedProperty.group.items.map((group, index) => (
                    <div
                      key={group.id}
                      className="bg-[#e8eef4] mr-2 px-4 rounded"
                    >
                      {group.propertyGroup.title}
                    </div>
                  ))
                ) : (
                  <p className="font-light text-gray-300 text-sm mt-1">
                    No groups set up...
                  </p>
                )}
              </div>
              <button className="flex items-center font-medium text-sm text-ctablue mt-3">
                <FiPlus /> Add to Group
              </button>
            </div>
            <div className="border-t pt-2">
              <button className="flex items-center font-medium text-gray-600">
                View Full Profile <FiExternalLink className="ml-2" />
              </button>
            </div>
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
      </div>
    </>
  );
}
