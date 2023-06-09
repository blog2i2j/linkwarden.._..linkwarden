import { Tab } from "@headlessui/react";
import CollectionInfo from "./CollectionInfo";
import { CollectionIncludingMembers } from "@/types/global";
import TeamManagement from "./TeamManagement";
import { useState } from "react";
import DeleteCollection from "./DeleteCollection";

type Props = {
  toggleCollectionModal: Function;
  activeCollection: CollectionIncludingMembers;
  method: "CREATE" | "UPDATE";
  className?: string;
  defaultIndex?: number;
};

export default function CollectionModal({
  className,
  defaultIndex,
  toggleCollectionModal,
  activeCollection,
  method,
}: Props) {
  const [collection, setCollection] =
    useState<CollectionIncludingMembers>(activeCollection);

  return (
    <div className={className}>
      <Tab.Group defaultIndex={defaultIndex}>
        <p
          className={`text-xl text-sky-500 text-center ${
            method === "UPDATE" && "mb-5"
          }`}
        >
          {method === "CREATE" && "Add"} Collection{" "}
          {method === "UPDATE" && "Settings"}
        </p>
        <Tab.List className="flex justify-center flex-col sm:flex-row gap-2 sm:gap-3 mb-5 text-sky-600">
          {method === "UPDATE" && (
            <>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "px-2 py-1 bg-sky-200 duration-100 rounded-md outline-none"
                    : "px-2 py-1 hover:bg-slate-200 rounded-md duration-100 outline-none"
                }
              >
                Collection Info
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "px-2 py-1 bg-sky-200 duration-100 rounded-md outline-none"
                    : "px-2 py-1 hover:bg-slate-200 rounded-md duration-100 outline-none"
                }
              >
                Share & Collaborate
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "px-2 py-1 bg-sky-200 duration-100 rounded-md outline-none"
                    : "px-2 py-1 hover:bg-slate-200 rounded-md duration-100 outline-none"
                }
              >
                Delete Collection
              </Tab>
            </>
          )}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CollectionInfo
              toggleCollectionModal={toggleCollectionModal}
              setCollection={setCollection}
              collection={collection}
              method={method}
            />
          </Tab.Panel>

          {method === "UPDATE" && (
            <>
              <Tab.Panel>
                <TeamManagement
                  toggleCollectionModal={toggleCollectionModal}
                  setCollection={setCollection}
                  collection={collection}
                  method={method}
                />
              </Tab.Panel>
              <Tab.Panel>
                <DeleteCollection
                  toggleDeleteCollectionModal={toggleCollectionModal}
                  collection={collection}
                />
              </Tab.Panel>
            </>
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
