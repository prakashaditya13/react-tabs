import React, { useState } from "react";
import { TABS } from "../../constant";
import CloseIcon from "../../assets/close.png";

const HeaderTab = () => {
  const [tabsList, setTabsList] = useState(TABS);
  const [activeTab, setActiveTab] = useState(0);

  const onHandleAddtabs = () => {
    setTabsList((prevtabs) => {
      return [
        ...prevtabs,
        {
          id: (prevtabs.length-1) + 1,
          tabTitle: `Tab ${prevtabs.length + 1}`,
          tabContent: `Tab ${prevtabs.length + 1} Content`,
        },
      ];
    });
    setActiveTab((tabsList.length-1) + 1);
  };

  const onHandleDeleteTab = (e,id,currentIndex) => {
    e.stopPropagation();
    const tempTabList = tabsList.filter((tab) => tab.id !== id);
    const tempId = currentIndex-1
    setTabsList(tempTabList);
    setActiveTab(tempId);
  };

  return (
    <div className="__header__tabs__container">
      <div className="__tabs__list__section flex gap-1 hover:[&>div]:cursor-pointer [&>div]:rounded-t-[10px]">
        {tabsList.map((tab, index) => {
          return (
            <div
              onClick={() => setActiveTab(index)}
              key={tab?.id}
              className={`__tabs__list max-w-[200px] w-[200px] ${
                activeTab === index
                  ? "bg-[#fff] transition-all border-t border-l border-r border-[#808080c7]"
                  : "bg-[#8080809a] border border-[#808080c7] text-[#fff]"
              }  p-2 flex justify-between items-center`}
            >
              <p>{tab?.tabTitle}</p>
              <p
                onClick={(e) => onHandleDeleteTab(e,tab?.id,index)}
                className="__close__icon__section"
              >
                {(tabsList.length !== 1 || tabsList.length > 1) && (
                  <img
                    id={`${tab?.id}`}
                    src={CloseIcon}
                    alt="closeICon"
                    className="w-[18px] h-[18px]"
                  />
                )}
              </p>
            </div>
          );
        })}

        {/* Add Tabs Section */}
        <div
          onClick={onHandleAddtabs}
          className="__add__tabs__section border w-[50px] flex justify-center items-center bg-[#80808065] hover:bg-[#808080c0] transition-all"
        >
          <p>➕</p>
        </div>
      </div>

      {/* Tabs Content Body Section */}

      <div className="__tabs__content__section bg-[#fff] h-screen p-4">
        {tabsList.map((tab, index) => {
          return (
            <div
              key={tab?.id}
              className={`${activeTab === index ? "block" : "hidden"}`}
            >
              <p>{tab?.tabContent}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderTab;
