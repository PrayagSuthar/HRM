export default function LeaveStatus() {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <h2 className="font-bold mb-2">Leave Balance</h2>
          <ul>
            <li>Paid Leave: 0</li>
            <li>Optional Leave: 12</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <h2 className="font-bold">Approved Leave Status</h2>
          <p>No data found</p>
        </div>
      </div>
    );
  }
  