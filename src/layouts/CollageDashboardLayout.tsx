import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CollageSidebar } from '../components/navigation/CollageSidebar';
import { CollageHeader } from '../components/navigation/CollageHeader';
import { StudentProfile } from '../data/collageData';

interface CollageDashboardLayoutProps {
  user: StudentProfile;
  onLogout?: () => void;
  titleOverride?: string;
  breadcrumb?: string;
}

export const CollageDashboardLayout: React.FC<CollageDashboardLayoutProps> = ({
  user,
  onLogout,
  titleOverride,
  breadcrumb,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F7FC] flex antialiased font-['Inter',Arial,sans-serif] text-[#334155]">
      {/* Dark Navy Sidebar */}
      <CollageSidebar
        user={user}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <CollageHeader
          user={user}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onLogout={onLogout}
          titleOverride={titleOverride}
          breadcrumb={breadcrumb}
        />

        {/* Content Body matching exact HTML .content: padding 30px 34px 50px; max-width: 1500px; margin: auto */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 max-w-[1500px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
