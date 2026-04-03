import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

const RecruitIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.427a2.25 2.25 0 012.25-2.25h4.5M16.5 3.75h3.75M20.25 3.75v3.75M20.25 3.75L13.5 10.5M9.75 12.75h4.5M9.75 15.75h2.25"
    />
  </svg>
);

const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },

  // Attendance Management dropdown (like screenshot)
  {
    icon: <CalenderIcon />,
    name: "Attendance Management",
    subItems: [
      { name: "Attendance", path: "/attendance" },
      {
        name: "Bulk Attendance Summary",
        path: "/attendance/bulk-summary",
      },
      {
        name: "Generate Salary Advice",
        path: "/attendance/generate-salary-advice",
      },
      {
        name: "Lock Attendance",
        path: "/attendance/lock-attendance",
      },
      {
        name: "Daily Attendance",
        path: "/attendance/daily-attendance",
      },
      {
        name: "Checkin",
        path: "/attendance/checkin",
      },
      {
        name: "Unit Attendance",
        path: "/attendance/unit-attendance",
      },
      {
        name: "Tea Allowance",
        path: "/attendance/tea-allowance",
      },
      {
        name: "Settings",
        subItems: [
          {
            name: "Arrear Salary",
            path: "/attendance/settings/arrear-salary",
          },
          {
            name: "Attendance Re-Process",
            path: "/attendance/settings/re-process",
          },
          {
            name: "Advanced Shift Manage..",
            path: "/attendance/settings/advanced-shift",
          },
          {
            name: "Attendance Color Settings",
            path: "/attendance/settings/color-settings",
          },
        ],
      },
    ],
  },

  // If you want to keep simple Attendance as separate item
  {
    icon: <CalenderIcon />,
    name: "Attendance",
    path: "/attendance",
  },

  {
    icon: <PieChartIcon />,
    name: "Payroll",
    subItems: [
      { name: "Payouts", path: "/payroll/payouts" },
      { name: "Pay Consultant", path: "/payroll/pay-consultant" },
      { name: "Advances & Loans", path: "/payroll/advances-loans" },
      { name: "Reimbursements", path: "/payroll/reimbursements" },
      { name: "Multiple Payout", path: "/payroll/multiple-payout" },
      { name: "Piece Rate Payout", path: "/payroll/piece-rate-payout" },
    ],
  },
  {
    name: "Reports",
    icon: <PieChartIcon />,
    subItems: [
      { name: "Payroll Reports", path: "/reports/payroll" },
      { name: "Attendance Reports", path: "/reports/attendance" },
      { name: "Salary Sheet Export", path: "/reports/salary-sheet" },
      { name: "Invoice (GST)", path: "/reports/invoice" },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Employees",
    subItems: [
      { name: "All Employees", path: "/employees" },
      { name: "HR Letter", path: "/employees/hr-letter" },
      { name: "Full & Final", path: "/employees/full-and-final" },
      {
        name: "Settings",
        subItems: [
          { name: "Asset Master", path: "/employee-mgmt/asset_master" },
          { name: "Document Master", path: "/employee-mgmt/document-master" },
          { name: "Policies", path: "/employee-mgmt/policies" },
          {
            name: "Configuration",
            path: "/employee-mgmt/employee-app-setting",
          },
          { name: "Probation Period", path: "/reports/probation-period" },
          { name: "Contract Renewal", path: "/reports/contract-renewal" },
          {
            name: "Bulk Upload Form 16",
            path: "/employee-mgmt/bulk-upload-pan",
          },
          { name: "Item Rate Master", path: "/piece/item-rate-master" },
          {
            name: "Daily Piece Entry (Bulk Entry)",
            path: "/piece/daily-entry",
          },
        ],
      },
      {
        name: "TDS",
        subItems: [
          {
            name: "Proof of Investment",
            path: "/employees/tds/proof-of-investment",
          },
        ],
      },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "Compliance",
    path: "/compliance",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Organization",
    path: "/organization",
  },
  {
    icon: <RecruitIcon />,
    name: "Recruit",
    subItems: [
      { name: "Offer Letter", path: "/recruit/offer-letter" },
      { name: "Branding", path: "/recruit/branding" },
      { name: "Manage ATS", path: "/recruit/manage-ats" },
      { name: "Job Postings", path: "/recruit/job-postings" },
    ],
  },
];

const othersItems = [
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          const walkSubItems = (list) => {
            list.forEach((subItem) => {
              if (subItem.path && isActive(subItem.path)) {
                setOpenSubmenu({ type: menuType, index });
                submenuMatched = true;
              }
              if (subItem.subItems) {
                walkSubItems(subItem.subItems);
              }
            });
          };
          walkSubItems(nav.subItems);
        }
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) return null;
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType &&
                openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    {subItem.subItems ? (
                      <details className="group">
                        <summary className="menu-dropdown-item cursor-pointer flex items-center">
                          <span>{subItem.name}</span>
                          <ChevronDownIcon className="ml-auto w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <ul className="mt-1 space-y-1 ml-4">
                          {subItem.subItems.map((inner) => (
                            <li key={inner.name}>
                              <Link
                                to={inner.path}
                                className={`menu-dropdown-item ${
                                  isActive(inner.path)
                                    ? "menu-dropdown-item-active"
                                    : "menu-dropdown-item-inactive"
                                }`}
                              >
                                {inner.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`
        fixed mt-16 lg:mt-0 top-0 left-0 px-5
        bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900
        border-r border-gray-200
        flex flex-col h-screen
        transition-all duration-300 ease-in-out z-50
        ${
          isExpanded || isMobileOpen
            ? "w-[250px]"
            : isHovered
            ? "w-[250px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo area */}
      <div
        className={`py-6 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.jpeg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* Scrollable nav area */}
      <div className="flex-1 min-h-0 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;