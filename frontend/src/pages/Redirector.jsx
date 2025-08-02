import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Redirector() {
  const { shortCode } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/resolve/${shortCode}`).then(res => {
      window.location.href = res.data.originalUrl;
    }).catch(() => {
      alert('Link not found or expired');
    });
  }, [shortCode]);

  return null;
}
