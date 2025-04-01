import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const sponsorshipPlans = [
  {
    title: 'Basic',
    price: '$50',
    period: '/month',
    features: [
      'Logo on homepage',
      'Social media mention',
      'Basic analytics',
      'Email support',
    ],
    buttonText: 'Choose Basic',
    buttonVariant: 'outlined' as const,
  },
  {
    title: 'Pro',
    price: '$150',
    period: '/month',
    features: [
      'Prominent logo placement',
      'Featured games section',
      'Advanced analytics',
      'Priority support',
      'Monthly report',
      'Custom branding options',
    ],
    buttonText: 'Choose Pro',
    buttonVariant: 'contained' as const,
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: '$500',
    period: '/month',
    features: [
      'Premium logo placement',
      'Custom landing page',
      'Real-time analytics',
      '24/7 support',
      'Detailed reports',
      'API access',
      'Custom development',
      'Dedicated account manager',
    ],
    buttonText: 'Contact Us',
    buttonVariant: 'outlined' as const,
  },
];

const Sponsor = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={8}>
        <Typography variant="h1" gutterBottom>
          {t('sponsor.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {t('sponsor.subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {sponsorshipPlans.map((plan) => (
          <Grid item key={plan.title} xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...(plan.highlighted && {
                  border: '2px solid',
                  borderColor: 'primary.main',
                  transform: 'scale(1.05)',
                  zIndex: 1,
                }),
              }}
            >
              {plan.highlighted && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <StarIcon fontSize="small" />
                  <Typography variant="caption" fontWeight="bold">
                    {t('sponsor.popular')}
                  </Typography>
                </Box>
              )}
              
              <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                <Typography variant="h5" component="div" gutterBottom align="center">
                  {plan.title}
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={1} mb={3}>
                  <Typography variant="h3" component="div">
                    {plan.price}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {plan.period}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  {plan.features.map((feature) => (
                    <ListItem key={feature} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant={plan.buttonVariant}
                  size="large"
                  color="primary"
                >
                  {plan.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={0} sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          {t('sponsor.why.title')}
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          {t('sponsor.why.subtitle')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                {t('sponsor.benefit.1.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('sponsor.benefit.1.desc')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                {t('sponsor.benefit.2.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('sponsor.benefit.2.desc')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                {t('sponsor.benefit.3.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('sponsor.benefit.3.desc')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Sponsor; 