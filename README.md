# Queenpins Client

## Getting Start

1. `npm install` to add project dependencies to your local machine.

2. `touch node_modules/@types/react-cloudinary-upload-widget.d.ts` then paste this inside the file:

```typescript
declare module 'react-cloudinary-upload-widget' {
  import * as React from 'react';

  export interface WidgetButtonProps {
    myWidgetFunction: () => void;
    style?: React.CSSProperties;
    buttonText?: string;
    buttonType?: 'button' | 'submit' | 'reset';
  }

  export const WidgetButton: React.FC<WidgetButtonProps>;

  export interface GenerateSignatureParams {
    custom_coordinates?: boolean;
    eager?: string;
    filename_override?: string;
    headers?: string;
    public_id?: string;
    source?: string;
    timestamp: number;
    unique_filename?: boolean;
    upload_preset?: string;
    use_filename?: boolean;
  }

  export interface GenerateSignatureResponse {
    signature: string;
    api_key: string;
    resource_type: string;
    eager?: string;
    public_id?: string;
    [key: string]: any;
  }

  export type GenerateSignatureCallback = (
    result: GenerateSignatureResponse | GenerateSignatureResponse[]
  ) => void;

  export type PrepareUploadParamsCallback = (
    cb: GenerateSignatureCallback,
    params: GenerateSignatureParams | GenerateSignatureParams[]
  ) => Promise<void>;

  export interface WidgetOptions {
    showCompletedButton?: boolean;
    multiple?: boolean;
    singleUploadAutoClose?: boolean;
    showAdvancedOptions?: boolean;
    showPoweredBy?: boolean;
    styles?: any;
    googleDriveClientId?: string;
    buttonText?: string;
    style?: React.CSSProperties;
    autoClose?: boolean;
    sources: StringSet[];
    onSuccess: (result: WidgetResult) => void;
    onFailure: (error: any, result: WidgetResult) => void;
    logging?: boolean;
    customPublicId?: string;
    destroy?: boolean;
    generateSignatureUrl?: string;
    apiKey: string;
    accepts?: string;
    contentType?: string;
    withCredentials?: boolean;
    sourceKeys?: {
      [key: string]: string;
    };
    cloudName: string;
    uploadPreset: string;
    folder?: string;
    cropping?: boolean;
    resourceType: 'auto' | 'image' | 'video' | 'raw';
    use_filename?: boolean;
    unique_filename?: boolean;
    eager?: string;
    prepareUploadParams?: PrepareUploadParamsCallback;
    widgetStyles?: any;
  }

  export interface WidgetResult {
    event: string;
    info: Info;
  }

  export interface Info {
    id: string;
    batchId: string;
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: any[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    access_mode: string;
    original_filename: string;
    path: string;
    thumbnail_url: string;
  }

  export type WidgetCallback = (error: any, result: WidgetResult) => void;

  export interface WidgetInstance {
    update(options: WidgetOptions): void;
    open(): void;
    destroy(): void;
  }

  type StringSet =
    | 'local'
    | 'url'
    | 'camera'
    | 'dropbox'
    | 'image_search'
    | 'facebook'
    | 'instagram'
    | 'shutterstock'
    | 'gettyimages'
    | 'istock'
    | 'unsplash'
    | 'google_drive';

  export interface WidgetFunction {
    (
      sources: StringSet[],
      sourceKeys: { [key: string]: string } | null,
      resourceType: 'auto' | 'image' | 'video' | 'raw',
      cloudName: string,
      uploadPreset: string,
      folder: string | null,
      cropping: boolean,
      generateSignatureUrl: string,
      onSuccess: (result: WidgetResult) => void,
      onFailure: (error: any, result: WidgetResult) => void,
      logging: boolean,
      customPublicId: string | null,
      eager: string | null,
      apiKey: string,
      accepts: string,
      contentType: string,
      withCredentials: boolean,
      use_filename: boolean,
      unique_filename: boolean,
      googleDriveClientId: string | null,
      multiple: boolean,
      widgetStyles: any | null,
      destroy: boolean,
      autoClose: boolean
    ): void;
    destroy(): void;
    open(): void;
  }

  export const myWidget: WidgetFunction;
  export const cloudinaryOnSuccessCallback: (result: WidgetResult) => void;
  export const cloudinaryOnFailureCallback: (
    error: any,
    result: WidgetResult
  ) => void;
  export const Widget: React.FC<WidgetOptions>;
  export const WidgetLoader: React.FC;
}
```

3. `touch .env` then set your environment variables:

```
VITE_API_URL = Your API url

VITE_CLOUD_NAME = Your Cloudinary cloud name
VITE_UPLOAD_PRESET = Your Cloudinary preset
VITE_CLOUDINARY_API_KEY = Your Cloudinary API key
```
