import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent } from '@mui/material';

export default function StatisticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stats').then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      {data.map((entry, i) => (
        <Card key={i} style={{ marginBottom: 15 }}>
          <CardContent>
            <Typography><strong>Short URL:</strong> <a href={entry.shortUrl}>{entry.shortUrl}</a></Typography>
            <Typography><strong>Created:</strong> {new Date(entry.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Expires:</strong> {new Date(entry.expiresAt).toLocaleString()}</Typography>
            <Typography><strong>Clicks:</strong> {entry.clickCount}</Typography>
            <Typography><strong>Click Details:</strong></Typography>
            <ul>
              {entry.clicks.map((click, j) => (
                <li key={j}>{click.timestamp} | {click.referrer} | {click.geoLocation}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
