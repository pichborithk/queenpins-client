// import { useEffect, useRef } from 'react';

// const UploadWidget = ({ index, handleUpload }) => {
//   const cloudinaryRef = useRef();
//   const widgetRef = useRef();

//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: import.meta.env.VITE_CLOUD_NAME,
//         uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
//       },
//       function (error, result) {
//         if (result.event === 'success') {
//           handleUpload(index, result.info.secure_url);
//         }
//       }
//     );
//   }, []);

//   return (
//     <button
//       onClick={() => widgetRef.current.open()}
//       type='button'
//       className='rounded-md border border-purple-500 p-2'
//     >
//       Upload
//     </button>
//   );
// };
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';

type Props = {
  index: number;
  handleUpload: (index: number, url: string) => void;
};

const UploadWidget = ({ index, handleUpload }: Props) => {
  function successCallBack(result: any) {
    handleUpload(index, result.info.secure_url);
    console.log(result);
  }

  function failureCallBack(error: any, result: any) {
    console.log(result);
    console.log(error);
  }

  return (
    <>
      <WidgetLoader />
      <Widget
        sources={['local', 'camera', 'dropbox']}
        resourceType={'image'}
        cloudName={import.meta.env.VITE_CLOUD_NAME}
        uploadPreset={import.meta.env.VITE_UPLOAD_PRESET}
        buttonText={'Upload'}
        style={{
          color: 'rgba(168 85 247)',
          border: '1px solid rgba(168 85 247)',
          borderRadius: '4px',
          padding: '8px',
        }}
        folder={'queenpins'}
        cropping={false}
        // multiple={true}
        autoClose={false}
        onSuccess={successCallBack}
        onFailure={failureCallBack}
        logging={false}
        customPublicId={'sample'}
        eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'} // add eager transformations -> deafult = null
        use_filename={false}
        // widgetStyles={{
        //   palette: {
        //     window: '#737373',
        //     windowBorder: '#FFFFFF',
        //     tabIcon: '#FF9600',
        //     menuIcons: '#D7D7D8',
        //     textDark: '#DEDEDE',
        //     textLight: '#FFFFFF',
        //     link: '#0078FF',
        //     action: '#FF620C',
        //     inactiveTabIcon: '#B3B3B3',
        //     error: '#F44235',
        //     inProgress: '#0078FF',
        //     complete: '#20B832',
        //     sourceBg: '#909090',
        //   },
        //   fonts: {
        //     default: null,
        //     "'Fira Sans', sans-serif": {
        //       url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
        //       active: true,
        //     },
        //   },
        // }}
        destroy={true}
        // 👇 FOR SIGNED UPLOADS ONLY 👇

        // generateSignatureUrl={
        //   'http://my_domain.com/api/v1/media/generate_signature'
        // } // pass the api
        // endpoint for generating a signature -> check cloudinary docs and SDK's for signing uploads
        apiKey={import.meta.env.VITE_CLOUDINARY_API_KEY}
        accepts={'application/json'}
        contentType={'application/json'}
        withCredentials={true}
        unique_filename={true}
      />
    </>
  );
};

export default UploadWidget;
