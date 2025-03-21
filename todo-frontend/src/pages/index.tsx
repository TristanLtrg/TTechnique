import { useState, useEffect, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Task = {
  id: number;
  title: string;
  description: string;
  createdDate: string;
  status: 'A_FAIRE' | 'EN_COURS' | 'FAIT';
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdDate, setcreatedDate] = useState('');
  const [status, setStatus] = useState<'A_FAIRE' | 'EN_COURS' | 'FAIT'>('A_FAIRE');
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { title, description, status };

    if (editTaskId) {
      await fetch(`http://localhost:3001/api/tasks/${editTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setEditTaskId(null);
    } else {
      await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setTitle('');
    setDescription('');
    setcreatedDate('');
    setStatus('A_FAIRE');
    setShowForm(false);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setShowForm(true);
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'A_FAIRE':
        return 'badge bg-secondary';
      case 'EN_COURS':
        return 'badge bg-warning';
      case 'FAIT':
        return 'badge bg-success';
      default:
        return 'badge bg-dark';
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Liste des tâches</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Fermer' : 'Ajouter une tâche'}
      </button>
      {showForm && (
        <div className="card p-3 mb-4">
          <h2>{editTaskId ? 'Modifier' : 'Ajouter'} une tâche</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Titre:</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Statut:</label>
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value as 'A_FAIRE' | 'EN_COURS' | 'FAIT')}>
                <option value="A_FAIRE">à faire</option>
                <option value="EN_COURS">en cours</option>
                <option value="FAIT">terminée</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">{editTaskId ? 'Modifier' : 'Ajouter'}</button>
          </form>
        </div>
      )}
      <div className="row">
        {tasks.map(task => (
          <div key={task.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text"><small className="text-muted">créée: {task.createdDate}</small></p>
                <p className="card-text"><small className="text-muted">modifiée: {task.updatedAt}</small></p>
                <span className={getStatusBadge(task.status)}>{task.status.replace('_', ' ')}</span>
                <div className="mt-3">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(task)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
