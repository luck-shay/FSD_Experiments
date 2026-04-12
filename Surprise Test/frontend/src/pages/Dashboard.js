import React, { useState, useEffect } from 'react';
import { Briefcase, CheckSquare, Award, XCircle, Search } from 'lucide-react';
import { applicationsAPI } from '../services/api';
import { StatCard } from '../components/StatCard';
import { ApplicationTable } from '../components/ApplicationTable';
import { ApplicationForm } from '../components/ApplicationForm';
import { AlertBanner } from '../components/AlertBanner';
import './Dashboard.css';

export const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
  });
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [alert, setAlert] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsRes, statsRes] = await Promise.all([
        applicationsAPI.getAll(),
        applicationsAPI.getStats(),
      ]);

      setApplications(appsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to fetch applications. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplication = async (formData) => {
    try {
      await applicationsAPI.create(formData);
      setAlert({ type: 'success', message: 'Application added successfully!' });
      fetchData();
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to add application',
      });
    }
  };

  const handleUpdateApplication = async (formData) => {
    try {
      await applicationsAPI.update(editingApp.id, formData);
      setAlert({ type: 'success', message: 'Application updated successfully!' });
      setEditingApp(null);
      fetchData();
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to update application',
      });
    }
  };

  const handleDeleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationsAPI.delete(id);
        setAlert({ type: 'success', message: 'Application deleted successfully!' });
        fetchData();
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.response?.data?.message || 'Failed to delete application',
        });
      }
    }
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      try {
        const res = await applicationsAPI.search(value);
        setApplications(res.data);
      } catch (error) {
        setAlert({ type: 'error', message: 'Search failed' });
      }
    } else {
      fetchData();
    }
  };

  const handleFilterStatus = async (status) => {
    setFilterStatus(status);
    if (status !== 'all') {
      try {
        const res = await applicationsAPI.getByStatus(status);
        setApplications(res.data);
      } catch (error) {
        setAlert({ type: 'error', message: 'Filter failed' });
      }
    } else {
      fetchData();
    }
  };

  const handleEditApplication = (app) => {
    setEditingApp(app);
    setFormOpen(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track your job applications and monitor your progress</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingApp(null); setFormOpen(true); }}>
          + New Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          icon={Briefcase}
          label="Total Applications"
          value={stats.totalApplications}
          color="blue"
        />
        <StatCard
          icon={CheckSquare}
          label="Interviews"
          value={stats.interviews}
          color="purple"
        />
        <StatCard
          icon={Award}
          label="Offers"
          value={stats.offers}
          color="green"
        />
        <StatCard
          icon={XCircle}
          label="Rejections"
          value={stats.rejections}
          color="red"
        />
      </div>

      {/* Search and Filter */}
      <div className="search-filter-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by company..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterStatus('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterStatus === 'APPLIED' ? 'active' : ''}`}
            onClick={() => handleFilterStatus('APPLIED')}
          >
            Applied
          </button>
          <button
            className={`filter-btn ${filterStatus === 'INTERVIEW' ? 'active' : ''}`}
            onClick={() => handleFilterStatus('INTERVIEW')}
          >
            Interview
          </button>
          <button
            className={`filter-btn ${filterStatus === 'OFFER' ? 'active' : ''}`}
            onClick={() => handleFilterStatus('OFFER')}
          >
            Offer
          </button>
          <button
            className={`filter-btn ${filterStatus === 'REJECTED' ? 'active' : ''}`}
            onClick={() => handleFilterStatus('REJECTED')}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <ApplicationTable
        applications={applications}
        onEdit={handleEditApplication}
        onDelete={handleDeleteApplication}
        loading={loading}
      />

      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingApp(null); }}
        onSubmit={editingApp ? handleUpdateApplication : handleAddApplication}
        initialData={editingApp}
      />

      {/* Alert Banner */}
      {alert && (
        <AlertBanner
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};
