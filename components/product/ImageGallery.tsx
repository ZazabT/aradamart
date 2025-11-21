import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';

interface ImageGalleryProps {
  images: string[];
  thumbnail: string;
}

export function ImageGallery({ images, thumbnail }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  const allImages = [thumbnail, ...(images || [])];

  return (
    <View className="gap-3">
      {/* Main Image */}
      <View className="h-80 w-full rounded-lg bg-gray-100">
        <Image
          source={{ uri: selectedImage }}
          className="h-full w-full rounded-lg"
          resizeMode="contain"
        />
      </View>

      {/* Thumbnail Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-2"
      >
        {allImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(image)}
            className={`h-16 w-16 rounded-lg border-2 ${
              selectedImage === image ? 'border-orange-500' : 'border-gray-200'
            }`}
          >
            <Image
              source={{ uri: image }}
              className="h-full w-full rounded-lg"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
