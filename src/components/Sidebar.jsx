import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaVideo,
  FaNewspaper,
} from "react-icons/fa";
import "../design/components/sidebar.css";

function Sidebar() {
  const sections = [
    {
      title: "OVERVIEW",
      links: [
        { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
      ],
    },
    {
      title: "MANAGEMENT",
      links: [
        { name: "Events", path: "/admin/events", icon: <FaCalendarAlt /> },
        { name: "Todo List", path: "/admin/todo", icon: <FaClipboardList /> },
      ],
    },
    {
      title: "CONTENT",
      links: [
        { name: "Tutorials", path: "/admin/tutorials", icon: <FaVideo /> },
        {
          name: "Updates",
          path: "/admin/updates",
          icon: <FaNewspaper />,
        },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      {sections.map((section) => (
        <div key={section.title} className="sidebar-section">
          <p className="sidebar-category">{section.title}</p>

          {section.links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
