import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  FormHelperText,
  Autocomplete,
  styled
} from '@mui/material';

const PreviewImage = styled('img')({
  maxWidth: '200px',
  maxHeight: '200px',
  objectFit: 'contain',
  marginTop: '10px'
});

interface FormData {
  title: string;
  description: string;
  category: string;
  gameUrl: string;
  thumbnail: File | null;
  thumbnailPreview: string;
  developerName: string;
  developerEmail: string;
  developerWebsite: string;
  tags: string[];
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  gameUrl?: string;
  thumbnail?: string;
  developerName?: string;
  developerEmail?: string;
  developerWebsite?: string;
}

const suggestedTags = [
  'Action', 'Adventure', 'Arcade', 'Board', 'Card', 'Casino',
  'Casual', 'Educational', 'Music', 'Puzzle', 'Racing', 'RPG',
  'Shooter', 'Simulation', 'Sports', 'Strategy'
];

const SubmitGame: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    gameUrl: '',
    thumbnail: null,
    thumbnailPreview: '',
    developerName: '',
    developerEmail: '',
    developerWebsite: '',
    tags: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title) {
      newErrors.title = t('submit.error.title.required');
    } else if (formData.title.length < 3) {
      newErrors.title = t('submit.error.title.length');
    }

    if (!formData.description) {
      newErrors.description = t('submit.error.description.required');
    } else if (formData.description.length < 20) {
      newErrors.description = t('submit.error.description.length');
    }

    if (!formData.category) {
      newErrors.category = t('submit.error.category.required');
    }

    if (!formData.gameUrl) {
      newErrors.gameUrl = t('submit.error.url.required');
    } else {
      try {
        new URL(formData.gameUrl);
      } catch {
        newErrors.gameUrl = t('submit.error.url.invalid');
      }
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = t('submit.error.thumbnail.required');
    }

    if (!formData.developerName) {
      newErrors.developerName = t('submit.error.developer.name.required');
    }

    if (!formData.developerEmail) {
      newErrors.developerEmail = t('submit.error.developer.email.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.developerEmail)) {
      newErrors.developerEmail = t('submit.error.developer.email.invalid');
    }

    if (formData.developerWebsite) {
      try {
        new URL(formData.developerWebsite);
      } catch {
        newErrors.developerWebsite = t('submit.error.developer.website.invalid');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      
      // 重置表单
      setFormData({
        title: '',
        description: '',
        category: '',
        gameUrl: '',
        thumbnail: null,
        thumbnailPreview: '',
        developerName: '',
        developerEmail: '',
        developerWebsite: '',
        tags: []
      });
    } catch (error) {
      console.error('Error submitting game:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件大小（2MB限制）
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        thumbnail: t('submit.error.thumbnail.size')
      }));
      return;
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        thumbnail: t('submit.error.thumbnail.type')
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: reader.result as string
      }));
      setErrors(prev => ({ ...prev, thumbnail: undefined }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('nav.submit')}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('game.title')}
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            error={!!errors.title}
            helperText={errors.title}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label={t('game.description')}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            label={t('game.category')}
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            error={!!errors.category}
            helperText={errors.category}
            margin="normal"
            required
          />

          <Autocomplete
            multiple
            options={suggestedTags}
            value={formData.tags}
            onChange={(_, newValue) => {
              if (newValue.length <= 5) {
                setFormData(prev => ({ ...prev, tags: newValue }));
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('submit.game.tags')}
                margin="normal"
                helperText={t('submit.game.tags.hint')}
              />
            )}
          />

          <TextField
            fullWidth
            label={t('game.url')}
            value={formData.gameUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, gameUrl: e.target.value }))}
            error={!!errors.gameUrl}
            helperText={errors.gameUrl}
            margin="normal"
            required
          />

          <Box sx={{ mt: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="thumbnail-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="thumbnail-upload">
              <Button variant="contained" component="span">
                {t('game.upload.thumbnail')}
              </Button>
            </label>
            {errors.thumbnail && (
              <FormHelperText error>{errors.thumbnail}</FormHelperText>
            )}
            {formData.thumbnailPreview && (
              <PreviewImage src={formData.thumbnailPreview} alt="Thumbnail preview" />
            )}
          </Box>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            {t('developer.info')}
          </Typography>

          <TextField
            fullWidth
            label={t('developer.name')}
            value={formData.developerName}
            onChange={(e) => setFormData(prev => ({ ...prev, developerName: e.target.value }))}
            error={!!errors.developerName}
            helperText={errors.developerName}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label={t('developer.email')}
            value={formData.developerEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, developerEmail: e.target.value }))}
            error={!!errors.developerEmail}
            helperText={errors.developerEmail}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label={t('developer.website')}
            value={formData.developerWebsite}
            onChange={(e) => setFormData(prev => ({ ...prev, developerWebsite: e.target.value }))}
            error={!!errors.developerWebsite}
            helperText={errors.developerWebsite}
            margin="normal"
          />

          <Box sx={{ mt: 4, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? t('submit.submitting') : t('nav.submit')}
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px'
                  }}
                />
              )}
            </Button>
          </Box>
        </form>

        {submitSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {t('submit.success')}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default SubmitGame; 