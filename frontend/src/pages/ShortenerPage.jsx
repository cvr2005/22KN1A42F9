import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

export default function ShortenerPage() {
  const [inputs, setInputs] = useState([{ long: '', code: '', validity: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, key, value) => {
    const updated = [...inputs];
    updated[index][key] = value;
    setInputs(updated);
  };

  const handleSubmit = async () => {
    const validInputs = inputs.filter(i => i.long);
    const results = [];
    for (const input of validInputs) {
      try {
        const res = await axios.post('http://localhost:5000/shorten', {
          originalUrl: input.long,
          customCode: input.code || undefined,
          validity: input.validity ? parseInt(input.validity) : undefined
        });
        results.push(res.data);
      } catch (e) {
        results.push({ error: e.response?.data?.error || 'Unknown error' });
      }
    }
    setResults(results);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} style={{ marginBottom: 10 }}>
          <Grid item xs={5}>
            <TextField label="Original URL" fullWidth value={input.long} onChange={e => handleChange(i, 'long', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Custom Code (optional)" fullWidth value={input.code} onChange={e => handleChange(i, 'code', e.target.value)} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Validity (min)" type="number" fullWidth value={input.validity} onChange={e => handleChange(i, 'validity', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
      <div style={{ marginTop: 20 }}>
        {results.map((res, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <CardContent>
              {res.shortUrl ? (
                <>
                  <Typography><strong>Short URL:</strong> <a href={res.shortUrl}>{res.shortUrl}</a></Typography>
                  <Typography><strong>Expires At:</strong> {new Date(res.expiresAt).toLocaleString()}</Typography>
                </>
              ) : (
                <Typography color="error">Error: {res.error}</Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
