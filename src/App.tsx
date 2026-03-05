import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
}

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [newUsername, setNewUsername] = useState('')

  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
    
    if (error) console.error('Error fetching profiles:', error)
    else setProfiles(data || [])
  }

  async function addProfile() {
    if (!newUsername) return;
    
    const newProfile = {
      id: crypto.randomUUID(),
      username: newUsername,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('profiles')
      .insert([newProfile])

    if (error) {
      console.error('Error adding profile:', error)
      alert('Error adding profile: ' + error.message)
    } else {
      setNewUsername('')
      fetchProfiles()
    }
  }

  return (
    <div className="container" style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>Integration Test App</h1>
      
      <div className="card" style={{ marginBottom: '2rem', padding: '1rem', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>Supabase Profiles</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input 
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="New username"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #333', background: '#222', color: 'white' }}
          />
          <button onClick={addProfile} style={{ padding: '0.5rem 1rem', background: '#0f5af0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Profile
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {profiles.map(p => (
            <li key={p.id} style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>
              {p.username} <small style={{ color: '#888' }}>({new Date(p.updated_at).toLocaleString()})</small>
            </li>
          ))}
          {profiles.length === 0 && <li style={{ color: '#888' }}>No profiles yet.</li>}
        </ul>
      </div>

      <div className="card" style={{ padding: '1rem', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>Stitch Logs Collection (Mock UI)</h2>
        <div style={{ background: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#ff4444' }}>
            <strong>[ERROR]</strong>
            <span>{new Date().toISOString()}</span>
          </div>
          <code style={{ color: '#ccc' }}>Database connection timeout in module auth_service</code>
        </div>
      </div>
    </div>
  )
}

export default App