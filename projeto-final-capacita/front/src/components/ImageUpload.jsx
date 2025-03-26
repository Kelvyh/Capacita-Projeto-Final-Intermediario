import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const ImageUpload = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    if (onImagesChange) {
      onImagesChange([...images.map((img) => img.file), ...files]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file));
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Images
      </Typography>
      <Button variant="contained" component="label">
        Select Images
        <input
          hidden
          accept="image/*"
          type="file"
          multiple
          onChange={handleImageChange}
        />
      </Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={img.preview}
                alt="Uploaded preview"
              />
              <CardActions>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUpload;
