import React from 'react';
import { AspectRatio } from '@tiny-design/react';

export default function MapDemo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        style={{ width: '100%', height: '100%' }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18601.636786872103!2d144.94774317710244!3d-37.81958302083268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d452b97c1ef%3A0xf0456760532d9f0!2sMarvel%20Stadium!5e0!3m2!1sen!2sau!4v1578489177585!5m2!1sen!2sau"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
}