// src/lib/sanity.js
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: 'uzpp961j',
    dataset: 'production',
    apiVersion: '2024-06-06', // Adjust this based on your schema version
    useCdn: true, // `true` if you don't need fresh data
});

export async function getProjectBySlug(slug) {
    const query = `
    *[_type == "project" && slug.current == $slug][0] {
      title,
      thumbnail,
      details[]{
        _type == "textBlock" => {
          _type,
          content,
          position
        },
        _type == "imageBlock" => {
          _type,
          image,
          position
        },
        _type == "videoBlock" => {
          _type,
          url,
          caption,
          position
        }
      }
    }
  `;
    return sanityClient.fetch(query, { slug });
}

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source) => builder.image(source);