import { v2 as cloudinary } from 'cloudinary';

export const deleteAsset = (pid, resourceType) =>
  cloudinary.uploader.destroy(pid, {
    resource_type: resourceType,
    invalidate: true,
  });
