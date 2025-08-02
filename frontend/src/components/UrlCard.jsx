import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Tooltip
} from '@mui/material';

const UrlCard = ({ originalUrl, shortUrl, expiry, error }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert('Short URL copied to clipboard!');
    } catch (err) {
      alert('Failed to copy URL');
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          {/* Original URL */}
          <div>
            <Typography variant="subtitle2" color="text.secondary">
              Original URL:
            </Typography>
            <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
              {originalUrl}
            </Typography>
          </div>

          {/* Short URL (if exists) */}
          {shortUrl && (
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Short URL:
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'none' }}
                  >
                    {shortUrl}
                  </a>
                </Typography>
                <Tooltip title="Copy to clipboard">
                  <Button size="small" variant="outlined" onClick={handleCopy}>
                    Copy
                  </Button>
                </Tooltip>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Expires at: {new Date(expiry).toLocaleString()}
              </Typography>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UrlCard;
