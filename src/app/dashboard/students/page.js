'use client';

import { useState, useEffect } from 'react';
// 👇 THE FIX: CheckCircle2 is now properly imported right here!
import { Search, Filter, Download, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';

export default function StudentsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [role, setRole] = useState('staff');
  
  // Interaction State for the Toast Notification
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('apexRole') || 'staff');
  }, []);

  const students = [
    { id: '24ECE101', name: 'Arjun Reddy', department: 'Electronics', year: 'Year 4', cgpa: '8.4', status: 'Excellent' },
    { id: '24CSE205', name: 'Priya Sharma', department: 'Computer Science', year: 'Year 2', cgpa: '7.9', status: 'Good' },
    { id: '24ECE112', name: 'Karthik Iyer', department: 'Electronics', year: 'Year 1', cgpa: '6.2', status: 'Warning' },
    { id: '24MEC304', name: 'Neha Patel', department: 'Mechanical', year: 'Year 4', cgpa: '9.1', status: 'Excellent' },
  ];

  const filteredStudents = students.filter(student => {
    return (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (yearFilter === 'All' || student.year === yearFilter);
  });

  // Action Trigger for Hover Buttons
  const triggerAction = (studentName, action) => {
    setActiveToast(`${action} action triggered for ${studentName}`);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const generateCSV = () => {
    const headers = ['Student ID', 'Name', 'Department', 'Batch Year', 'CGPA', 'Status'];
    const csvRows = [headers.join(',')];
    filteredStudents.forEach(s => csvRows.push(`${s.id},"${s.name}","${s.department}",${s.year},${s.cgpa},${s.status}`));
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'ApexGrade_Students.csv');
    a.click();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500 relative">
      
      {/* Interactive Toast Notification */}
      {activeToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-[100] animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-medium">{activeToast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {role === 'admin' ? 'Global Students Directory' : 'My Assigned Students'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage profiles and view academic standing.</p>
        </div>
        <button onClick={generateCSV} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-500 transition-colors shadow-sm">
          <Download className="w-4 h-4 mr-2" /> Export to CSV
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by ID or Student Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white text-sm" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="w-full sm:w-auto pl-10 pr-8 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white text-sm appearance-none cursor-pointer font-medium">
              <option value="All">All Years</option><option value="Year 1">Year 1</option><option value="Year 2">Year 2</option><option value="Year 3">Year 3</option><option value="Year 4">Year 4</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Student Info</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Batch Year</th>
                <th className="px-6 py-4 font-medium">CGPA</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{student.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{student.id}</div>
                    </td>
                    <td className="px-6 py-4">{student.department}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-700">{student.year}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">{student.cgpa}</td>
                    
                    {/* Hover Interaction Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => triggerAction(student.name, 'Message sent')} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 transition-colors">
                           <Mail className="w-4 h-4" />
                        </button>
                        <button onClick={() => triggerAction(student.name, 'Profile opened')} className="p-2 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-md text-indigo-600 dark:text-indigo-400 transition-colors">
                           <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">No students found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}