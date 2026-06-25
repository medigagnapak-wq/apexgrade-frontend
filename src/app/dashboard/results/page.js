'use client';

import { useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ResultsEntry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fake form submission to look cool for the presentation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Results Processing</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Securely enter and publish academic grades.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 👉 LEFT SIDE: The Entry Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">New Result Entry</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student ID</label>
                  <input type="text" placeholder="e.g. 24ECE101" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject Code</label>
                  <input type="text" placeholder="e.g. CS-301" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Internal Marks (out of 40)</label>
                  <input type="number" min="0" max="40" placeholder="0-40" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">External Marks (out of 60)</label>
                  <input type="number" min="0" max="60" placeholder="0-60" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Faculty Remarks (Optional)</label>
                <textarea rows="3" placeholder="Enter any specific notes about the student's performance..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  <AlertCircle className="inline w-4 h-4 mr-1 mb-0.5" />
                  Double-check entries before saving.
                </span>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : showSuccess ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{isSubmitting ? 'Saving...' : showSuccess ? 'Saved!' : 'Submit Grades'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 👉 RIGHT SIDE: Recent Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">Recent Submissions</h3>
            
            <div className="space-y-6">
              {/* Fake Activity Items */}
              {[
                { id: '24ECE101', sub: 'Signals & Systems', time: '2 mins ago', grade: 'A' },
                { id: '24CSE205', sub: 'Database Mgmt', time: '15 mins ago', grade: 'A+' },
                { id: '24MEC304', sub: 'Thermodynamics', time: '1 hour ago', grade: 'B+' },
              ].map((log, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 flex-shrink-0">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{log.grade}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{log.id}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{log.sub}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}