import { Home, Calendar, FileText, Settings } from 'lucide-react';

const links = [
  { icon: Home, name: 'Dashboard' },
  { icon: Calendar, name: 'Attendance' },
  { icon: FileText, name: 'Timesheet' },
  { icon: Settings, name: 'Policy' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">HRM System</div>
      <nav className="flex-1 space-y-2">
        {links.map((link, idx) => (
          <a
            key={idx}
            href="#"
            className="flex items-center p-2 hover:bg-gray-600"
          >
            <link.icon className="mr-3 w-5 h-5" />
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
