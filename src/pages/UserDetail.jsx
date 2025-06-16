import React from "react";

import { PhotoKTPSection } from "../components/UserDetail/PhotoKTPSection";
import { AccountInfoSection } from "../components/UserDetail/AccountInfoSection";
import { PersonalDataSection } from "../components/UserDetail/PersonalDataSection";
import { OtherInfoSection } from "../components/UserDetail/OtherInfoSection";
import { BreadcrumbUser } from "../components/UserDetail/BreadcrumbUser";
import Breadcrumb from "../components/BreadCrumb";

export const UserDetail = () => {
  return (
    <div className="w-full">
      <Breadcrumb />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="space-y-6">
          <PhotoKTPSection />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AccountInfoSection />
          <PersonalDataSection />
          <OtherInfoSection />
        </div>
      </div>
    </div>
  );
};
